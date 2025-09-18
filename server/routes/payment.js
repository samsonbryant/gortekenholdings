import express from 'express';
import { auth } from '../middleware/auth.js';
import Payment from '../models/Payment.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create a new payment
router.post('/create', auth, async (req, res) => {
  try {
    const { planId, amount, paymentMethod, mobileNumber } = req.body;

    const payment = new Payment({
      userId: req.user.userId,
      planId,
      amount,
      paymentMethod,
      mobileNumber,
      transactionId: uuidv4()
    });

    await payment.save();

    res.status(201).json({
      success: true,
      payment: {
        id: payment._id,
        transactionId: payment.transactionId,
        status: payment.status
      }
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create payment'
    });
  }
});

// Get user's payment history
router.get('/history', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments
    });
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment history'
    });
  }
});

// Update payment status (e.g., after mobile money confirmation)
router.put('/update/:transactionId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findOne({ 
      transactionId: req.params.transactionId,
      userId: req.user.userId
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }

    payment.status = status;
    if (status === 'completed') {
      payment.completedAt = new Date();
    }

    await payment.save();

    res.json({
      success: true,
      payment: {
        id: payment._id,
        status: payment.status,
        completedAt: payment.completedAt
      }
    });
  } catch (error) {
    console.error('Payment update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update payment status'
    });
  }
});

export default router; 