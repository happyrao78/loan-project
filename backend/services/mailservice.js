// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendEmail = async (to, subject, text) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//     };

//     await transporter.sendMail(mailOptions);
//     return { success: true, message: "Email sent successfully!" };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return { success: false, message: "Failed to send email." };
//   }
// };


import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Add this to handle larger attachments if needed
  maxFileSize: 50 * 1024 * 1024 // 50MB limit
  
}
);

export const sendEmail = async (to, subject, text, attachment = null) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      attachments: []
    };

    // Add attachment if provided
    if (attachment && attachment.content) {
      mailOptions.attachments = [{
        filename: attachment.filename || 'document.pdf',
        content: attachment.content,
        contentType: attachment.contentType || 'application/pdf'
      }];
      console.log("Attachment added:", mailOptions.attachments);
    }

    await transporter.sendMail(mailOptions);
    return { 
      success: true, 
      message: "Email sent successfully!" 
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { 
      success: false, 
      message: "Failed to send email.",
      error: error.message 
    };
  }
};

