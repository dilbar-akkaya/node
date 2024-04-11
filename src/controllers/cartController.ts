import { carts, cartsEntities, products } from "db/db";
import { Request, Response } from "express";
import { getUserCart, updateUserCart } from "services/cartService";

export const getUserCartController = (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'];
  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({
      error: 'Invalid user ID',
    });
  }
  console.log('req', req)
  console.log('userId', userId)
  const userCart = getUserCart(userId, carts);
  res.json(userCart);
}

export const updateUserCartController = (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'];
  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({
      error: 'Invalid user ID',
    });
  }
  updateUserCart(userId, carts, req.body, cartsEntities)
  const updatedCart = getUserCart(userId, carts);
  let total = 0;
  for (let item of updatedCart.items) {
    total += item.count * item.product.price;
  }
  res.json({
    data: {
      cart: updatedCart,
      total: total,
    },
    error: null,
  })
}
