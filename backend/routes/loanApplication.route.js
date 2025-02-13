import { applyLoan,listApplications } from "../controllers/loanApplication.controller.js";
import express from "express";

const loanApplicationRouter = express.Router();

loanApplicationRouter.post("/apply", applyLoan);
loanApplicationRouter.get("/list", listApplications);

export default loanApplicationRouter;