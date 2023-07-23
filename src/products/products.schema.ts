import * as mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  name: String,
  categoryId: String,
  price: Number,
  quantity: Number,
  discountId: String,
  description: {
    shortDesc: String,
    longDesc: String,
  },
  skuId: Number,
  languageId: String,
  status: String,
  tagIds: [String],
  attributes: {
    sizeIds: [String],
    colorIds: [String],
  },
  // reviewId: String,
  washAndCareId: String,
  shippingId: String,
  createdAt: Date,
  updatedAt: Date,
});
