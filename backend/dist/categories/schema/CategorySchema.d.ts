import { Document } from 'mongoose';
export declare class Category extends Document {
    name: string;
}
export declare const CategorySchema: import("mongoose").Schema<Category, import("mongoose").Model<Category, any, any, any>, any, any>;
