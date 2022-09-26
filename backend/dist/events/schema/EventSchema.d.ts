import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schema/UserSchema';
import { Category } from 'src/categories/schema/CategorySchema';
import { City } from 'src/cities/schema/CitySchema';
export declare class Event extends Document {
    name: string;
    beginingDate: Date;
    endDate: Date;
    planning: string;
    adress: string;
    confidentiality: string;
    tag: string;
    minimalAge: string;
    seats: number;
    userId: User;
    category: Category['_id'];
    city: City['_id'];
    userParticipant: [User];
    userLike: [User];
}
export declare const EventSchema: mongoose.Schema<Event, mongoose.Model<Event, any, any, any>, any, any>;
