import { Request, Response } from 'express';
import { orderServices } from './order.service';

const createOrderById = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const orderData = req.body;
    const result = await orderServices.createOrderByIDToDB(
      parseInt(userID),
      orderData,
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
