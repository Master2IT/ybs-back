import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { SubCategoriesService } from './subCategories.service';
import { CreateSubCategoryDto } from './subCategories.dto';

@Controller('subCategories')
export class SubCategoriesController {
  constructor(private readonly subCategoryService: SubCategoriesService) {
    this.subCategoryService = subCategoryService;
  }

  // @Get()
  // async getAll() {
  //   return this.subCategoryService.getAll();
  // }

  @Get('/landing')
  async getLandingCategories() {
    return this.subCategoryService.getLandingSubCategories();
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return this.subCategoryService.getOne(id);
  }

  @Post()
  async create(
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<any> {
    return this.subCategoryService.create(createSubCategoryDto);
  }
}
