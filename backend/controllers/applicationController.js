import Application from "../models/applicationModel.js";
import cloudinary from "../config/cloudinary.js";

export const apply = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }
    console.log("Received resume:", req.body.resume);

    const {
      firstName, lastName, email, mobile, rollNumber, branch, year, appliedFor,
      street, city, state, zip, country, linkedIn, github, resume
    } = req.body;

    if (!firstName || !lastName || !email || !mobile || !rollNumber || !branch || !year || !appliedFor ||
        !linkedIn || !github || !street || !city || !state || !zip || !country || !resume) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const imageUpload = await cloudinary.uploader.upload(req.file.path, { folder: "images" });

    const application = new Application({
      firstName,
      lastName,
      email,
      mobile,
      rollNumber,
      branch,
      year,
      appliedFor, 
      street,
      city,
      state,
      zip,
      country,
      linkedIn,
      github,
      photo: imageUpload.secure_url,
      resume
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error("Error during application submission:", err);
    res.status(500).json({ error: "Failed to submit application. Please try again later." });
  }
};
