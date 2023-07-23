import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoriesService } from './subCategories.service';
import { SubCategoriesController } from './subCategories.controller';
import { SubCategoriesSchema } from './subCategories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SubCategories', schema: SubCategoriesSchema },
    ]),
  ],
  providers: [SubCategoriesService],
  controllers: [SubCategoriesController],
  exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
