"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const order_model_1 = require("./order.model");
const product_model_1 = require("../product/product.model");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = orderData;
    const product = yield product_model_1.Product.findById(productId);
    if (!product || product.isDeleted) {
        throw new Error('Product not found or is deleted');
    }
    if (product.inventory.quantity < quantity) {
        throw new Error('Insufficient quantity available in inventory');
    }
    // Update product inventory
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    yield product.save();
    // Create and save the order
    const order = new order_model_1.Order(orderData);
    const result = yield order.save();
    return result;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find();
    return orders;
});
const getOrdersByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find({ email });
    return orders;
});
exports.OrderServices = {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
};
