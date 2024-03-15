const nodemailer = require('nodemailer');

// Function to generate a random 6-digit OTP


// Function to send OTP via email
const sendOTPByEmail = async (email) => {
  try {
    // Generate a random OTP
    function generateOTP() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
    const otp = generateOTP();

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vishnub4231@gmail.com',
        pass: 'jjee bqqg vnoe ohas',
      },
    });

    // Email content
    const mailOptions = {
      from: 'vishnub4231@gmail.com',
      to: email,
      subject: 'Your OTP for Registration',
      text: `Your OTP for Ed-Tech registration is: ${otp}. This OTP is valid for a short duration.`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    

    return otp; // Return the OTP for verification purposes
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    throw error;
  }
};
module.exports={sendOTPByEmail}