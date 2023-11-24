import { Schema } from 'mongoose';
import { TOrder } from './order.interface';

export const OrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    maxlength: [30, 'Product Name can not be more then 30 characters!'],
    // required: [true, 'Product Name is required!'],
  },
  price: {
    type: Number,
    // required: [true, 'Price is required!'],
  },
  quantity: {
    type: Number,
    // required: [true, 'Quantity is required!'],
  },
});

// export const Order = model<TOrder>('User', OrderSchema);
