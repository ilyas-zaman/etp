import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from '../Dto/CategoryDto';
import { Category } from '../schema/CategorySchema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  async createCategory(categoryDto: CategoryDto) {
    const category = await new this.categoryModel(categoryDto);
    category.save();
  }

  async getAllCategories() {
    const categories = await this.categoryModel.find();
    return categories;
  }
}
