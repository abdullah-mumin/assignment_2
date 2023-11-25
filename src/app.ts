import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { userRoutes } from './app/modules/User/user.route';
import { orderRoutes } from './app/modules/Order/order.route';

//perser
app.use(express.json());
app.use(cors());

//application request
app.use('/api/users', userRoutes);
app.use('/api/users', orderRoutes);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Root Devs API',
  });
};
app.get('/', getAController);

export default app;
