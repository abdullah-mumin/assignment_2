import { TUser } from './user.interface';
import { User } from './user.model';

const createUserToDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.aggregate([
    { $match: { _id: { $exists: true } } },
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

const getUserByIDFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    throw new Error('User already exists!');
  }

  const result = await User.findOne({ userId: id });
  return result;
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getUserByIDFromDB,
};
