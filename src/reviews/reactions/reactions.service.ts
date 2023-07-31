import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewReactionsService {
  constructor(
    @InjectModel('ReviewReactions') private reviewReactionsModel: Model<any>,
  ) {}

  async addReaction(data, user) {
    const found = await this.reviewReactionsModel.findOneAndUpdate(
      {
        userId: user._id,
        reviewId: data.reviewId,
      },
      {
        $set: {
          reaction: data.reaction,
        },
      },
    );

    if (!found) {
      const newModel = await this.reviewReactionsModel.create({
        ...data,
        userId: user._id,
      });
      return newModel.save();
    }

    return found;
  }
}
