import { ProductEntity } from "./product";
export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string;
  userId: string;
  isDeleted?: boolean;
  items: CartItemEntity[];
  total?: number;
}

export interface ICartResponse {
    data: {
      cart: {
        id: string,
        items: CartItemEntity[]
      },
      total: 400
    },
    error: null
  }