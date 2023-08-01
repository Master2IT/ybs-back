import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';
import { SubCategoriesService } from '../subCategories/subCategories.service';

@Injectable()
export class SearchService {
  constructor(
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @Inject(CategoriesService)
    private readonly categoriesService: CategoriesService,
    @Inject(SubCategoriesService)
    private readonly subCategoriesService: SubCategoriesService,
  ) {}

  async search(search, type) {
    if (!type) {
      return await this.productsService.searchProduct(search.toLowerCase());
    } else if (type == 'category') {
      const category: any = await this.categoriesService.getCategoryByTitle(
        search.toLowerCase(),
      );
      if (!category) {
        throw new NotFoundException();
      }
      const products = await this.productsService.searchProductByCategoryId(
        category._id,
      );
      const categories = await this.subCategoriesService.getSubCategory(
        category._id,
      );
      return {
        products,
        categories: [
          ...new Set(categories.map((category) => category.categories).flat()),
        ],
      };
    } else {
      throw new NotFoundException();
    }
  }
}
