import { Event } from '../schema/EventSchema';
import { Model } from 'mongoose';
import { CreateEventDto } from '../dto/CreateEventDto';
import { UpdateEventDto } from '../dto/UpdateEventDto';
import { User } from 'src/user/schema/UserSchema';
export declare class EventsService {
    private readonly eventModel;
    readonly userModel: Model<User>;
    constructor(eventModel: Model<Event>, userModel: Model<User>);
    createEvent(createEventDto: CreateEventDto, req: any): Promise<{
        event: Event & {
            _id: any;
        };
        message: string;
    }>;
    getEventById(id: string): Promise<Event & {
        _id: any;
    }>;
    updateEvent(id: string, updateEventDto: UpdateEventDto, req: any): Promise<{
        message: string;
    }>;
    deleteEvent(id: any, req: any): Promise<{
        message: string;
    }>;
    getEvents(): Promise<(Event & {
        _id: any;
    })[]>;
    getEventsByCategory(id: string): Promise<(Event & {
        _id: any;
    })[]>;
    getEventsByCity(id: string): Promise<(Event & {
        _id: any;
    })[]>;
    getMyEvents(req: any): Promise<(Event & {
        _id: any;
    })[]>;
}
