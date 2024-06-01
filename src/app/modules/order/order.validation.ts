import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectIdSchema = z.string().regex(objectIdRegex, {
  message: 'Invalid ObjectId format',
});
const orderValidationSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    productId: objectIdSchema,
    price: z.number().positive({ message: 'Price must be a positive number' }),
    quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
});
  
export default orderValidationSchema;