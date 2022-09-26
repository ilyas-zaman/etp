import { CreateUserDto } from '../dto/CreateUserDto';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { UserService } from '../services/UserService';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<import("../schema/UserSchema").User[]>;
    getProfile(req: any): Promise<any>;
    getUserEvents(req: any): Promise<(import("../../events/schema/EventSchema").Event & {
        _id: any;
    })[]>;
    getUsername(username: string): Promise<any>;
    getUser(res: any, userId: string): Promise<import("../schema/UserSchema").User>;
    createUser(res: any, createUserDto: CreateUserDto): Promise<any>;
    updateUser(res: any, id: string, updateUserDto: UpdateUserDto): Promise<any>;
    deleteUser(res: any, id: any, req: any): Promise<any>;
}
