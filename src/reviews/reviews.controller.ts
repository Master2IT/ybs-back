import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewsDto } from './reviews.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { UpdateUserDto } from '../users/users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../interceptors/multer.interceptor';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {
    this.reviewsService = reviewsService;
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@CurrentUser() user: UpdateUserDto) {
    return this.reviewsService.getAll(user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body()
    data: CreateReviewsDto,
    @CurrentUser() user: UpdateUserDto,
  ) {
    return this.reviewsService.create(data, user);
  }
}
