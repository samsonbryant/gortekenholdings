import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      message
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to submit contact form'
    });
  }
});

// Get all contact submissions (protected route for admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact submissions'
    });
  }
});

// Update contact status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact status'
    });
  }
});

export default router; 