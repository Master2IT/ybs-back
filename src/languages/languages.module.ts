import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguagesService } from './languages.service';
import { LanguagesSchema } from './languages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Languages', schema: LanguagesSchema }]),
  ],
  providers: [LanguagesService],
  controllers: [LanguagesController],
})
export class LanguagesModule {}
