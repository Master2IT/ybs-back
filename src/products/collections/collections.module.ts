import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionsSchema } from './collections.schema';
import { ProductsModule } from '../products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Collections', schema: CollectionsSchema },
    ]),
    ProductsModule,
  ],
  providers: [CollectionsService],
  controllers: [CollectionsController],
  exports: [CollectionsService],
})
export class CollectionsModule {}
