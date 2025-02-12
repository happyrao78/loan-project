import mongoose from "mongoose";

const applicationInfoSchema = new mongoose.Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  email: { required: true, type: String },
  mobile: { required: true, type: String },
  street: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  zip: { type: String, default: "" },
  country: { type: String, default: "" },
  linkedIn: { type: String, required: true },
  github: { type: String, required: true },
  photo: { type: String, required: true },
  resume: { type: String, required: true },
  rollNumber: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  appliedFor: { type: String, required: true },
});

const Application = mongoose.model("Applications", applicationInfoSchema);
export default Application;
