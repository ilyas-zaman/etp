import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/UserSchema';
import { Event } from '../schema/EventSchema';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name) readonly userModel: Model<User>,
  ) {}

  async myFeed(req: any) {
    const user = await this.userModel.findById({ _id: req.user.userId });
    const myOwnFeed = [user.participations, user.likes, user.events];
    const follows = await this.userModel.find({ _id: { $in: user.follow } });
    const eventFollows = [];
    for (const i in follows) {
      eventFollows.push(
        follows[i].likes,
        follows[i].participations,
        follows[i].events,
      );
    }
    // eslint-disable-next-line prefer-spread
    const merged = [].concat.apply([], myOwnFeed.concat(eventFollows));
    const uniq = [...new Set(merged)];
    const events = await this.eventModel.find({ _id: { $in: uniq } });
    return { events };
  }
}
