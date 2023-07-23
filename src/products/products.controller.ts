import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './products.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { UpdateUserDto } from '../users/users.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {
    this.productService = productService;
  }

  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Get()
  async getAll() {
    return await this.productService.getAll();
  }

  @Get('/in-sale')
  async getInSale() {
    return await this.productService.getInSale();
  }

  @Get('/highlights')
  async getHighlights() {
    return await this.productService.getHighlights();
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.productService.getOne(id);
  }

  @ApiCreatedResponse({
    description: 'Success.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<any> {
    return this.productService.create(createProductDto);
  }
}
