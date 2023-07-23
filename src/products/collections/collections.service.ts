import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollectionsDto } from './collections.dto';
import { ProductsService } from '../products.service';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel('Collections') private collectionsModel: Model<CollectionsDto>,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
  ) {}

  async getAll() {
    const collections: any = (await this.collectionsModel.find()) || [];

    return collections.map((collection) => ({
      _id: collection._id,
      name: collection.name,
      image: collection.image,
    }));
  }

  async getOne(id: string) {
    const collection: any =
      (await this.collectionsModel.findOne({ _id: id })) || {};

    return {
      _id: collection._id,
      name: collection.name,
      products: await Promise.all(
        collection.productIds.map(
          async (productId) =>
            await this.productsService.getOne(productId, true),
        ),
      ),
      image: collection.image,
    };
  }

  async create(data: CollectionsDto): Promise<CollectionsDto> {
    const hasFound = await this.collectionsModel.findOne({ name: data.name });
    if (hasFound) throw new ConflictException();

    const model = new this.collectionsModel(data);
    return await model.save();
  }
}
