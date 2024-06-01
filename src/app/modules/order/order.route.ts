
import { Router } from 'express';
import { OrderControllers } from './order.controller';

const router = Router();

router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getOrdersByEmail);
router.get('/search', OrderControllers.getOrdersByEmail);

export const OrderRoutes = router;
