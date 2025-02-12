import cloudinary from "../config/cloudinary.js";  // Assuming you've set up cloudinary correctly
import eventModel from "../models/eventModel.js";
// import { v2 as cloudinaryV2 } from "cloudinary";

// Create Event Controller
const createEvent = async (req, res) => {
  try {
    const { name, date, time, location, description, link } = req.body;
    const image = req.file; // The uploaded file
    
    // Check if all necessary fields are present
    if (!name || !date || !time || !location || !description || !image) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image.path, {
      folder: "events", // You can organize images in a specific folder in Cloudinary
      public_id: `event_${Date.now()}`,
      resource_type: "image", // Since we're uploading an image
    });

    // Create event data
    const eventData = {
      name,
      date,
      time,
      location,
      description,
      image: uploadedImage.secure_url,  // Get the URL of the uploaded image
      link,
    };

    // Save event data in the database
    const newEvent = new eventModel(eventData);
    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const listEvents = async (req, res) => {
  try {
      const teams = await eventModel.find({});
      res.json({ success: true, teams });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};

export { createEvent, listEvents };
