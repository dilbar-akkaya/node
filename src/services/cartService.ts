import { products } from 'db/db';
import { CartEntity, CartItemEntity } from 'types/cart';
import { v4 as uuidv4 } from 'uuid';


export const getUserCart = (userId: string, arr: CartEntity[]) => {
  if (!userId) {
    throw new Error("Invalid user ID");
  }
  const userCart = arr.find(item => item.userId === userId);
  if (!userCart) {
    const newCart = {
      userId: userId,
      id: uuidv4(),
      items: [],
      total: 0
    };
    arr.push(newCart);
    console.log(arr)
    return newCart;
  }
  return userCart;
}

export const updateUserCart = (userId: string, arrCarts: CartEntity[], data: { productId: string, count: number }, arrProducts: CartItemEntity[]) => {
  const userCart = getUserCart(userId, arrCarts);
  const existIndex = arrProducts.findIndex(item => item.product.id === data.productId);
  if (existIndex !== -1) {
    userCart.items[existIndex].count = data.count;
  } else {
    const productAllFields = products.find((item) => {
      return item.id === data.productId;
    });
    if (productAllFields) {
      console.log(productAllFields)
      const newProductInCart: CartItemEntity = {
        product: productAllFields,
        count: data.count,
      };
      userCart.items = [...userCart.items, newProductInCart];
    }
  }
}