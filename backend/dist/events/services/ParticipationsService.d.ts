import { Event } from '../schema/EventSchema';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/UserSchema';
export declare class ParticipationsService {
    private readonly eventModel;
    readonly userModel: Model<User>;
    constructor(eventModel: Model<Event>, userModel: Model<User>);
    participateEvent(id: string, req: any): Promise<{
        message: string;
    }>;
    boycottEvent(id: string, req: any): Promise<{
        message: string;
    }>;
    getParticipantsByEvents(id: string): Promise<{
        message: string;
        Participants?: undefined;
    } | {
        Participants: [User];
        message?: undefined;
    }>;
}
