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
    // throw new Error('Exist');
    // console.log(userData);
    // const userInfo = await User.findOne({ userId: id });
    // if (userInfo !== userData) {
    //   const result = await User.updateOne({ userId: id }, { $set: userData });
    //   return result;
    // } else {
    //   return null;
    // }
    const result = await User.updateOne(
      { userId: id },
      { $set: userData },
      { upsert: true },
    );
    return result;
  } else {
    return null;
  }
  //   else {
  //     const result = {
  //       code: 404,
  //       description: 'User not found!',
  //     };
  //     return result;
  //   }
  //   const userInfo = await User.findOne({ userId: id });

  //   if (userInfo !== userData) {
  //     const result = await User.updateOne({ userId: id }, { $set: userData });
  //     return result;
  //   } else {
  //     throw new Error('Already updated!');
  //   }
  // const result = studentData;
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  // return result;
};

const deleteUserByIdFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.updateOne(
      { userId: id },
      { $set: { isDelete: true } },
    );
    return result;
  } else {
    return null;
  }
  // const result = await User.updateOne(
  //   { userId: id },
  //   { $set: { isDelete: true } },
  // );
  // return result;
  // const deletedData = await User.updateOne(
  //   { userId: id },
  //   { isDelete: true },
  //   { writeConcern: { w: 'majority' } },
  // );
  // console.log(deletedData);
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getUserByIDFromDB,
  updateUserByIdFromDB,
  deleteUserByIdFromDB,
};
