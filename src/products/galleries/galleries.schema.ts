import * as mongoose from 'mongoose';

export const GalleriesSchema = new mongoose.Schema({
  images: [],
  productId: String,
});
