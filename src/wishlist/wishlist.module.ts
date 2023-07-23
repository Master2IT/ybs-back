import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistSchema } from './wishlist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wishlist', schema: WishlistSchema }]),
  ],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
