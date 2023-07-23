import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscribersSchema } from './subscribers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subscribers', schema: SubscribersSchema },
    ]),
  ],
  providers: [SubscribersService],
  controllers: [SubscribersController],
})
export class SubscribersModule {}
