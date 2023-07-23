import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { subscribersDto } from './subscribers.dto';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel('Subscribers')
    private subscribersModel: Model<subscribersDto>,
  ) {}

  async submitEmail({ email }) {
    const findEmail = await this.subscribersModel.findOne({ email });
    if (findEmail) {
      throw new ConflictException('Email Already Added!');
    }

    const newSub = new this.subscribersModel({ email });

    await newSub.save();
    return {
      message: 'Email Successfully Added!',
    };
  }
}
