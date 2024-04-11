import { getUserCartController, updateUserCartController } from 'controllers/cartController';
import { getAllProductsController, getProductByIdController } from 'controllers/productController';
import express, { Request, Response} from 'express';
import { passUserId } from 'middleware';

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(passUserId);
app.get('/api/products', getAllProductsController);
app.get('/api/products/:id', getProductByIdController);
app.get('/api/profile/cart', getUserCartController);
app.put('/api/profile/cart', updateUserCartController);

app.get('/', (req: Request, res: Response) => {
    res.send('<h3> My app<h3>');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});