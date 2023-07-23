export class CreateDiscount {
  title: string;
  type: 'percent' | 'price';
  count: number;
  value: number;
}
