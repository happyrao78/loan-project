import { applyLoan,getApplicationsByPhone,listApplications,updateLoanApplication,updateStatus } from "../controllers/loanApplication.controller.js";
import express from "express";
import { sendEmail } from "../services/mailservice.js";

const loanApplicationRouter = express.Router();

loanApplicationRouter.post("/apply", applyLoan);
loanApplicationRouter.get("/list", listApplications);
loanApplicationRouter.post("/send-email", async (req, res) => {
    const { email, subject, message } = req.body;
    const result = await sendEmail(email, subject, message);
    res.json(result);
  }); 
loanApplicationRouter.put("/update/:id", updateLoanApplication);
loanApplicationRouter.put("/update-status/:id", updateStatus);
loanApplicationRouter.post("/track-loan", getApplicationsByPhone);

export default loanApplicationRouter;