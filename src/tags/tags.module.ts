import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsSchema } from './tags.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tags', schema: TagsSchema }])],
  providers: [TagsService],
  controllers: [TagsController],
  exports: [TagsService],
})
export class TagsModule {}
