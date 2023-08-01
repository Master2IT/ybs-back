import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { TagsModule } from '../tags/tags.module';
import { CartModule } from '../cart/cart.module';
import { WishlistModule } from '../wishlist/wishlist.module';
import { LanguagesModule } from '../languages/languages.module';
import { ColorsModule } from '../products/colors/colors.module';
import { SizesModule } from '../products/sizes/sizes.module';
import { WashAndCareModule } from '../products/washAndCare/washAndCare.module';
import { GalleriesModule } from '../products/galleries/galleries.module';
import { SubCategoriesModule } from '../subCategories/subCategories.module';
import { CollectionsModule } from '../products/collections/collections.module';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { ReviewGalleriesModule } from '../reviews/galleries/galleries.module';
import { ReviewReactionsModule } from '../reviews/reactions/reactions.module';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.AUTH_SECRET,
        signOptions: {
          expiresIn: '1500m',
        },
      }),
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    DiscountsModule,
    TagsModule,
    CartModule,
    WishlistModule,
    LanguagesModule,
    ColorsModule,
    SizesModule,
    WashAndCareModule,
    GalleriesModule,
    CollectionsModule,
    SubscribersModule,
    ReviewsModule,
    ReviewGalleriesModule,
    ReviewReactionsModule,
    SearchModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
