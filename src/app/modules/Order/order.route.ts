import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

//call controller function
router.put('/:userId/orders', orderController.createOrderById);

router.get('/:userId/orders', orderController.getOrdersById);

router.get(
  '/:userId/orders/total-price',
  orderController.getTotalOrdersPriceById,
);

export const orderRoutes = router;
