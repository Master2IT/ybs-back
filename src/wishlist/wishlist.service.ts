import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WishlistDto } from './wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel('Wishlist') private wishlistModel: Model<WishlistDto>,
  ) {}

  async getWishlist(userId) {
    return this.wishlistModel.findOne({
      userId,
    });
  }

  async addToWishlist(wishlist: WishlistDto): Promise<any> {
    return this.wishlistModel.findOneAndUpdate(
      {
        userId: wishlist.userId,
      },
      wishlist,
      {
        new: true,
        upsert: true,
      },
    );
  }
}
