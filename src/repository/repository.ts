import { CartEntity, CartItemEntity } from "types/cart";
import { ProductEntity } from "types/product";
import { v4 as uuidv4 } from 'uuid';

export const users = [{
    id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
}];
export const products: ProductEntity[] = [
    {
        id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
        title: 'Book',
        description: 'A very interesting book',
        price: 100
    },
    {
        id: '99942fcd-0366-3226-ad5b-c43333v6f64a',
        title: 'Book',
        description: 'A book',
        price: 50
    },
    {
        id: "891389f0-4312-42d6-a650-6fda0959c734",
        title: "Book",
        description: "Interesting book",
        price: 200
    }
];
export const orders = [];
export const carts: CartEntity[] = [];
export const cartsEntities: CartItemEntity[] = [];

export const repository = {
  getUserCart: (userId: string) => {
    if (!userId) {
      throw new Error("Invalid user ID");
    }
    const userCart = carts.find(item => item.userId === userId);
    if (!userCart) {
      const newCart = {
        userId: userId,
        id: uuidv4(),
        items: [],
        total: 0
      };
      carts.push(newCart);
      console.log(carts)
      return newCart;
    }
    return userCart;
  },
  updateUserCart: (userId: string, data: { productId: string, count: number }) => {
  const userCart = repository.getUserCart(userId);
  const existIndex = cartsEntities.findIndex(item => item.product.id === data.productId);
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
},
deleteUserCart: (userId: string) => {
  const userCart = repository.getUserCart(userId);
  if (userCart) {
    userCart.items = [];
    userCart.total = 0;
  }
  return true;
}
}
