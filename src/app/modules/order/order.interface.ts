import { Document, Types } from 'mongoose';

export type IOrder = Document & {
    email: string;
    productId: Types.ObjectId;
    price: number;
    quantity: number;
};