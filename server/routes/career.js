import express from 'express';
import Career from '../models/Career.js';

const router = express.Router();

// Submit job application
router.post('/apply', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      position,
      experience,
      education,
      resumeUrl,
      coverLetter
    } = req.body;

    const application = new Career({
      fullName,
      email,
      phone,
      position,
      experience,
      education,
      resumeUrl,
      coverLetter
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: 'Your application has been submitted successfully.'
    });
  } catch (error) {
    console.error('Job application error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to submit job application'
    });
  }
});

// Get all applications (protected route for admin)
router.get('/applications', async (req, res) => {
  try {
    const applications = await Career.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch job applications'
    });
  }
});

// Update application status
router.put('/application/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Career.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }

    res.json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update application status'
    });
  }
});

export default router; 