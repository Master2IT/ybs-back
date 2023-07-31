import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<UpdateUserDto>) {}

  async getAll(user) {
    const { type } = user;
    if (type == 'admin') {
      const users = await this.userModel.find();
      return {
        data: users.map((user: any) => ({
          _id: user._id,
          phone: user.phone,
          email: user.email,
          name: user.name,
          status: user.status,
        })),
        total: users.length,
      };
    }
  }
  async getUserById(userId) {
    return this.userModel.findOne({ _id: userId });
  }
  async getUserNameById(userId) {
    const user = await this.userModel.findOne({ _id: userId });
    if (user) {
      return user.name;
    }
  }

  async findUserByEmailOrPhone({ email, phone }) {
    if (email) {
      return this.userModel.findOne({
        $or: [{ email }],
      });
    } else if (phone) {
      return this.userModel.findOne({
        $or: [{ phone: phone }],
      });
    } else {
      return null;
    }
  }
  async findUserByEmailAndPassword({ email, password }) {
    if (email && password) {
      return this.userModel.findOne({ email, password });
    }
  }

  async createUser({ email, phone }) {
    const user = await this.findUserByEmailOrPhone({ email, phone });

    if (!user) {
      return await this.userModel.create({
        name: '',
        email,
        phone,
        status: 'active',
        shippingAddressId: null,
        paymentInfoId: null,
        orderIds: [],
        discountIds: [],
        newsLetterIds: [],
        type: 'user',
        password: '',
      });
    }

    return user;
  }
}
