import express from 'express';

const router = express.Router();

import { registerController, loginController, userController, refreshController, ingredientsController, orderController } from '../../controllers';
import { auth } from '../../middlewares';

router.post('/register', registerController.register)
router.post('/login', loginController.login)
router.get('/whoami', auth, userController.whoami)
router.post('/refresh', refreshController.refresh)
router.post('/logout', auth, loginController.logout)
router.get('/get-ingredient/:id', ingredientsController.getIngredient);
router.get('/get-all', ingredientsController.getAllIngredients);
router.post('/create-order', auth, orderController.createOrder);
router.get('/order/:id', orderController.getOrder);
router.get('/all-orders', orderController.getAllOrders);

export default router;