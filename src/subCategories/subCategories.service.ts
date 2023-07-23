import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubCategory } from './subCategories.interface';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectModel('SubCategories')
    private subCategoryModel: Model<CreateSubCategory>,
  ) {}

  async getSubCategory(id: string) {
    return this.subCategoryModel.find({ categoryId: id });
  }

  async getLandingSubCategories() {
    const categories: any = await this.subCategoryModel.find({
      categoryId: {
        $in: ['64a55ebd4e2f7e351015dfe0', '64a55baa89346273ba5a3af1'],
      },
    });

    if (!categories.length) {
      return [];
    }

    return categories.map((category) => ({
      _id: category._id,
      image: category.image,
      title: category.title,
      categoryId: category.categoryId,
    }));
  }

  async getOne(id: string) {
    return this.subCategoryModel.findOne({ _id: id });
  }

  async create(subCategory: CreateSubCategory): Promise<any> {
    // const findCategory = await this.subCategoryModel.findOne({
    //   title: subCategory.title,
    // });
    // // Find Product
    // if (!!findCategory) {
    //   return {
    //     message: 'There is another category like this name',
    //     success: false,
    //   };
    // }
    // Create
    const newSubCategory = new this.subCategoryModel({
      ...subCategory,
      status: 'active',
    } as CreateSubCategory);
    return await newSubCategory.save();
  }
}
