import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorsSchema } from './colors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Colors', schema: ColorsSchema }]),
  ],
  providers: [ColorsService],
  controllers: [ColorsController],
  exports: [ColorsService],
})
export class ColorsModule {}
