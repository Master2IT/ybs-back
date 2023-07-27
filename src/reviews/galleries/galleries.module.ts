import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewGalleriesService } from './galleries.service';
import { ReviewGalleriesController } from './galleries.controller';
import { ReviewGalleriesSchema } from './galleries.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ReviewGalleries', schema: ReviewGalleriesSchema },
    ]),
  ],
  providers: [ReviewGalleriesService],
  controllers: [ReviewGalleriesController],
  exports: [ReviewGalleriesService],
})
export class ReviewGalleriesModule {}
