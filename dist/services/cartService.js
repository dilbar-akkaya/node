"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserCart = exports.updateUserCart = exports.getUserCart = void 0;
const db_1 = require("db/db");
const uuid_1 = require("uuid");
const getUserCart = (userId, arr) => {
    if (!userId) {
        throw new Error("Invalid user ID");
    }
    const userCart = arr.find(item => item.userId === userId);
    if (!userCart) {
        const newCart = {
            userId: userId,
            id: (0, uuid_1.v4)(),
            items: [],
            total: 0
        };
        arr.push(newCart);
        console.log(arr);
        return newCart;
    }
    return userCart;
};
exports.getUserCart = getUserCart;
const updateUserCart = (userId, arrCarts, data, arrProducts) => {
    const userCart = (0, exports.getUserCart)(userId, arrCarts);
    const existIndex = arrProducts.findIndex(item => item.product.id === data.productId);
    if (existIndex !== -1) {
        userCart.items[existIndex].count = data.count;
    }
    else {
        const productAllFields = db_1.products.find((item) => {
            return item.id === data.productId;
        });
        if (productAllFields) {
            console.log(productAllFields);
            const newProductInCart = {
                product: productAllFields,
                count: data.count,
            };
            userCart.items = [...userCart.items, newProductInCart];
        }
    }
};
exports.updateUserCart = updateUserCart;
const deleteUserCart = (userId, arr) => {
    const userCart = (0, exports.getUserCart)(userId, arr);
    if (userCart) {
        userCart.items = [];
        userCart.total = 0;
    }
    return true;
};
exports.deleteUserCart = deleteUserCart;
