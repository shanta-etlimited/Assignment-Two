import { Request, Response } from 'express';
import { OrderServices } from './order.service';

//create order controller
const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const result = await OrderServices.createOrder(orderData);
        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
        });
    }
}


//get all orders controller
const getOrdersByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.query;
  
      if (email && typeof email === "string") {
        const result = await OrderServices.getOrdersByEmail(email);
        if (result.length === 0) {
          return res.status(404).json({
            success: false,
            message: "Order not found",
          });
        }
        return res.status(200).json({
          success: true,
          message: `Orders fetched successfully for user email!`,
          data: result,
        });
      } else {
        const result = await OrderServices.getAllOrders();
        return res.status(200).json({
          success: true,
          message: `Orders fetched successfully!`,
          data: result,
        });
      }
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err,
      });
    }
}

export const OrderControllers = {
    createOrder,
    getOrdersByEmail,
};
