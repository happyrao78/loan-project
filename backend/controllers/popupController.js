import popupModel from "../models/popupModel.js";

const addPopupData = async (req, res) => {
    try {
        const { name, email, phone, message, loanAmount } = req.body;
    
        if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
        }
    
        const newPopup = new popupModel({ name, email, phone, message, loanAmount });
        await newPopup.save();
    
        res.status(201).json({ message: "Popup data added successfully", popup: newPopup });
    } catch (error) {
        res.status(500).json({ message: "Error adding popup data", error });
    }
    };

const getPopupData = async (req, res) => {
    try {
        const popupData = await popupModel.find();
        res.status(200).json(popupData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving popup data", error });
    }
};

export { addPopupData, getPopupData };