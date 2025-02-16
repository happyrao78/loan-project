import Partner from '../models/partnersModel.js'; // Adjust the path as necessary

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

export { getPartners, addPartner, deletePartner };
