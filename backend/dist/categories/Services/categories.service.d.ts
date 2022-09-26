import { Model } from 'mongoose';
import { CategoryDto } from '../Dto/CategoryDto';
import { Category } from '../schema/CategorySchema';
export declare class CategoriesService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    createCategory(categoryDto: CategoryDto): Promise<void>;
    getAllCategories(): Promise<(Category & {
        _id: any;
    })[]>;
}
