import { Router } from "express";
import { productController } from '../controllers/productController';
import { checkAdmin } from '../middlewares/checkAdmin';

const router = Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.checkProductExist, productController.getProducts);
router.post("/add", checkAdmin, productController.checkAddProduct, productController.updateProduct);
router.delete("/delete/:id", checkAdmin, productController.checkProductExist, productController.delete);

export default router;