import { Module } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { GalleriesController } from './galleries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleriesSchema } from './galleries.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductGalleries', schema: GalleriesSchema },
    ]),
  ],
  providers: [GalleriesService],
  controllers: [GalleriesController],
  exports: [GalleriesService],
})
export class GalleriesModule {}
