import { Model } from 'mongoose';
import { User } from 'src/user/schema/UserSchema';
import { Event } from '../schema/EventSchema';
export declare class FeedService {
    private readonly eventModel;
    readonly userModel: Model<User>;
    constructor(eventModel: Model<Event>, userModel: Model<User>);
    myFeed(req: any): Promise<{
        events: (Event & {
            _id: any;
        })[];
    }>;
}
