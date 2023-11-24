import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userValidationData = userValidationSchema.parse(userData);
    const result = await userServices.createUserToDB(userValidationData);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        (error.issues && error.issues[0].code) || 'Something went wrong!',
      error: {
        code: 500,
        description:
          (error.issues && error.issues[0].message) ||
          (error.code === 11000 &&
            error.keyPattern &&
            error.keyPattern.username &&
            'Username must be unique!') ||
          (error.code === 11000 &&
            error.keyPattern &&
            error.keyPattern.email &&
            'Email must be unique!') ||
          (error.code === 11000 &&
            error.keyPattern &&
            error.keyPattern.userId &&
            'userId must be unique!') ||
          'Something went wrong!',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: {
        code: 404,
        description: 'Something went wrong!',
      },
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const result = await userServices.getUserByIDFromDB(parseInt(userID));

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
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

const updateUserById = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const userData = req.body;
    const userValidationData = userValidationSchema.parse(userData);
    const result = await userServices.updateUserByIdFromDB(
      parseInt(userID),
      userValidationData,
    );

    if (result !== null) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
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
      message:
        (error.issues && error.issues[0].code) || 'Something went wrong!',
      error: {
        code: 500,
        description:
          (error.issues && error.issues[0].message) ||
          (error.code === 11000 &&
            error.keyPattern &&
            error.keyPattern.username &&
            'Username must be unique!') ||
          (error.code === 11000 &&
            error.keyPattern &&
            error.keyPattern.email &&
            'Email must be unique!') ||
          (error.code === 11000 &&
            error.keyPattern &&
            error.keyPattern.userId &&
            'userId must be unique!') ||
          'Something went wrong!',
      },
    });
  }
};

const deleteUserByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.deleteUserByIdFromDB(parseInt(id));

    if (result?.deletedCount === 1) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
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
        description: 'Something went wrong!',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserByID,
};
