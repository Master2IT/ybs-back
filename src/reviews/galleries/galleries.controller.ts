import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../auth/current-user.decorator';
import { UpdateUserDto } from '../../users/users.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ReviewGalleriesService } from './galleries.service';
import { multerOptions } from '../../interceptors/multer.interceptor';
import { ReviewGalleriesDto } from './galleries.dto';

@Controller('reviews/galleries')
export class ReviewGalleriesController {
  constructor(private readonly reviewGalleriesService: ReviewGalleriesService) {
    this.reviewGalleriesService = reviewGalleriesService;
  }

  @Get()
  async getAll() {
    return this.reviewGalleriesService.getAll();
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      fileFilter: multerOptions.fileFilter,
      storage: multerOptions.storage,
      limits: multerOptions.limits,
      dest: './uploads',
    }),
  )
  @UseGuards(AuthGuard('jwt'))
  async upload(
    @UploadedFiles()
    images: Array<Express.Multer.File>,
    @Body()
    data: ReviewGalleriesDto,
  ) {
    return this.reviewGalleriesService.upload(data, images);
  }
}
