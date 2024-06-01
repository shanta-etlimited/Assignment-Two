import { IOrder } from './order.interface';
import { Order } from './order.model';
import { Product } from '../product/product.model';
import { ValidatedOrderData } from './order.validation';

const createOrder = async (orderData: ValidatedOrderData) => {
    const { productId, quantity } = orderData;
    const product = await Product.findById(productId);

    if (!product || product.isDeleted) {
        throw new Error('Product not found or is deleted');
    }
    if (product.inventory.quantity < quantity) {
        throw new Error('Insufficient quantity available in inventory');
    }

    // Update product inventory
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    // Create and save the order
    const order = new Order(orderData);
    const result = await order.save();
    return result;
}

const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
}

const getOrdersByEmail = async (email: string) => {
    const orders = await Order.find({ email });
    return orders;
}

export const OrderServices = {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
};
