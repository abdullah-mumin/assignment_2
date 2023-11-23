import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserToDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

export const userServices = {
  createUserToDB,
};
