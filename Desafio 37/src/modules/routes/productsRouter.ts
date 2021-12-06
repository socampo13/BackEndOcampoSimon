import { Router } from "express";
import { productsController } from "../controllers/productsController";
import { checkAdmin } from "../middlewares/checkAdmin";

const router = Router();

router.get('/', productsController.getProducts); 
router.get('/:id', productsController.checkProductExist, productsController.getProduct);
router.post('/add', checkAdmin, productsController.checkProductExist, productsController.addProduct);
router.put('/update/:id', checkAdmin, productsController.checkProductExist, productsController.updateProduct);
router.delete('/delete/:id', checkAdmin, productsController.checkProductExist, productsController.deleteProduct);

export default router;