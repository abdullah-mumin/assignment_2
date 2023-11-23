import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { userRoutes } from './app/modules/User/user.route';

//perser
app.use(express.json());
app.use(cors());

//application request
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Root Devs!');
});

app.post('/', (req: Request, res: Response) => {
  res.send('Hello from Root Devs!');
});

export default app;
