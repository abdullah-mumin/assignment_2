import { z } from 'zod';

const orderValidationSchema = z.object({
  productName: z
    .string()
    .min(1, { message: 'Product Name is required!' })
    .max(30, { message: 'Product Name can not be more than 30 characters!' }),
  price: z.number().min(0, { message: 'Price must be a non-negative number!' }),
  quantity: z
    .number()
    .int()
    .min(1, { message: 'Quantity must be a positive integer!' }),
});

// const ordersValidationSchema = z.array(orderValidationSchema);

export default orderValidationSchema;
