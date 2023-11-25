import { User } from '../User/user.model';
import { TOrder } from './order.interface';

const createOrderByIDToDB = async (id: number, orderData: TOrder) => {
  if (await User.isUserExists(id)) {
    const updatedData = await User.updateOne(
      { userId: id }, //check user is exists or not with that userId
      { $push: { orders: orderData } }, // pust data to the orders array
      { upsert: true },
    );
    return updatedData;
  } else {
    return null;
  }
};

const getOrdersByIDFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.findOne({ userId: id }); // find user data with userId
    const orders = result && result?.orders; // filter user data and get orders
    return orders;
  } else {
    return null;
  }
};

const getTotalOrdersPriceByIdFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.aggregate([
      { $match: { userId: id } }, //stage-1: check user with userId
      { $unwind: '$orders' }, //stage-2: make orders array to multiple object
      {
        $project: {
          totalCost: { $multiply: ['$orders.price', '$orders.quantity'] }, //stage-3: multiply with product price and quantity
        },
      },
      {
        $group: {
          _id: 0, ////stage-4 group by a constant value with _id
          totalPrice: { $sum: '$totalCost' }, ////stage-5 sum of the all product price as array
        },
      },
    ]);
    const totalPriceArray: number[] = result.map((item) => item.totalPrice);
    const totalPrice: number = totalPriceArray[0];
    if (totalPrice) {
      return totalPrice;
    } else {
      return 0;
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
