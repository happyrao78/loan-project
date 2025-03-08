import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
   {
    name: { type: String, required: true }, // Event name
    date: { type: Date, required: true }, // Event date
    time: { type: String, required: true }, // Event time
    location: { type: String, required: true }, // Event location
    description: { type: String, required: true }, // Event description
    image: { type: String, required: true }, // Event image
    link: { type: String}, // Event link
   }, {
    timestamps: true,
});

const eventModel = mongoose.models.event || mongoose.model("event", eventSchema);

export default eventModel;
