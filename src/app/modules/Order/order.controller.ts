import { Request, Response } from 'express';
import { orderServices } from './order.service';
import orderValidationSchema from './order.validation';
// import { TOrder } from './order.interface';

const createOrderById = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const orderData = req.body;
    // console.log(orderData);
    const orderValidationData = orderValidationSchema.parse(orderData);
    const result = await orderServices.createOrderByIDToDB(
      parseInt(userID),
      orderValidationData,
    );

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error!',
      error: {
        code: 500,
        description: error.issues[0].message,
      },
    });
  }
};

const getOrdersById = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const result = await orderServices.getOrdersByIDFromDB(parseInt(userID));

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: {
          orders: result?.orders,
        },
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getTotalOrdersPriceById = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const result = await orderServices.getTotalOrdersPriceByIdFromDB(
      parseInt(userID),
    );
    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: {
          totalPrice: result,
        },
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Orders not found!',
        error: {
          code: 404,
          description: 'Orders not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const orderController = {
  createOrderById,
  getOrdersById,
  getTotalOrdersPriceById,
};
