import mongoose from 'mongoose';
import 'dotenv/config';

const { DATABASE_URL, DATABASE_URL_TEST, NODE_ENV } = process.env;
const URL: string = NODE_ENV === 'test' ? DATABASE_URL_TEST! : DATABASE_URL!;

const connectDb = () => {
  try {
    return mongoose.connect(URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default connectDb;
