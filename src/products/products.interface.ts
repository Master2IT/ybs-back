// export class Response {
//   data: Product[];
//   success: boolean;
//   errors?: string[];
//   message?: string;
// }
export interface CreateProduct {
  name: string;
  categoryId: string;
  price: number;
  discountId: string;
  quantity: number;
  description: {
    shortDesc: string;
    longDesc: string;
  };
  skuId?: string;
  languageId: string;
  status?: 'active' | 'pending' | 'disable';
  tagIds: string[];
  attributes: {
    sizeIds: number[];
    colorIds: number[];
  };
  // reviewId: string;
  washAndCareId: string;
  updatedAt: Date;
  createdAt: Date;
}
