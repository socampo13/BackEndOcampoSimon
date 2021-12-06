import { Router } from "express";
import productsRouter from "./productsRouter";
import cartRouter from "./cartRouter";
import usersRouter from "./usersRouter";
import { logIn } from "../middlewares/auth";

const router = Router();

router.use('/products', logIn, productsRouter);
router.use('/cart', cartRouter);
router.use('/', usersRouter);

export default router;