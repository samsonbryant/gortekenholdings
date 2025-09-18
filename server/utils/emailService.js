import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  // For Gmail, you need to use OAuth2 or an App Password
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD // Use App Password here
    },
    tls: {
      rejectUnauthorized: false // Only for development
    }
  });

  // Verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.error('SMTP connection error:', error);
    } else {
      console.log('SMTP server is ready to take our messages');
    }
  });

  return transporter;
};

export const sendVerificationEmail = async (email, verificationToken) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.error('Email configuration is missing. Please check your .env file');
    throw new Error('Email configuration is missing');
  }

  if (!process.env.FRONTEND_URL) {
    console.error('FRONTEND_URL is missing in environment variables');
    throw new Error('Frontend URL configuration is missing');
  }

  // Ensure the URL is properly formatted
  const baseUrl = process.env.FRONTEND_URL.replace(/\/$/, ''); // Remove trailing slash if present
  const verificationUrl = `${baseUrl}/verify-email/${verificationToken}`;

  console.log('Constructed verification URL:', verificationUrl); // For debugging

  const transporter = createTransporter();

  const mailOptions = {
    from: `"Gorteken Holdings" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - Gorteken Holdings',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50; text-align: center;">Welcome to Gorteken Holdings!</h2>
        <p style="color: #34495e; font-size: 16px; line-height: 1.5;">
          Thank you for signing up. Please verify your email address by clicking the button below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #3498db; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify Email
          </a>
        </div>
        <p style="color: #7f8c8d; font-size: 14px;">
          If the button doesn't work, you can copy and paste this link into your browser:
          <br>
          <a href="${verificationUrl}" style="color: #3498db;">${verificationUrl}</a>
        </p>
        <p style="color: #7f8c8d; font-size: 14px; margin-top: 30px;">
          This link will expire in 24 hours. If you didn't create an account with us, 
          please ignore this email.
        </p>
      </div>
    `
  };

  try {
    console.log('Attempting to send verification email to:', email);
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.error('Email configuration is missing. Please check your .env file');
    throw new Error('Email configuration is missing');
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: `"Gorteken Holdings" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to Gorteken Holdings!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50; text-align: center;">Thank You for Verifying Your Email!</h2>
        <p style="color: #34495e; font-size: 16px; line-height: 1.5;">
          Your email has been successfully verified. You now have full access to all features of your Gorteken Holdings account.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/dashboard" 
             style="background-color: #3498db; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; font-weight: bold;">
            Go to Dashboard
          </a>
        </div>
        <p style="color: #7f8c8d; font-size: 14px; margin-top: 30px;">
          If you have any questions or need assistance, please don't hesitate to contact our support team.
        </p>
      </div>
    `
  };

  try {
    console.log('Attempting to send welcome email to:', email);
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }
}; 