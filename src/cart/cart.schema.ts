import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
  products: [],
  userId: String,
});
