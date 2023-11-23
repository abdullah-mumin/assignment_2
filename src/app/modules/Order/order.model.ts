import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

export const OrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// OrderSchema.post('aggregate', function(next){
//     this.pipeline()
// })

export const Order = model<TOrder>('User', OrderSchema);
