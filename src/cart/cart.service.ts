import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartDto } from './cart.dto';
import { CreateTag } from '../tags/tags.interface';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private cartModel: Model<CartDto>) {}

  async getCart(userId) {
    const cart = this.cartModel.findOne({
      userId,
    });

    if (!cart) {
      throw new NotFoundException();
    }
    return cart;
  }

  async addToCart(user, cart: CartDto) {
    if (user && user.type == 'user') {
      const carts: any = await this.cartModel.findOne({ userId: user._id });

      if (!carts) {
        const newCart = new this.cartModel({
          userId: user._id,
          products: [
            {
              productId: cart.productId,
              color: cart.color,
              size: cart.size,
              count: cart.count,
            },
          ],
        });
        return await newCart.save();
      }

      const products = [...carts?.products];
      const findProductIndex = products.findIndex(
        (product: any) => product.productId == cart.productId,
      );
      if (findProductIndex != -1) {
        products[findProductIndex].color = cart.color;
        products[findProductIndex].size = cart.size;
        products[findProductIndex].count = cart.count;
      } else {
        products.push({
          productId: cart.productId,
          color: cart.color,
          size: cart.size,
          count: cart.count,
        });
      }

      return this.cartModel.findOneAndUpdate(
        {
          userId: user._id,
        },
        {
          products,
        },
      );
    }
  }
}
