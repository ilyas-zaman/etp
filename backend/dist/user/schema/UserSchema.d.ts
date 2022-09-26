import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class User extends Document {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    events: [Event];
    follow: [type: MongooseSchema.Types.ObjectId, ref: 'User'];
    follower: [type: MongooseSchema.Types.ObjectId, ref: 'User'];
    participations: [Event];
    likes: [Event];
}
export declare const UserSchema: MongooseSchema<User, import("mongoose").Model<User, any, any, any>, any, any>;
