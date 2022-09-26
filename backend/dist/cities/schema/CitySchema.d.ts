import { Document } from 'mongoose';
export declare class City extends Document {
    name: string;
}
export declare const CitySchema: import("mongoose").Schema<City, import("mongoose").Model<City, any, any, any>, any, any>;
