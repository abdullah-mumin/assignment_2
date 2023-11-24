import { z } from 'zod';

const orderValidationSchema = z.object({
  productName: z
    .string({
      required_error: 'Product Name is required!',
      invalid_type_error: 'Product Name must be a string!',
    })
    .min(1, { message: 'Product Name can not be less than 1 character!' })
    .max(30, { message: 'Product Name can not be more than 30 characters!' }),
  price: z
    .number({
      required_error: 'Price is required!',
      invalid_type_error: 'Price must be a number!',
    })
    .min(0, { message: 'Price must be a non-negative number!' }),
  quantity: z
    .number({
      required_error: 'Quantity is required!',
      invalid_type_error: 'Quantity must be a number!',
    })
    .int()
    .min(1, { message: 'Quantity must be a positive integer!' }),
});

// const ordersValidationSchema = z.array(orderValidationSchema);

export default orderValidationSchema;
