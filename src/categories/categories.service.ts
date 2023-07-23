import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategory } from './categories.interface';
import { SubCategoriesService } from '../subCategories/subCategories.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories') private categoriesModel: Model<CreateCategory>,
    @Inject(SubCategoriesService)
    private readonly subCategoriesService: SubCategoriesService,
  ) {}

  async getAll() {
    const categories = await this.categoriesModel.find();

    if (!categories.length) return [];

    return await Promise.all(
      categories?.map(async (category: any) => ({
        ...category._doc,
        ['category']: await this.subCategoriesService.getSubCategory(
          category._doc._id,
        ),
      })),
    );
  }
  async getCategories() {
    const categories = await this.categoriesModel.find();

    if (!categories.length) return [];

    return categories.map((category) => ({
      _id: category._id,
      image: category.image,
      title: category.title,
    }));
  }

  async getOne(id) {
    return this.categoriesModel.findOne({ _id: id });
  }

  async create(category: CreateCategory): Promise<any> {
    const findCategory = await this.categoriesModel.findOne({
      title: category.title,
    });
    // Find Product
    if (!!findCategory) {
      return {
        message: 'There is another category like this name',
        success: false,
      };
    }
    // Create
    const newCategory = new this.categoriesModel({
      ...category,
      status: 'active',
    } as CreateCategory);
    return await newCategory.save();
  }
}
