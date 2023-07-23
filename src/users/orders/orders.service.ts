import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrdersDto } from './orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Orders')
    private ordersModel: Model<CreateOrdersDto>,
  ) {}

  async getAll(user) {
    const { _id, type } = user;

    if (type == 'admin') {
      const orders: any = await this.ordersModel.find();
      return {
        data: orders,
        total: orders.length,
      };
    }

    const orders: any = await this.ordersModel.find({ userId: _id });
    return {
      data: orders,
      total: orders.length,
    };
  }

  async getOrderDetails(orderId: string) {
    return this.ordersModel.findOne({ _id: orderId });
  }

  // async create(data: CreateOrdersDto): Promise<any> {
  //   return await this.ordersModel.create({
  //     ...data,
  //     isDefault: false,
  //   });
  // }

  // async update(data: UpdateOrdersDto): Promise<any> {
  //   return this.ordersModel.findOneAndUpdate({ _id: data.id }, data);
  // }
}
