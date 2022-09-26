import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../schema/EventSchema';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/schema/UserSchema';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name) readonly userModel: Model<User>,
  ) {}

  async likeEvents(id: string, req: any) {
    try {
      let event = await this.eventModel.findById(id);

      if (!event) throw new NotFoundException('Could not find event');

      event = await this.eventModel.findOneAndUpdate(
        { _id: id, userLike: { $ne: req.user.userId } },

        { $push: { userLike: req.user.userId } },
      );

      const user = await this.userModel.findByIdAndUpdate(
        { _id: req.user.userId },

        { $push: { likes: event.id } },
      );

      event.save();

      user.save();

      return { message: `You like the ${event.name} !` };
    } catch (err) {
      throw new ConflictException('You already like this event !');
    }
  }
  async getLikesByEvents(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Could not find event');

    const event = await this.eventModel.findById({ _id: id });

    if (!event) throw new NotFoundException('Could not find event');

    return { UserLike: event.userLike };
  }
  async removelikeEvents(id: string, req: any) {
    try {
      let event = await this.eventModel.findById(id);

      if (!event) throw new NotFoundException('Could not find event');

      event = await this.eventModel.findOneAndUpdate(
        { _id: id, userLike: { $eq: req.user.userId } },

        { $pull: { userLike: req.user.userId } },
      );

      const user = await this.userModel.findByIdAndUpdate(
        { _id: req.user.userId },

        { $pull: { likes: event.id } },
      );

      event.save();

      user.save();

      return { message: `You no longer like ${event.name}` };
    } catch (err) {
      throw new NotFoundException('No likes found to remove');
    }
  }
}
