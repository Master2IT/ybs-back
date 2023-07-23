import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categories.dto';
import { SubCategoriesService } from '../subCategories/subCategories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {
    this.categoryService = categoryService;
  }

  @Get('/all')
  async getAll() {
    return this.categoryService.getAll();
  }
  @Get('')
  async getCategories() {
    return this.categoryService.getCategories();
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
    return this.categoryService.create(createCategoryDto);
  }
}
