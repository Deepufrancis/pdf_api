import mongoose from 'mongoose';
import { getEnvVariable } from '../utils/helpers';


const MONGODB_URI = getEnvVariable('MONGODB_URI')

export const connectDB = async () => {
  try {
    console.log("Connecting DB...")
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected');

  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
