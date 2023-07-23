import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WashAndCareDto } from './washAndCare.dto';

@Injectable()
export class WashAndCareService {
  constructor(
    @InjectModel('WashAndCare') private washAndCareModel: Model<WashAndCareDto>,
  ) {}

  async getAll() {
    return this.washAndCareModel.find();
  }

  async create(data: WashAndCareDto): Promise<WashAndCareDto> {
    const model = new this.washAndCareModel(data);
    return await model.save();
  }
}
