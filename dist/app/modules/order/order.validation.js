"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectIdSchema = zod_1.z.string().regex(objectIdRegex, {
    message: 'Invalid ObjectId format',
});
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    productId: objectIdSchema,
    price: zod_1.z.number().positive({ message: 'Price must be a positive number' }),
    quantity: zod_1.z.number().int().positive({ message: 'Quantity must be a positive integer' }),
});
exports.default = orderValidationSchema;
