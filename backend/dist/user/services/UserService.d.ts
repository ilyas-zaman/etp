import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/CreateUserDto';
import { User } from '../schema/UserSchema';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { EventsService } from 'src/events/services/EventService';
import { Event } from 'src/events/schema/EventSchema';
export declare class UserService {
    private readonly userModel;
    readonly eventModel: Model<Event>;
    private readonly eventService;
    constructor(userModel: Model<User>, eventModel: Model<Event>, eventService: EventsService);
    findAll(): Promise<User[]>;
    getSelf(req: any): Promise<any>;
    findOne(id: string): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string, req: any): Promise<{
        message: string;
    }>;
    getUserByUsername(username: string): Promise<any>;
    getEvents(req: any): Promise<(Event & {
        _id: any;
    })[]>;
}
