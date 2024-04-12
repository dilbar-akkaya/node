import { Request, Response } from "express";
import { getAllProducts, getProductById } from '../services/productService';
import { products } from "../repository/repository";

export const getAllProductsController = async (req: Request, res: Response) => {
  const productsDB = getAllProducts(products);
  res.json(productsDB);
}

export const getProductByIdController = (req: Request, res: Response) => {
  const productId = req.params.id;
  console.log(productId)
  const product = getProductById(productId, products);
  res.json(product);
}