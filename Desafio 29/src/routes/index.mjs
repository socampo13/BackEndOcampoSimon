import { Router } from 'express';
import routerProducts from './routerProducts';
import cartRouter from './cartRouter';
import userRouter from './userRouter';
import { LogIn } from '../middlewares/auth';
import { fork } from 'child_process';
import path from 'path';

const router = Router();
const scriptPath = path.resolve(__dirname, "../utils/randoms");

router.use("/products", LogIn, routerProducts);
router.use("/cart", cartRouter);
router.use("/", userRouter);

router.get("/info", (req, res) => {
    res.json({
        arguments: process.argv,
        platform: process.platform,
        nodeVersion: process.version,
        directory: process.cwd(),
        processId: process.pid,
        memoryUse: process.memoryUsage(),
    });
});

router.get("/randoms", (req, res) => {
    let numbers;
    req.query.cant ? (numbers = Number(req.query.cant)) : 100000000;
    const randoms = fork(scriptPath);
    const mssg = { command: "start", quantity: numbers };
    randoms.send(JSON.stringify(mssg));
    randoms.on("message", (result) => {
        res.json(result);
    }); 
});

export default router;

export default router;