import mongoose from "mongoose";

const applicationInfoSchema = new mongoose.Schema({
  fullName : { type: String, required: true },
  phoneNumber : { type: Number, required: true },
  email : { type: String, required: true },
  aadharNumber : { type: Number, required: true },
  panNumber : { type: String, required: true },
  accountNumber : { type: Number, required: true },
  ifscCode : { type: String, required: true },
  loanType : { type: String, required: true },
  duration : { type: Number, required: true },
  loanAmount : { type: Number, required: true },
  bankName : { type: String, required: true },
},{
  timestamps: true,
});

const Application = mongoose.model("Applications", applicationInfoSchema);
export default Application;
