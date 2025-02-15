import bankModel from "../models/bank.model.js";
import cloudinary from "../config/cloudinary.js";

const addBank = async (req, res) => {
  try {
    const {
      Holdername,
      accountNumber,
      accountType,
      bankName,
      ifscCode,
      address,
      mobileNumber,
      email,
      processingFee,
      agreementFee,
      transferCharge,
      serviceCharge,
    } = req.body;

    const image = req.file; // The uploaded QR code file
    
    // Check if all fields are provided
    if (
      !Holdername ||
      !accountNumber ||
      !accountType ||
      !bankName ||
      !ifscCode ||
      !address ||
      !mobileNumber ||
      !email ||
      !processingFee ||
      !agreementFee ||
      !transferCharge ||
      !serviceCharge ||
      !image
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Upload QR code image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image.path, {
      folder: "banks/qr_codes", // Organize images in a specific folder for clarity
      public_id: `bank_qr_${Date.now()}`, // Use a unique identifier for each file (timestamp)
      resource_type: "image", // We are uploading an image (QR code)
    });

    // Create the bank data object
    const bankData = {
      Holdername,
      accountNumber,
      accountType,
      bankName,
      ifscCode,
      address,
      mobileNumber,
      email,
      processingFee,
      agreementFee,
      qr: uploadedImage.secure_url, // Store the Cloudinary URL of the QR image
      transferCharge,
      serviceCharge,
    };

    // Save the bank data to the database
    const newBank = new bankModel(bankData);
    await newBank.save();

    // Respond with a success message
    res.status(201).json({
      success: true,
      message: "Bank added successfully!",
      bank: newBank,
    });
  } catch (error) {
    console.error("Error during bank addition:", error);
    res.status(500).json({ error: "Failed to add bank. Please try again later." });
  }
};

const listBanks = async (req, res) => {
  try {
    // Fetch all the bank data from the database
    const banks = await bankModel.find({});
    res.json({ success: true, banks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit Bank Details
const editBank = async (req, res) => {
  try {
    const { bankId } = req.params; // The bank ID from the URL params
    const {
      Holdername,
      accountNumber,
      accountType,
      bankName,
      ifscCode,
      address,
      mobileNumber,
      email,
      processingFee,
      agreementFee,
      transferCharge,
      serviceCharge,
    } = req.body;

    const image = req.file; // New uploaded QR code image (if any)
    
    // Check if the bank exists
    const bank = await bankModel.findById(bankId);
    if (!bank) {
      return res.status(404).json({ error: "Bank not found." });
    }

    // If there's a new QR code uploaded, upload it to Cloudinary and update the `qr` field
    let qrImageUrl = bank.qr; // Keep the old QR image URL if no new QR code is uploaded
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image.path, {
        folder: "banks/qr_codes", 
        public_id: `bank_qr_${Date.now()}`, 
        resource_type: "image",
      });
      qrImageUrl = uploadedImage.secure_url; // New QR image URL
    }

    // Update the bank data with the new values
    const updatedBank = await bankModel.findByIdAndUpdate(
      bankId,
      {
        Holdername,
        accountNumber,
        accountType,
        bankName,
        ifscCode,
        address,
        mobileNumber,
        email,
        processingFee,
        agreementFee,
        qr: qrImageUrl, // Updated QR image URL
        transferCharge,
        serviceCharge,
      },
      { new: true } // Return the updated document
    );

    res.json({
      success: true,
      message: "Bank details updated successfully!",
      bank: updatedBank,
    });
  } catch (error) {
    console.error("Error during bank update:", error);
    res.status(500).json({ error: "Failed to update bank. Please try again later." });
  }
};

// Remove Bank
const removeBank = async (req, res) => {
  try {
    const { bankId } = req.params; // The bank ID from the URL params
    
    // Check if the bank exists
    const bank = await bankModel.findById(bankId);
    if (!bank) {
      return res.status(404).json({ error: "Bank not found." });
    }

    // Delete the bank from the database
    await bankModel.findByIdAndDelete(bankId);

    res.json({
      success: true,
      message: "Bank deleted successfully!",
    });
  } catch (error) {
    console.error("Error during bank deletion:", error);
    res.status(500).json({ error: "Failed to delete bank. Please try again later." });
  }
}
export { addBank, listBanks, editBank, removeBank };
