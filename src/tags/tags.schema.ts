import * as mongoose from 'mongoose';

export const TagsSchema = new mongoose.Schema({
  name: String,
});
