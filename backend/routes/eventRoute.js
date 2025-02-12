import { createEvent, listEvents } from "../controllers/eventController.js";
import express from "express";
import upload from "../middleware/multer.js";

const eventrouter = express.Router();

eventrouter.post("/create", upload.single("image"), createEvent);
eventrouter.get("/list", listEvents);

export default eventrouter;