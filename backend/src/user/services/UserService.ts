import {
  All,
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
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Event.name) readonly eventModel: Model<Event>,
    private readonly eventService: EventsService,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userModel.find().populate('follower').exec();
  }
  public async getSelf(req: any): Promise<any> {
  

    const user = await this.userModel.findOne({ _id: req.user.userId });

    return user;
  }
  public async findOne(id: string): Promise<User> {
    const user = await this.userModel
      .findById({ _id: id })
      .populate('follow', 'follower')
      .exec();

    if (!user) {
      throw new HttpException(`User with the ${id} was not found`, 404);
    }

    return user;
  }
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUserDto);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return newUser.save();
  }

  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updateUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      updateUserDto,
    );
    if (updateUserDto.password) {
      await bcrypt.hash(updateUserDto.password, 10);
    }
    return updateUser.save();
  }

  public async deleteUser(id: string, req: any) {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Could not find user');
    const user = await this.userModel.findById({ _id: id });
    if (!user) throw new NotFoundException('Could not find user');
    if (user.id != req.user.userId) {
      throw new UnauthorizedException(
        'You are not authorized to remove this user',
      );
    }
    const IdToDelete = req.user.userId;
    console.log(IdToDelete);

    const follows = await this.userModel.updateMany(
      { follow: { $in: [new Types.ObjectId(IdToDelete)] } },
      { $pull: { follow: { $in: [new Types.ObjectId(IdToDelete)] } } },
    );
    const followers = await this.userModel.updateMany(
      { follower: { $in: [new Types.ObjectId(IdToDelete)] } },
      { $pull: { follower: { $in: [new Types.ObjectId(IdToDelete)] } } },
    );
    if (follows) console.log(follows);
    if (followers) console.log(followers);
    user.events.forEach(async (element) => {
      await this.eventService.deleteEvent(element, req);
      return 'dodo';
    });
    await this.eventModel.deleteMany({ userId: req.user.userId });

    await this.userModel.updateMany({
      $pull: {
        participations: { $in: user.events },
        likes: { $in: user.events },
      },
    });
    user.remove();
    return { message: 'User deleted !' };
  }

  public async getUserByUsername(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username });

    if (!user) {
      throw new HttpException(
        `User with username ${username} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  public async getEvents(req:any) {
    const event = await this.eventModel.find({userId:req.user.userId})
    console.log(event);
    return event;
  }
}
