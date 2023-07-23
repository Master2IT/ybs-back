import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTag } from './tags.interface';
import { CreateTagDto } from './tags.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel('Tags') private tagsModel: Model<CreateTag>) {}

  async getAll() {
    return this.tagsModel.find();
  }
  async getOne(id) {
    return this.tagsModel.find({ _id: id });
  }
  async getMany(ids) {
    return this.tagsModel.find({ _id: { $in: ids } });
  }

  async create(tag: CreateTagDto): Promise<any> {
    const findTag = await this.tagsModel.findOne({
      name: tag.name,
    });
    // Find Product
    if (!!findTag) {
      return {
        message: 'There is another tag like this name',
        success: false,
      };
    }
    // Create
    const newTag = new this.tagsModel(tag as CreateTag);
    return await newTag.save();
  }
}
