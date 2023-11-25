import { Request, Response } from 'express';
import { orderServices } from './order.service';
import orderValidationSchema from './order.validation';

const createOrderById = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const orderData = req.body;

    //Zod validation
    const orderValidationData = orderValidationSchema.parse(orderData);

    //send validate data to orderServices
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
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        (error.issues && error.issues[0].code) || 'Internal Server Error!',
      error: {
        code: 500,
        description: error.issues[0].message || 'Internal Server Error!',
      },
    });
  }
};

const getOrdersById = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;

    //send & get data from orderServices
    const result = await orderServices.getOrdersByIDFromDB(parseInt(userID));

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: {
          orders: result,
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
      message: 'Something went wrong!',
      error: {
        code: 500,
        description: 'Internel server error!',
      },
    });
  }
};

const getTotalOrdersPriceById = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;

    //send & get data from orderServices
    const result = await orderServices.getTotalOrdersPriceByIdFromDB(
      parseInt(userID),
    );
    if (result !== null) {
      if (result !== 0) {
        res.status(200).json({
          success: true,
          message: 'Order fetched successfully!',
          data: {
            totalPrice: result,
          },
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Order fetched successfully!',
          data: {
            totalPrice: result,
          },
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: {
        code: 500,
        description: 'Internal server error!',
      },
    });
  }
};

export const orderController = {
  createOrderById,
  getOrdersById,
  getTotalOrdersPriceById,
};
