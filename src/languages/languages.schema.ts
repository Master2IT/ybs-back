import * as mongoose from 'mongoose';

export const LanguagesSchema = new mongoose.Schema({
  name: String,
  lang: String,
  domain: String,
  isActive: Boolean,
  currency: {
    name: String,
    iso: String,
  },
  status: String,
});
