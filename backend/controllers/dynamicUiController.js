import Partner from '../models/partnersModel.js'; // Adjust the path as necessary
import Feedback from "../models/feedbackModel.js";
import cloudinary from "../config/cloudinary.js";


// Get all partners
const getPartners = async (req, res) => {
    try {
        const partners = await Partner.find();
        console.log(partners);
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving partners', error });
    }
};

// Add a new partner
const addPartner = async (req, res) => {
    try {
        const { name, imageUrl } = req.body;

        if (!name || !imageUrl) {
            return res.status(400).json({ message: 'Name and imageUrl are required' });
        }

        const newPartner = new Partner({ name, imageUrl });
        await newPartner.save();

        res.status(201).json({ message: 'Partner added successfully', partner: newPartner });
    } catch (error) {
        res.status(500).json({ message: 'Error adding partner', error });
    }
};

// Delete a partner by ID
const deletePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPartner = await Partner.findByIdAndDelete(id);

        if (!deletedPartner) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        res.status(200).json({ message: 'Partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting partner', error });
    }
};



// Get all feedbacks
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving feedbacks", error });
  }
};

// Add feedback with image upload
export const addFeedbacks = async (req, res) => {
    const { name, position, feedback } = req.body;
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image upload required" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "feedback_images",
        });

        const imageUrl = result.secure_url; // Cloudinary image URL

        const newFeedback = new Feedback({ name, position, feedback, image: imageUrl });
        await newFeedback.save();

        res.status(201).json({ message: "Feedback added successfully", feedback: newFeedback });
    } catch (error) {
        res.status(500).json({ message: "Error adding feedback", error });
    }
};

// Delete feedback
export const deleteFeedbacks = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Delete image from Cloudinary
    const publicId = feedback.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`feedback_images/${publicId}`);

    await Feedback.findByIdAndDelete(id);

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error });
  }
};


export { getPartners, addPartner, deletePartner };
