import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    Holdername :{ type : String, required : true},
    accountNumber : { type : Number, required : true},
    accountType : { type : String, required : true},
    bankName : { type : String, required : true},
    ifscCode : { type : String, required : true},
    address : { type : String, required : true},
    mobileNumber : { type : Number, required : true},
    email : { type : String, required : true},
    processingFee : { type : Number, required : true},
    agreementFee : { type : String, required : true},
    qr : { type : String, required : true},
},
{ timestamps : true }
);

const bankModel = mongoose.models.bank || mongoose.model("bank", bankSchema);

export default bankModel;