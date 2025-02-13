import { addBank,listBanks,editBank,removeBank } from "../controllers/bankcontroller.js";
import express from "express";
import upload from "../middleware/multer.js";

const bankRouter = express.Router();

bankRouter.post("/add", upload.single("qr"), addBank);
bankRouter.get("/list", listBanks);
bankRouter.put("/edit/:bankId", upload.single("qr"), editBank);
bankRouter.delete("/remove/:bankId", removeBank);

export default bankRouter;