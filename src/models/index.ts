import mongoose from 'mongoose';
import 'dotenv/config';

const { NODE_ENV, DATABASE_URL, DATABASE_URL_TEST, DATABASE_URL_PRODUCTION } = process.env;

interface DBInterface {
  test?: string;
  production?: string;
  development?: string;
}

const dbURLS: DBInterface = {
  test: DATABASE_URL_TEST,
  production: DATABASE_URL_PRODUCTION,
  development: DATABASE_URL,
};

const URL: string = dbURLS[NODE_ENV] as string;

const connect = async (): Promise<any> => {
  try {
    await mongoose.connect(URL as string, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export const dbConnection = mongoose;

export default {
  connect,
  disconnect: mongoose.disconnect,
};
