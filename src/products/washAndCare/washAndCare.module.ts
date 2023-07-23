import { Module } from '@nestjs/common';
import { WashAndCareService } from './washAndCare.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WashAndCareSchema } from './washAndCare.schema';
import { WashAndCareController } from './washAndCare.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'WashAndCare', schema: WashAndCareSchema },
    ]),
  ],
  providers: [WashAndCareService],
  controllers: [WashAndCareController],
})
export class WashAndCareModule {}
