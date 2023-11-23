import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

//call controller function
router.post('/', userController.createUser);

export const userRoutes = router;
