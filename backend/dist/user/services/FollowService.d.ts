import { Model } from 'mongoose';
import { User } from '../schema/UserSchema';
export declare class FollowService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    follow(req: any, username: string): Promise<any>;
    unfollow(req: any, username: string): Promise<{
        message: string;
    }>;
}
