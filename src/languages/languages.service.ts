import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LanguageDto } from './languages.dto';
import { CreateProduct } from '../products/products.interface';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectModel('Languages') private languagesModel: Model<LanguageDto>,
  ) {}

  async getAll() {
    return this.languagesModel.find();
  }

  async getOne(id) {
    return this.languagesModel.findOne({ _id: id });
  }

  async create(language: LanguageDto): Promise<any> {
    const findLanguage = await this.languagesModel.findOne({
      name: language.name,
      lang: language.lang,
      domain: language.domain,
    });
    // Find Language
    if (!!findLanguage) {
      return {
        message: 'There is another language like this name',
        success: false,
      };
    }
    return await this.languagesModel.create({
      ...language,
      isActive: true,
      status: 'active',
    });
  }
}
