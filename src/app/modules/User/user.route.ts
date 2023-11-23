import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

//call controller function
router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getUserById);

router.put('/:userId', userController.updateUserById);

router.delete('/:userId', userController.deleteUserByID);

export const userRoutes = router;
