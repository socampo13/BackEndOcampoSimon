import { Router } from 'express';
import passport from 'passport';
import { logIn } from '../middlewares/auth';
import { productsBox } from '../models/productModels';
import { logger } from '../middlewares/logger';
import { Cart } from '../apis/Cart'
import { productCart } from '../interfaces/cartInterface';
import { emailService } from '../services/emailService';
import config from '../config';
import { Whatsapp } from '../services/twilioWS.mjs';
import { SmsService } from '../services/twilio.mjs';
import { userAPI } from '../apis/User';

const router = Router();

router.get('/', async (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/api/view');
    }
        res.render('logIn');
});

router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', function(err, user, info) {
        if(err){
            return next(err);
        }
        if(!user) return res.status(401).json({data : info});

        res.redirect('/api');
    })(req, res);
});

router.get('signUp', (req, res) => {
    res.render('signUp');
});

router.post('/login', passport.authenticate('/login'), (req, res) => {
    res.redirect('/api/view');
});

router.get('/view', logIn, async (req, res) => {
    const result = await productsBox.get();
    const user : any = req.user;
    const userObject = {
        username: user.username,
        email: user.email,
    }
    res.render('main', {
        user: userObject,
        products: result
    })
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/api');
    });
});

router.get('/userCart', async (req, res) => {
    const user : any = req.user;
    const userId = user._id;
    const cart = await Cart.getCart(userId);

    let array: Array<any> = [];
    await cart.products.forEach(async (element: {_id: string | undefined; amount: number} ) => {
        const result = await productsBox.get(element._id);
        const order = {
            result,
            amount: element.amount
        }
        array.push(order);
    });

    res.render('cart', {
        products: array,
    })
});

router.get('/data', (req, res) => {
    const user : any = req.user;
    const userObject = {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phone: user.phone,
        age: user.age,
    }
    res.render('data', {userObject});
});

router.post('/update', async (req, res) => {
    const {data} = req.body;
    const user : any = req.user;
    await userAPI.updateUser(user._id, data);
    res.redirect('/api/view');
});

router.get('/submit', async (req, res) => {
    const user : any = req.user;
    const userId = user.id;
    const cart = await Cart.getCart(userId);

    let array : Array<any> = await Promise.all(cart.products.map(async (element : any) => {
        const result = await productsBox.get(element._id);
        const order = {
            result,
            amount: element.amount,
        }
        return order;
    }));

    const complete = {
        username: user.username,
        email: user.email,
        order: array,
    };

    let stringOrder = '';

    for(let index = 0; index < array.length; index++){
        stringOrder = stringOrder + `Product: ${array[index].result.name}<br>
        Price: ${array[index].result.price}<br>
        Amount: ${array[index].amount}<br>
        <br>
        Username: ${user.username}<br>
        Email: ${user.email}`;
    };

    const response = await Whatsapp.sendMessage(`+${user.phonenumber}`, stringOrder);
    logger.info(response);
    await emailService.sendEmail(config.GMAIL_EMAIL, `Order from ${complete.username}`, stringOrder);
    await Cart.deleteCart(userId);
    await SmsService.sendMessage(`+${user.phonenumber}`,'Your request is in progress');
    res.redirect('/api/view');
});

export default router;