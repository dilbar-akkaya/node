"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserCartController = exports.updateUserCartController = exports.getUserCartController = void 0;
const db_1 = require("db/db");
const cartService_1 = require("../services/cartService");
const getUserCartController = (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(400).json({
            error: 'Invalid user ID',
        });
    }
    console.log('req', req);
    console.log('userId', userId);
    const userCart = (0, cartService_1.getUserCart)(userId, db_1.carts);
    res.status(200).json(userCart);
};
exports.getUserCartController = getUserCartController;
const updateUserCartController = (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId || Array.isArray(userId)) {
        return res.status(400).json({
            error: 'Invalid user ID',
        });
    }
    (0, cartService_1.updateUserCart)(userId, db_1.carts, req.body, db_1.cartsEntities);
    const updatedCart = (0, cartService_1.getUserCart)(userId, db_1.carts);
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
    });
};
exports.updateUserCartController = updateUserCartController;
const deleteUserCartController = (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(403).json({
            error: 'Header is missing',
        });
    }
    const deletedUserCart = (0, cartService_1.deleteUserCart)(userId, db_1.carts);
    if (deletedUserCart) {
        res.status(200).json({
            data: { success: true },
            error: null
        });
    }
    else {
        res.status(404).json({
            data: { success: false },
            error: 'Not found'
        });
    }
};
exports.deleteUserCartController = deleteUserCartController;
