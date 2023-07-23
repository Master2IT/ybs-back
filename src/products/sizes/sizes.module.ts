import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SizesSchema } from './sizes.schema';
import { SizesController } from './sizes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Sizes', schema: SizesSchema }]),
  ],
  providers: [SizesService],
  controllers: [SizesController],
  exports: [SizesService],
})
export class SizesModule {}
