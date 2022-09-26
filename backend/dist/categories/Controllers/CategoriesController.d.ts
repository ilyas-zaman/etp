import { CategoryDto } from '../Dto/CategoryDto';
import { CategoriesService } from '../Services/categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategory(categoryDto: CategoryDto): Promise<void>;
    getAllCategories(): Promise<(import("../schema/CategorySchema").Category & {
        _id: any;
    })[]>;
}
