"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = void 0;
const getAllProducts = (arr) => {
    return arr;
};
exports.getAllProducts = getAllProducts;
const getProductById = (id, arr) => {
    return arr.find(item => item.id === id);
};
exports.getProductById = getProductById;
