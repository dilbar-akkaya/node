"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByIdController = exports.getAllProductsController = void 0;
const productService_1 = require("../services/productService");
const db_1 = require("db/db");
const getAllProductsController = async (req, res) => {
    const productsDB = (0, productService_1.getAllProducts)(db_1.products);
    res.json(productsDB);
};
exports.getAllProductsController = getAllProductsController;
const getProductByIdController = (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    const product = (0, productService_1.getProductById)(productId, db_1.products);
    res.json(product);
};
exports.getProductByIdController = getProductByIdController;
