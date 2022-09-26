import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDto } from '../Dto/CategoryDto';
import { CategoriesService } from '../Services/categories.service';
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() categoryDto: CategoryDto) {
    return this.categoriesService.createCategory(categoryDto);
  }
  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }
}
