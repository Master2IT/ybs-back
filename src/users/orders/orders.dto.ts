export class CreateOrdersDto {
  userId: string;
  productId: string;
}

export class UpdateOrdersDto {
  id: string;
  userId: string;
  productId: string;
  trackingCode: string;
  status: string;
}
