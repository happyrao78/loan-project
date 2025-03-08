import express from "express";
import { addTeam, removePosition, listTeams, singleTeam } from "../controllers/jobController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const teamRouter = express.Router();

// Route to add a team
teamRouter.post("/add", addTeam);

// Route to remove a team
teamRouter.delete("/remove", removePosition);

// Route to get details of a single team
teamRouter.post("/single", adminAuth, singleTeam);

// Route to list all teams
teamRouter.get("/list", listTeams);

export default teamRouter;
