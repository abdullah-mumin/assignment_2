import { User } from '../User/user.model';
import { TOrder } from './order.interface';

const createOrderByIDToDB = async (id: number, orderData: TOrder) => {
  if (await User.isUserExists(id)) {
    const updatedData = await User.updateOne(
      { userId: id },
      { $push: { orders: orderData } },
      { upsert: true },
    );
    return updatedData;
  } else {
    return null;
  }
};

const getOrdersByIDFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.findOne({ userId: id });
    return result;
  } else {
    return null;
  }
};

const getTotalOrdersPriceByIdFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.aggregate([
      { $match: { userId: id } },
      { $unwind: '$orders' },
      {
        $project: {
          totalCost: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
      {
        $group: {
          _id: 0,
          totalPrice: { $sum: '$totalCost' },
        },
      },
    ]);
    const totalPriceArray: number[] = result.map((item) => item.totalPrice);
    const totalPrice: number = totalPriceArray[0];
    if (totalPrice) {
      return totalPrice;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const orderServices = {
  createOrderByIDToDB,
  getOrdersByIDFromDB,
  getTotalOrdersPriceByIdFromDB,
};
