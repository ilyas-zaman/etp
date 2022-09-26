import { ParticipationsService } from '../services/ParticipationsService';
export declare class ParticipationsController {
    private participationsService;
    constructor(participationsService: ParticipationsService);
    getEventParticipants(id: string): Promise<{
        message: string;
        Participants?: undefined;
    } | {
        Participants: [import("../../user/schema/UserSchema").User];
        message?: undefined;
    }>;
    participateEvent(id: string, req: any): Promise<{
        message: string;
    }>;
    boycottEvent(id: string, req: any): Promise<{
        message: string;
    }>;
}
