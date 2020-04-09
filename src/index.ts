import 'dotenv/config';
import app from './app';
import db from './models';

db.connect()
  .then(() => {
    console.log('connected to mongodb successfully');
  })
  .catch((err: any) => {
    console.log('failed to connect to mongodb', err);
  });

const { PORT = 5000 } = process.env;

app.listen(PORT, (): void => console.log(`Server listening on Port ${PORT}`));
