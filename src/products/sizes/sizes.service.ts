import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SizesDto } from './sizes.dto';

@Injectable()
export class SizesService {
  constructor(@InjectModel('Sizes') private sizesModel: Model<SizesDto>) {}

  async getAll() {
    return this.sizesModel.find();
  }
  async getByIds(ids) {
    return this.sizesModel.find({ _id: { $in: ids } });
  }

  async create(data: SizesDto): Promise<SizesDto> {
    const hasFound = await this.sizesModel.findOne({ title: data.title });
    if (hasFound) throw new ConflictException();

    const model = new this.sizesModel(data);
    return await model.save();
  }
}
