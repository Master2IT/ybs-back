import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { SubCategoriesModule } from '../subCategories/subCategories.module';

@Module({
  imports: [CategoriesModule, ProductsModule, SubCategoriesModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
