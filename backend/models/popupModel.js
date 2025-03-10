import mongoose from "mongoose";

const popupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone:{type : Number, required:false},
    message:{type: String, required:false},
    loanAmount:{type: Number, required:false},
}, { minimize: false })

const popupModel = mongoose.model.popup || mongoose.model("popup",popupSchema)


export default popupModel;