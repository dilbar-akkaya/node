import { CartEntity, CartItemEntity } from "types/cart";
import { ProductEntity } from "types/product";

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
/* export const carts = [
    {
        data: {
          cart: {
            id: "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
            items: [
              {
                product: {
                  id: "891389f0-4312-42d6-a650-6fda0959c734",
                  title: "Book",
                  description: "Interesting book",
                  price: 200
                },
                count: 2
              }
            ]
          },
          total: 400
        },
        error: null
      }
]; */