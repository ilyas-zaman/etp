import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../schema/EventSchema';
import { Model, Types } from 'mongoose';
import { CreateEventDto } from '../dto/CreateEventDto';
import { UpdateEventDto } from '../dto/UpdateEventDto';
import { User } from 'src/user/schema/UserSchema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name) readonly userModel: Model<User>,
  ) {}

  async createEvent(createEventDto: CreateEventDto, req: any) {
    const event = await new this.eventModel(createEventDto);
    event.userId = req.user.userId;
    event.category = createEventDto.category;
    event.city = createEventDto.city;
    console.log(event.category);
    console.log(event.city);

    const user = await this.userModel.findByIdAndUpdate(
      { _id: req.user.userId },
      { $push: { events: event.id } },
    );
    user.save();
    event.save();
    return {
      event,
      message: 'Event successfuly created',
    };
  }

  async getEventById(id: string) {
    const event = await this.eventModel.findById(id);
    if (!event) throw new NotFoundException('Could not find event');
    return event;
  }

  async updateEvent(id: string, updateEventDto: UpdateEventDto, req: any) {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Could not find event');

    let event = await this.eventModel.findById({ _id: id });

    if (!event) {
      throw new NotFoundException('No event found');
    }
    if (event && event.userId != req.user.userId) {
      throw new UnauthorizedException(
        'You not authorized to update this event',
      );
    }
    event = await this.eventModel.findByIdAndUpdate(
      { _id: id },
      updateEventDto,
    );
    event.save();

    return { message: 'Event updated !' };
  }
  async deleteEvent(id: any, req: any) {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Could not find event');
    const event = await this.eventModel.findById({ _id: id });

    if (!event) throw new NotFoundException('Could not find event');
    if (event && event.userId != req.user.userId) {
      throw new UnauthorizedException(
        'You are not authorized to remove this event',
      );
    }
    await this.userModel.updateMany({
      $pull: { events: event.id, participations: event.id, likes: event.id },
    });
    event.remove();
    return { message: 'Event deleted !' };
  }
  async getEvents() {
    const events = await this.eventModel.find();
    return events;
  }

  async getEventsByCategory(id: string) {
    const events = await this.eventModel.find({ category: id });
    return events;
  }
  async getEventsByCity(id: string) {
    const events = await this.eventModel.find({ city: id });
    return events;
  }

  async getMyEvents(req: any) {
    const events = await this.eventModel.find({ userId: req.user.userId });
    return events;
  }

  // async  deleteMultipleEvents(id:string, req:any)
  // {
  //   const events = await this.eventModel.find({ _id: { $in: id } });

  // }
}
