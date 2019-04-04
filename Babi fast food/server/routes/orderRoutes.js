import express from 'express';
import {
  placeOrder, getUserOrderHistory, getAllOrders, getSpecificOrder,
  processOrder, cancelOrder, completeOrder, deleteOrder
} from '../controllers/ordersController';
import {
  placeOrderValidator, getOrderHistoryValidator, getSpecificOrderValidator,
  updateOrderValidator, completeOrderValidator
} from '../middlewares/orderInputValidations';
import { verifyToken, authorizedAdmin } from '../middlewares/authorization';

const orderRouter = express.Router();

orderRouter.post('/orders', verifyToken, placeOrderValidator, placeOrder);

orderRouter.get('/users/:userId/orders', verifyToken, getOrderHistoryValidator, getUserOrderHistory);
orderRouter.get('/orders', verifyToken, authorizedAdmin, getAllOrders);
orderRouter.get('/orders/:orderId', verifyToken, authorizedAdmin, getSpecificOrderValidator, getSpecificOrder);
orderRouter.delete('/orders/:orderId', verifyToken, deleteOrder);
orderRouter.put('/orders/:orderId/process', verifyToken, authorizedAdmin, getSpecificOrderValidator, updateOrderValidator, processOrder);
orderRouter.put('/orders/:orderId/cancel', verifyToken, authorizedAdmin, getSpecificOrderValidator, updateOrderValidator, cancelOrder);
orderRouter.put('/orders/:orderId/complete', verifyToken, authorizedAdmin, getSpecificOrderValidator, completeOrderValidator, completeOrder);

export default orderRouter;
