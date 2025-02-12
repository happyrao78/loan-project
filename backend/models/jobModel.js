import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    [{
    name: { type: String, required: true }, // Team name (Events, Outreach, etc.)
    position: [
        { type: String, required: true, enum: ["Executive", "Head", "Lead"] }
    ], // Team position
    // description: { type: String }, // Team description
    // rolesAndResponsibilities: { type: String }, // Roles and responsibilities
    // benefits: { type: String }, // Benefits of joining
    // date: { type: Date, default: Date.now }, // Timestamp for record-keeping
}
    ],{
    timestamps: true,
});

const teamModel = mongoose.models.team || mongoose.model("team", teamSchema);

export default teamModel;
