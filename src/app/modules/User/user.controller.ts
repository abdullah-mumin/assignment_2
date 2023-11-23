import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const result = await userServices.createUserToDB(userData);

    res.status(201).json({
      success: true,
      message: 'User create successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message || 'Something went wrong!',
    //   error: error,
    // });
  }
};

export const userController = {
  createUser,
};
