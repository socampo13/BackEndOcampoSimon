import { Router } from "express";
import { productController } from '../controllers/productController';
import { checkAdmin } from '../middlewares/checkAdmin';

const router = Router();

router.get("/", (req, res) =>{
    let photo = 'noPhoto';
    let email = 'noEmail';

    if(req.isAuthenticated()){
        const userData = req.user;
        if(userData.photos) photos = userData.photos[0].value;
        if(userData.emails) email = userData.emails[0].value;

        const totalProduct = await productController.getProducts();
        console.log('products:', totalProduct);

        res.render('main', {
            name: userData.displayName,
            photo,
            email,
            products: totalProduct
        });
    }else{
        res.redirect('/api/login');
    }
});
router.get("/:id", productController.checkProductExist, productController.getProducts);
router.post("/add", checkAdmin, productController.checkAddProduct, productController.updateProduct);
router.put("/update/:id", checkAdmin, productController.checkProductExist, productController.updateProduct);
router.delete("/delete/:id", checkAdmin, productController.checkProductExist, productController.delete);

export default router;