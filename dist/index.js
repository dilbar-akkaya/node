"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartController_1 = require("./controllers/cartController");
const productController_1 = require("./controllers/productController");
const express_1 = __importDefault(require("express"));
const middleware_1 = require("middleware");
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
app.use(middleware_1.passUserId);
app.get('/api/products', productController_1.getAllProductsController);
app.get('/api/products/:id', productController_1.getProductByIdController);
app.get('/api/profile/cart', cartController_1.getUserCartController);
app.put('/api/profile/cart', cartController_1.updateUserCartController);
app.delete('/api/profile/cart', cartController_1.deleteUserCartController);
app.get('/', (req, res) => {
    res.send('<h3> My app<h3>');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
