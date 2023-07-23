import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ColorsDto } from './colors.dto';

@Injectable()
export class ColorsService {
  constructor(@InjectModel('Colors') private colorsModel: Model<ColorsDto>) {}

  async getAll() {
    return this.colorsModel.find();
  }
  async getByIds(ids) {
    return this.colorsModel.find({ _id: { $in: ids } });
  }

  async create(data: ColorsDto): Promise<ColorsDto> {
    const hasFound = await this.colorsModel.findOne({ title: data.title });
    if (hasFound) throw new ConflictException();

    const model = new this.colorsModel(data);
    return await model.save();
  }
}
