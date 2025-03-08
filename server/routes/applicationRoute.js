import express from "express";
import { apply } from "../controllers/applicationController.js";
import upload from "../middleware/multer.js";
import Application from "../models/applicationModel.js";
import ExcelJS from 'exceljs';
import XLSX from 'xlsx';

const router = express.Router();

// Only upload "photo", since "resume" is now a string
router.post("/apply", upload.single("photo"), apply);

router.get("/", async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch applications" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch application details" });
    }
});

router.get('/download-all', async (req, res) => {
    try {
        const applications = await Application.find();

        if (!applications || applications.length === 0) {
            return res.status(404).json({ error: "No applications found" });
        }
        
        const data = applications.map(app => ({
            'First Name': app.firstName,
            'Last Name': app.lastName,
            'Email': app.email,
            'Mobile': app.mobile,
            'Roll Number': app.rollNumber,
            'Branch': app.branch,
            'Year': app.year,
            'Applied For': app.appliedFor,
            'LinkedIn': app.linkedIn,
            'GitHub': app.github,
            'Resume': app.resume // Resume as string (URL or text)
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Applications");

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=applications.xlsx');

        XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

        res.end();
    } catch (error) {
        console.error("Error exporting applications:", error);
        res.status(500).json({ error: "Failed to export applications" });
    }
});

export default router;
