import * as mongoose from 'mongoose';

export const CollectionsSchema = new mongoose.Schema({
  name: String,
  productIds: [String],
  image: String,
});
