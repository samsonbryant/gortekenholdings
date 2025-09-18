import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as path from 'path';

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables from the root directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const testConnection = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB!');
    
    // Test creating a collection
    const db = mongoose.connection.db;
    await db.createCollection('test_collection');
    console.log('Successfully created test collection!');
    
    // Clean up - drop the test collection
    await db.dropCollection('test_collection');
    console.log('Successfully cleaned up test collection!');
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  }
};

testConnection(); 