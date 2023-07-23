import * as mongoose from 'mongoose';

export const OrdersSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  trackingCode: String,
  status: String,
});
