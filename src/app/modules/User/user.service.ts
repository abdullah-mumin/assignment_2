import { TUser } from './user.interface';
import { User } from './user.model';

const createUserToDB = async (userData: TUser) => {
  const result = await User.create(userData); // create user
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.aggregate([
    { $match: { userId: { $exists: true } } }, //stage-1: check userID exists or not
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } }, //stage-2: show specific data in response
  ]);
  return result;
};

const getUserByIDFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.aggregate([
      { $match: { userId: id } }, //stage-1: check user is exists or not with that userId
      {
        //stage-2: show specific data in response
        $project: {
          userId: 1,
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          isActive: 1,
          hobbies: 1,
          address: 1,
        },
      },
    ]);
    return result;
  } else {
    return null;
  }
};

const updateUserByIdFromDB = async (id: number, userData: TUser) => {
  if (await User.isUserExists(id)) {
    const result = await User.updateOne(
      { userId: id }, //check user is exists or not with that userId
      { $set: userData }, // set the updated data
      { upsert: true },
    );

    // check data is updated or not
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
    const result = await User.deleteOne({ userId: id }); //delete user from database using userId
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
