import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;