import * as mongoose from 'mongoose';

export const SubCategoriesSchema = new mongoose.Schema({
  title: String,
  image: {
    src: String,
    alt: String,
  },
  categoryId: String,
  status: String,
  categories: [String],
});
