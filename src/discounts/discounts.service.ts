import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDiscount } from './discounts.interface';
import { CreateDiscountDto } from './discounts.dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel('Discounts') private discountsModel: Model<CreateDiscount>,
  ) {}

  async getAll() {
    return this.discountsModel.find();
  }

  async getOne(id, needValue?) {
    if (!id) return null;

    const found: any = await this.discountsModel.findOne({ _id: id });

    if (found) {
      if (needValue) {
        return {
          type: found.type,
          value: found.value,
        };
      }

      return found;
    }
  }

  async create(discount: CreateDiscountDto): Promise<any> {
    const findDiscount = await this.discountsModel.findOne({
      title: discount.title,
    });
    // Find Product
    if (!!findDiscount) {
      throw new ConflictException();
    }
    // Create
    const newDiscount = new this.discountsModel({
      ...discount,
      status: 'active',
    } as CreateDiscount);
    return await newDiscount.save();
  }
}
