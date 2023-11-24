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
    const result = await User.findOne({ userId: id });
    return result;
  } else {
    return null;
  }
};

const updateUserByIdFromDB = async (id: number, userData: TUser) => {
  if (await User.isUserExists(id)) {
    const result = await User.updateOne(
      { userId: id },
      { $set: userData },
      { upsert: true },
    );
    if (result.modifiedCount === 1) {
      const updatedDocument = await User.findOne({ userId: id });
      return updatedDocument;
    }
  } else {
    return null;
  }
};

const deleteUserByIdFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.deleteOne({ userId: id });
    return result;
  } else {
    return null;
  }
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getUserByIDFromDB,
  updateUserByIdFromDB,
  deleteUserByIdFromDB,
};
