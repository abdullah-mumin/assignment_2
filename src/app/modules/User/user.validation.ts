import { z } from 'zod';

// Define Zod schema for the full name
export const fullNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required!',
      invalid_type_error: 'First Name must be a string!',
    })
    .max(20),
  lastName: z
    .string({
      required_error: 'Last Name is required!',
      invalid_type_error: 'Last Name must be a string!',
    })
    .max(20),
});

// Define Zod schema for the address
export const addressValidationSchema = z.object({
  street: z.string({
    required_error: 'Street is required!',
    invalid_type_error: 'Street must be a string!',
  }),
  city: z.string({
    required_error: 'City is required!',
    invalid_type_error: 'City must be a string!',
  }),
  country: z.string({
    required_error: 'Country is required!',
    invalid_type_error: 'Country must be a string!',
  }),
});

// Define Zod schema for the user
export const userValidationSchema = z.object({
  userId: z.number({
    required_error: 'ID is required!',
    invalid_type_error: 'ID must be a number!',
  }),
  username: z.string({
    required_error: 'Username is required!',
    invalid_type_error: 'Username must be a string!',
  }),
  password: z.string({
    required_error: 'Password is required!',
    invalid_type_error: 'Password must be a string!',
  }),
  fullName: fullNameValidationSchema,
  age: z.number({
    required_error: 'Age is required!',
    invalid_type_error: 'Age must be a number!',
  }),
  email: z
    .string({
      required_error: 'Email is required!',
      invalid_type_error: 'Email must be a string!',
    })
    .email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).default([]),
  address: addressValidationSchema,
  isDelete: z.boolean().default(false),
  orders: z.array(z.object({})).default([]),
});

export default userValidationSchema;
