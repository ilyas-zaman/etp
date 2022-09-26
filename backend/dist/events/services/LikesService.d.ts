import { Event } from '../schema/EventSchema';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/UserSchema';
export declare class LikesService {
    private readonly eventModel;
    readonly userModel: Model<User>;
    constructor(eventModel: Model<Event>, userModel: Model<User>);
    likeEvents(id: string, req: any): Promise<{
        message: string;
    }>;
    getLikesByEvents(id: string): Promise<{
        UserLike: [User];
    }>;
    removelikeEvents(id: string, req: any): Promise<{
        message: string;
    }>;
}
