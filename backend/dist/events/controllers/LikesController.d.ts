import { LikesService } from '../services/LikesService';
export declare class LikesController {
    private likesService;
    constructor(likesService: LikesService);
    likeEvents(id: string, req: any): Promise<{
        message: string;
    }>;
    removelikeEvents(id: string, req: any): Promise<{
        message: string;
    }>;
    getLikesByEvents(id: string): Promise<{
        UserLike: [import("../../user/schema/UserSchema").User];
    }>;
}
