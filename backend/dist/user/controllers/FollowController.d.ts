import { FollowService } from '../services/FollowService';
import { UserService } from '../services/UserService';
export declare class FollowController {
    private userService;
    private followService;
    constructor(userService: UserService, followService: FollowService);
    followUser(req: any, username: string): Promise<any>;
    unfollowUser(req: any, username: string): Promise<{
        message: string;
    }>;
}
