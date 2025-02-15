import { applyLoan,getApplicationsByPhone,listApplications,updateLoanApplication,updateStatus,updateFeeStatus,deleteLoanApplication, showPayments } from "../controllers/loanApplication.controller.js";
import express from "express";
import { sendEmail } from "../services/mailservice.js";

const loanApplicationRouter = express.Router();

loanApplicationRouter.post("/apply", applyLoan);
loanApplicationRouter.get("/list", listApplications);
// loanApplicationRouter.post("/send-email", async (req, res) => {
//     const { email, subject, message } = req.body;
//     const result = await sendEmail(email, subject, message);
//     res.json(result);
//   }); 


loanApplicationRouter.post("/send-email", async (req, res) => {
  try {
    const { email, subject, message, attachment } = req.body;
    
    // If attachment exists, extract the base64 content
    let attachmentBuffer;
    if (attachment) {
      // Remove the data URI prefix to get just the base64 string
      const base64Data = attachment.content.split(';base64,').pop();
      attachmentBuffer = Buffer.from(base64Data, 'base64');
    }

    const result = await sendEmail(email, subject, message, {
      filename: attachment?.filename,
      content: attachmentBuffer,
      contentType: attachment?.type
    });

    res.json(result);
  } catch (error) {
    console.error("Error in send-email route:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to process email request" 
    });
  }
});
loanApplicationRouter.put("/update/:id", updateLoanApplication);
loanApplicationRouter.put("/update-status/:id", updateStatus);
loanApplicationRouter.post("/track-loan", getApplicationsByPhone);
loanApplicationRouter.put("/update-fee-status/:id", updateFeeStatus);
loanApplicationRouter.put("/show-payments/:id", showPayments);
loanApplicationRouter.delete("/delete/:id", deleteLoanApplication);

export default loanApplicationRouter;