// backend/utils/sendEmail.js
const nodemailer = require('nodemailer');

// Create email transporter with better error handling
let transporter;

try {
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false // Accept self-signed certificates
    }
  });

  // Verify transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Email configuration error:', error);
    } else {
      console.log('✅ Email service ready');
    }
  });
} catch (error) {
  console.error('❌ Failed to initialize email transporter:', error);
}

// Function to send password reset email
const sendPasswordResetEmail = async (email, resetCode, userName) => {
  try {
    // Frontend URL where users click the reset link
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetCode}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request - TheFollio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #af2912; padding: 20px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
            <h1 style="margin: 0;">Password Reset Request</h1>
          </div>
          <div style="background-color: #f5f5f5; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Hi ${userName},</p>
            <p>You requested a password reset. Click the link below to create a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #af2912; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #999;">
              This link will expire in 5 minutes. If you didn't request this, please ignore this email.
            </p>
            <p style="font-size: 12px; color: #999;">
              For security reasons, never share this link with anyone.
            </p>
          </div>
        </div>
      `
    };

    console.log(`📧 Attempting to send email to ${email}...`);
    
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${email}. Message ID: ${info.messageId}`);
    
    return { success: true, message: 'Password reset email sent successfully' };
  } catch (error) {
    console.error('❌ Email sending error:', error.message);
    return { 
      success: false, 
      message: 'Failed to send email: ' + error.message, 
      error: error.message 
    };
  }
};

module.exports = { sendPasswordResetEmail };
