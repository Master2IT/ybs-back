import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ShippingAddressesDto,
  UpdateShippingAddressesDto,
} from './shippingAddresses.dto';

@Injectable()
export class ShippingAddressesService {
  constructor(
    @InjectModel('ShippingAddresses')
    private shippingAddressesModel: Model<ShippingAddressesDto>,
  ) {}

  async getAll() {
    const userId = 1; // Get User id by jwt_token
    return this.shippingAddressesModel.find({ userId });
  }

  async getOne(shippingId: string) {
    return this.shippingAddressesModel.findOne({ _id: shippingId });
  }

  async create(data: ShippingAddressesDto): Promise<any> {
    return await this.shippingAddressesModel.create({
      ...data,
      isDefault: false,
    });
  }

  async update(data: UpdateShippingAddressesDto): Promise<any> {
    return this.shippingAddressesModel.findOneAndUpdate({ _id: data.id }, data);
  }
}
