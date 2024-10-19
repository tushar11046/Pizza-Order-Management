import express from 'express';

import { ingredientsController, orderController } from '../../controllers/';

const router = express.Router();

router.post('/add-ingredients', ingredientsController.addIngredient);
router.put('/update-ingredients/:id', ingredientsController.updateIngredient);
router.delete('/delete-ingredients/:id', ingredientsController.deleteIngredient);
router.put('/update-order/:id', orderController.updateOrder);
export default router;