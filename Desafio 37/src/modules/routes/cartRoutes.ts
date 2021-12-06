import {  Router } from 'express';
import { cartController } from '../controllers/cartController';
import { logIn } from '../middlewares/auth';

const router = Router();

router.get('/', cartController.getCart);
router.post('/add', cartController.addProduct);
router.post('/delete', cartController.deleteProduct);

export default router;