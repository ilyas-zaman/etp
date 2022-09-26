import { FeedService } from '../services/FeedService';
export declare class FeedController {
    private feedService;
    constructor(feedService: FeedService);
    myfeed(req: any): Promise<{
        events: (import("../schema/EventSchema").Event & {
            _id: any;
        })[];
    }>;
}
