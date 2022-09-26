import { UserService } from 'src/user/services/UserService';
import { CreateEventDto } from '../dto/CreateEventDto';
import { UpdateEventDto } from '../dto/UpdateEventDto';
import { EventsService } from '../services/EventService';
export declare class EventsController {
    private eventsService;
    private userService;
    constructor(eventsService: EventsService, userService: UserService);
    createEvent(createEventDto: CreateEventDto, req: any): Promise<{
        event: import("../schema/EventSchema").Event & {
            _id: any;
        };
        message: string;
    }>;
    updateEvent(id: string, updateEventDto: UpdateEventDto, req: any): Promise<{
        message: string;
    }>;
    getEventById(id: string): Promise<import("../schema/EventSchema").Event & {
        _id: any;
    }>;
    deleteEvent(id: any, req: any): Promise<{
        message: string;
    }>;
    getEvents(): Promise<(import("../schema/EventSchema").Event & {
        _id: any;
    })[]>;
    getEventsByCategory(id: string): Promise<(import("../schema/EventSchema").Event & {
        _id: any;
    })[]>;
    getEventsByCity(id: string): Promise<(import("../schema/EventSchema").Event & {
        _id: any;
    })[]>;
    getUserEvents(req: any): Promise<(import("../schema/EventSchema").Event & {
        _id: any;
    })[]>;
}
