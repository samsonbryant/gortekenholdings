import express from 'express';
import Contact from '../models/Contact.js';
import JobApplication from '../models/JobApplication.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Contact form submission
router.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to submit contact form'
    });
  }
});

// Job application submission
router.post('/career/apply', async (req, res) => {
  try {
    const application = new JobApplication(req.body);
    await application.save();
    
    res.status(201).json({
      success: true,
      message: 'Your application has been submitted successfully!'
    });
  } catch (error) {
    console.error('Job application error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to submit job application'
    });
  }
});

// Get all contact submissions (protected route)
router.get('/contacts', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact submissions'
    });
  }
});

// Get all job applications (protected route)
router.get('/applications', auth, async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch job applications'
    });
  }
});

// Update contact status (protected route)
router.patch('/contact/:id/status', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact status'
    });
  }
});

// Update application status (protected route)
router.patch('/application/:id/status', auth, async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update application status'
    });
  }
});

export default router; 