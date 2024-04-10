import { ProductEntity } from "types/product";

export const getAllProducts = (arr: ProductEntity[]) => {
  return arr;
}
export const getProductById = (id: string, arr: ProductEntity[]) => {
  return arr.find(item => item.id === id);
}