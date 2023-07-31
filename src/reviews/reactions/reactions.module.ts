import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewReactionsSchema } from './reactions.schema';
import { ReviewReactionsService } from './reactions.service';
import { ReviewReactionsController } from './reactions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ReviewReactions', schema: ReviewReactionsSchema },
    ]),
  ],
  providers: [ReviewReactionsService],
  controllers: [ReviewReactionsController],
  exports: [ReviewReactionsService],
})
export class ReviewReactionsModule {}
