import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProduct } from './products.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GalleriesService } from './galleries/galleries.service';
import { ColorsService } from './colors/colors.service';
import { SizesService } from './sizes/sizes.service';
import { DiscountsService } from '../discounts/discounts.service';
import { CategoriesService } from '../categories/categories.service';
import { TagsService } from '../tags/tags.service';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products') private productsModel: Model<CreateProduct>,
    @Inject(GalleriesService)
    private readonly galleriesService: GalleriesService,
    @Inject(ColorsService)
    private readonly colorsService: ColorsService,
    @Inject(SizesService)
    private readonly sizesService: SizesService,
    @Inject(DiscountsService)
    private readonly discountService: DiscountsService,
    @Inject(CategoriesService)
    private readonly categoriesService: CategoriesService,
    @Inject(TagsService)
    private readonly tagsService: TagsService,
    @Inject(ReviewsService)
    private readonly reviewsService: ReviewsService,
  ) {}

  calculateDiscount = async (item: any) => {
    const foundDiscount: any = await this.discountService.getOne(
      item.discountId,
    );

    if (!foundDiscount) return 0;

    switch (foundDiscount.type) {
      case 'percent':
        return (
          item.price -
          (item.price * parseFloat((foundDiscount.value + '%').toString())) /
            100
        );
    }
  };
  filterColors = async (colorIds) => {
    const colors: any = await this.colorsService.getByIds(colorIds);
    if (colors && colors.length) {
      return colors.map((color) => ({
        title: color.title,
        value: color.value,
      }));
    }

    return [];
  };
  filterSizes = async (sizeIds) => {
    const sizes: any = await this.sizesService.getByIds(sizeIds);
    if (sizes && sizes.length) {
      return sizes.map((color) => ({
        title: color.title,
        value: color.value,
      }));
    }

    return [];
  };
  filterCategory = async (categoryId) => {
    const category = await this.categoriesService.getOne(categoryId);
    return category?.title || null;
  };
  filterTags = async (tagIds) => {
    const tags = await this.tagsService.getMany(tagIds);

    return tags?.map((tag) => tag.name) || [];
  };
  filterReview = async (id) => {
    return await this.reviewsService.getReviewsByProductId(id);
  };
  calculateReview = async (id) => {
    const reviews = await this.filterReview(id);
    const average = (array) =>
      Math.floor(array.reduce((a, b) => a + b) / array.length);

    return {
      rate: average(reviews.map((review) => review.rate)),
      percent: (average(reviews.map((review) => review.rate)) / 5) * 100,
    };
  };

  async getAll() {
    const products = await this.productsModel.find({ status: 'active' });

    if (!products.length)
      return {
        data: [],
        total: 0,
      };

    return {
      data: await Promise.all(
        products?.map(async (item: any) => ({
          _id: item?._doc._id,
          name: item?._doc.name,
          price: item?._doc.price,
          discountPrice: await this.calculateDiscount(item?._doc),
          discount: await this.discountService.getOne(item.discountId, true),
          category: await this.filterCategory(item?._doc.categoryId),
          // quantity: item?._doc.quantity,
          // sku: item?._doc.skuId,
          // status: item?._doc.status,
          createdAt: item?._doc.createdAt,
          updatedAt: item?._doc.updatedAt,
          description: item?._doc.description,
          galleries: await this.galleriesService.getImages(item?._doc?._id),
          colors: await this.filterColors(item?._doc?.attributes?.colorIds),
          sizes: await this.filterSizes(item?._doc?.attributes?.sizeIds),
        })),
      ),
      total: products.length,
    };
  }

  async getOne(id, isCollection?) {
    const found: any = await this.productsModel.findOne({ _id: id });

    if (!found._doc) throw new NotFoundException();

    if (isCollection) {
      return {
        _id: found?._doc._id,
        name: found?._doc.name,
        price: found?._doc.price,
        discountPrice: await this.calculateDiscount(found?._doc),
        discount: await this.discountService.getOne(found.discountId, true),
        category: await this.filterCategory(found?._doc.categoryId),
        // status: found?._doc.status,
        createdAt: found?._doc.createdAt,
        updatedAt: found?._doc.updatedAt,
        description: found?._doc.description,
        galleries: await this.galleriesService.getImages(found?._doc?._id),
        tags: await this.filterTags(found?._doc?.tagIds),
      };
    }

    return {
      _id: found?._doc._id,
      name: found?._doc.name,
      price: found?._doc.price,
      discountPrice: await this.calculateDiscount(found?._doc),
      discount: await this.discountService.getOne(found.discountId, true),
      quantity: found?._doc.quantity,
      category: await this.filterCategory(found?._doc.categoryId),
      // sku: found?._doc.skuId,
      // status: found?._doc.status,
      createdAt: found?._doc.createdAt,
      updatedAt: found?._doc.updatedAt,
      description: found?._doc.description,
      galleries: await this.galleriesService.getImages(found?._doc?._id),
      colors: await this.filterColors(found?._doc?.attributes?.colorIds),
      sizes: await this.filterSizes(found?._doc?.attributes?.sizeIds),
      tags: await this.filterTags(found?._doc?.tagIds),
      reviews: await this.filterReview(found._doc._id),
      review: await this.calculateReview(found._doc._id),
    };
  }

  async getInSale() {
    const products = await this.productsModel.find({ status: 'active' });

    if (!products.length)
      return {
        data: [],
        total: 0,
      };

    return {
      data: await Promise.all(
        products?.map(async (item: any) => ({
          _id: item?._doc._id,
          discount: await this.discountService.getOne(item.discountId, true),
          // status: item?._doc.status,
          category: await this.filterCategory(item?._doc.categoryId),
          createdAt: item?._doc.createdAt,
          updatedAt: item?._doc.updatedAt,
          galleries: await this.galleriesService.getImages(item?._doc?._id),
        })),
      ),
      total: products.length,
    };
  }

  async getHighlights() {
    const ids = [
      '64b6d931f6b709c40c8f397c',
      '64b6d928f6b709c40c8f397b',
      '64b6d923f6b709c40c8f397a',
      '64b6d91ef6b709c40c8f3979',
      '64b6bd71f6b709c40c8f396d',
      '64a7f2a1e09d4b6808b94662',
    ];
    const products = await this.productsModel.find({ _id: { $in: ids } });

    if (!products.length)
      return {
        data: [],
        total: 0,
      };

    return {
      data: await Promise.all(
        products?.map(async (item: any) => ({
          _id: item?._doc._id,
          name: item?._doc.name,
          discount: await this.discountService.getOne(item.discountId, true),
          // status: item?._doc.status,
          category: await this.filterCategory(item?._doc.categoryId),
          createdAt: item?._doc.createdAt,
          updatedAt: item?._doc.updatedAt,
          galleries: await this.galleriesService.getImages(item?._doc?._id),
        })),
      ),
      total: products.length,
    };
  }

  async create(product: CreateProduct): Promise<any> {
    const findProduct = await this.productsModel.findOne({
      name: product.name,
    });
    // Find Product
    if (findProduct) {
      throw new ConflictException('There is another product like this name');
    }

    const newProduct = new this.productsModel({
      ...product,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CreateProduct);
    return await newProduct.save();
  }
}
