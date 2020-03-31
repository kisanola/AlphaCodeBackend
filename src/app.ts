import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import connectDb from './models';

const app = express();

connectDb()
  .then((result: any) => {
    console.log('connected to mongodb successfully');
  })
  .catch((err: any) => {
    console.log('failed to connect to mongodb', err);
  });

app.use(cors());
app.use(express.json());
app.use(routes);
app.get(
  '/',
  (req: Request, res: Response): Response => {
    return res.status(200).send({ message: 'Welcome to Alpha Code' });
  },
);
app.use(
  (req: Request, res: Response): Response => {
    return res.status(404).send({ message: 'Route not found' });
  },
);

export default app;
