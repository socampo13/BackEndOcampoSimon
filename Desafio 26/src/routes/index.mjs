import { Router } from 'express';
import routerProducts from './routerProducts';
import cartRouter from './cartRouter';
import userRouter from './userRouter';
import { LogIn } from '../middlewares/auth';

const router = Router();

router.use("/products", LogIn, routerProducts);
router.use("/cart", cartRouter);
router.use("/", userRouter);

export default router;