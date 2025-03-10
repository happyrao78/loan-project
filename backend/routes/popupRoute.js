import { addPopupData,getPopupData } from "../controllers/popupController.js";
import express from "express";

const popupRouter = express.Router();

popupRouter.post("/add", addPopupData);
popupRouter.get("/get", getPopupData);

export default popupRouter;