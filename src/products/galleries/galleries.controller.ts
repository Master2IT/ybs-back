import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleriesDto } from './galleries.dto';
import { multerOptions } from '../../interceptors/multer.interceptor';

@Controller('products/galleries')
export class GalleriesController {
  constructor(private readonly galleriesService: GalleriesService) {
    this.galleriesService = galleriesService;
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.galleriesService.getOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() data: GalleriesDto,
  ): Promise<any> {
    return this.galleriesService.create(file, data);
  }

  //
  // @Put()
  // async update(@Body() data: GalleriesDto): Promise<any> {
  //   return this.galleriesService.update(data);
  // }
}
