import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    maxlength: [20, 'First Name can not be more then 20 characters!'],
    required: [true, 'First Name is required!'],
  },
  lastName: {
    type: String,
    maxlength: [20, 'Last Name can not be more then 20 characters!'],
    required: [true, 'Last Name is required!'],
  },
});

export const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required!'],
  },
  city: {
    type: String,
    required: [true, 'City is required!'],
  },
  country: {
    type: String,
    required: [true, 'Country is required!'],
  },
});

export const UserSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'ID is required!'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
    required: [true, 'Age is required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  address: addressSchema,
  isDelete: {
    type: Boolean,
    default: false,
  },
  orders: {
    type: [Object],
    default: [],
  },
});

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //document

  //hashing password and save in DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

UserSchema.post('save', async function (doc, next) {
  //   doc.set('password').save();
  //   doc.set('fullName')
  // delete doc.password;
  // try {
  //   // Remove the password field from the database
  //   await User.updateOne({ _id: doc._id }, { $unset: { password: 1 } });
  //   // Remove the password field from the in-memory
  //   // doc.password = "";
  //   next();
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // } catch (err: any) {
  //   return next(err);
  // }
  next();
});

//custom static function
UserSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });

  return existingUser;
};

export const User = model<TUser, UserModel>('User', UserSchema);
