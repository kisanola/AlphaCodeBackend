import express, { Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import routes from './resources';
import joiErrors from './middlewares/joiErrors';

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1', routes);

app.use(joiErrors());

app.get(
  '/',
  (req: Request, res: Response): Response => {
    return res.status(200).send({ message: 'Welcome to Alpha Code' });
  },
);

const NotFoundHandler = (req: Request, res: Response): Response => {
  return res.status(404).send({ message: 'Route not found' });
};

app.use(NotFoundHandler);

app.use((err: any, req: Request, res: Response) => {
  if (!isProduction) {
    console.log(err.stack);
  }

  const message = err.message;
  const status = err.status || 500;

  res.status(status);

  return res.json({
    status,
    message,
  });
});

export default app;
