import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRoutes from './routes/auth.js';
import formRoutes from './routes/forms.js';
import contactRoutes from './routes/contact.js';
import careerRoutes from './routes/career.js';
import connectDB from './config/database.js';
import paymentRoutes from './routes/payment.js';

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config();

// Debug: Log environment info (don't log sensitive data in production)
console.log('Starting server...');
console.log('Node ENV:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT || 5000);
console.log('MongoDB URI provided:', !!process.env.MONGODB_URI);
console.log('JWT Secret provided:', !!process.env.JWT_SECRET);

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

// In production, also allow any Render frontend URLs
if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push(/^https:\/\/.*\.onrender\.com$/);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check exact matches
    if (allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    })) {
      return callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Gorteken API is running', 
    timestamp: new Date().toISOString() 
  });
});

// Routes - with error handling
try {
  app.use('/api/auth', authRoutes);
  console.log('✓ Auth routes loaded');
} catch (error) {
  console.error('✗ Failed to load auth routes:', error.message);
}

try {
  app.use('/api/forms', formRoutes);
  console.log('✓ Forms routes loaded');
} catch (error) {
  console.error('✗ Failed to load forms routes:', error.message);
}

try {
  app.use('/api/contact', contactRoutes);
  console.log('✓ Contact routes loaded');
} catch (error) {
  console.error('✗ Failed to load contact routes:', error.message);
}

try {
  app.use('/api/career', careerRoutes);
  console.log('✓ Career routes loaded');
} catch (error) {
  console.error('✗ Failed to load career routes:', error.message);
}

try {
  app.use('/api/payments', paymentRoutes);
  console.log('✓ Payment routes loaded');
} catch (error) {
  console.error('✗ Failed to load payment routes:', error.message);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start server first, then connect to MongoDB
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check available at: http://localhost:${PORT}/`);
});

// Connect to MongoDB (non-blocking)
connectDB().catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  console.log('⚠️  Server will continue running without database connection');
});

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected. Attempting to reconnect...');
  setTimeout(() => {
    connectDB().catch(console.error);
  }, 5000);
});

// Handle application termination
process.on('SIGINT', async () => {
  console.log('🛑 Received SIGINT. Graceful shutdown...');
  
  server.close(() => {
    console.log('HTTP server closed.');
  });
  
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  console.log('🛑 Received SIGTERM. Graceful shutdown...');
  
  server.close(() => {
    console.log('HTTP server closed.');
  });
  
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
}); 