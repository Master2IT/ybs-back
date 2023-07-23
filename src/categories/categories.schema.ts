import * as mongoose from 'mongoose';

export const CategoriesSchema = new mongoose.Schema({
  title: String,
  image: {
    src: String,
    alt: String,
  },
  // subCategoryId: String,
  status: String,
});
