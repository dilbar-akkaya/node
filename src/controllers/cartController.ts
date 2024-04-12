import { carts, cartsEntities, products } from "../db/db";
import { Request, Response } from "express";
import { deleteUserCart, getUserCart, updateUserCart } from "../services/cartService";

export const getUserCartController = (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;
  if (!userId) {
    return res.status(400).json({
      error: 'Invalid user ID',
    });
  }
  console.log('req', req)
  console.log('userId', userId)
  const userCart = getUserCart(userId, carts);
  res.status(200).json(userCart);
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
  return res.status(200).json({
    data: {
      cart: updatedCart,
      total: total,
    },
    error: null,
  })
}

export const deleteUserCartController = (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;
  if (!userId) {
    return res.status(403).json({
      error: 'Header is missing',
    });
  }
  const deletedUserCart = deleteUserCart(userId, carts);
  if (deletedUserCart) {
    res.status(200).json({
      data: { success: true },
      error: null 
    });
  } else {
    res.status(404).json({
      data: { success: false },
      error: 'Not found' });
  }
}