import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from '../dto/CreateUserDto';
import { User } from '../schema/UserSchema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { EventsService } from 'src/events/services/EventService';
import { Event } from 'src/events/schema/EventSchema';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async follow(@Request() req, @Param() username: string): Promise<any> {
    const userID = await this.userModel.findById(req.user.userId);
    const follower = await this.userModel.findOneAndUpdate(
      { username: username },
      { $push: { follower: userID._id } },
    );

    if (!follower) {
      throw new NotFoundException('cannot found this user');
    }
    const userN = await this.userModel.findByIdAndUpdate(
      { _id: req.user.userId },
      { $push: { follow: follower._id } },
    );

    const user = JSON.stringify(userN._id);
    const follow = JSON.stringify(follower._id);

    if (follow === user) {
      throw new BadRequestException("you can't follow ur self");
    }
    follower.save();
    userN.save();
    return {
      message: 'successfully follow',
    };
  }

  public async unfollow(@Request() req, @Param() username: string) {
    const userID = await this.userModel.findById(req.user.userId);
    const follower = await this.userModel.findOneAndUpdate(
      { username: username },
      { $pull: { follower: userID._id } },
    );
    if (!follower) {
      throw new NotFoundException('cannot found this user');
    }
    const userN = await this.userModel.findByIdAndUpdate(
      { _id: req.user.userId },
      { $pull: { follow: follower._id } },
    );
    if (!req.user.userId) {
      throw new HttpException('no user connected', 404);
    }

    userN.save();
    follower.save();
    return {
      message: 'successfully unfollow',
    };
  }
}
