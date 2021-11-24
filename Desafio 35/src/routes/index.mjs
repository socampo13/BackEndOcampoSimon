import { Router } from 'express';
import routerProducts from './routerProducts';
import cartRouter from './cartRouter';
import userRouter from './userRouter';
import { LogIn } from '../middlewares/auth';
import path from 'path';
import os from 'os';
import { randoms } from '../utilities/random.mjs';

const numCPUs = os.cpus().length;
const router = Router();
const scriptPath = path.resolve(__dirname, "../utils/randoms");

router.use("/products", LogIn, routerProducts);
router.use("/cart", cartRouter);
router.use("/", userRouter);

router.get('/infoWithConsoleLog', (req, res) => {
    for (let i = 0; i < 20; i++){
        console.log('test number', i);
    }
    res.json({
        randoms: randoms(50000),
    });
});

router.get('/infoWithoutConsoleLog', (req, res) => {
    res.json({
        randoms: randoms(50000),
    });
})



export default router;

