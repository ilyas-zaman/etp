import { Schema as MongooseSchema } from 'mongoose';
export declare class UpdateEventDto {
    name: string;
    beginingDate: Date;
    endDate: Date;
    planning: string;
    adress: string;
    confidentiality: string;
    tag: string;
    minimalAge: string;
    seats: number;
    category: MongooseSchema.Types.ObjectId;
    city: MongooseSchema.Types.ObjectId;
}
