import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../schema/EventSchema';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/schema/UserSchema';

@Injectable()
export class ParticipationsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name) readonly userModel: Model<User>,
  ) {}

  async participateEvent(id: string, req: any) {
    try {
      let event = await this.eventModel.findById(id);
      event = await this.eventModel.findOneAndUpdate(
        { _id: id, userParticipant: { $ne: req.user.userId } },
        {
          $push: { userParticipant: req.user.userId },
          $inc: { seats: -1 },
        },
      );
      const user = await this.userModel.findByIdAndUpdate(
        { _id: req.user.userId },
        { $push: { participations: event.id } },
      );
      event.save();
      user.save();
      return { message: `You have been added to ${event.name} !` };
    } catch (err) {
      if (!Types.ObjectId.isValid(id))
        throw new NotFoundException('Could not find event');
      else throw new ConflictException('You are already in !');
    }
  }

  async boycottEvent(id: string, req: any) {
    try {
      let event = await this.eventModel.findById(id);
      event = await this.eventModel.findOneAndUpdate(
        { _id: id, userParticipant: { $eq: req.user.userId } },
        {
          $pull: { userParticipant: req.user.userId },
          $inc: { seats: 1 },
        },
      );
      const user = await this.userModel.findByIdAndUpdate(
        { _id: req.user.userId },
        { $pull: { participations: event.id } },
      );
      event.save();
      user.save();
      return { message: `You have been removed from ${event.name}` };
    } catch (err) {
      if (!Types.ObjectId.isValid(id))
        throw new NotFoundException('Could not find event');
      else throw new NotFoundException('You are not in event !');
    }
  }
  async getParticipantsByEvents(id: string) {
    const event = await this.eventModel.findById(id);
    if (!event) throw new NotFoundException('Could not find event');

    if (event.userParticipant === null) {
      return { message: 'There is no participants' };
    }
    return { Participants: event.userParticipant };
  }
}
