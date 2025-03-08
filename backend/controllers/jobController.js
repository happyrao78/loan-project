import teamModel from "../models/jobModel.js";

// Function to add a team
const addTeam = async (req, res) => {
    try {
        const { name, position } = req.body;
        
        if (!name || !position) {
            return res.status(400).json({ error: "All fields are required!" });
        }  

        // Check if the team already exists
        const existingTeam = await teamModel.findOne({ name });

        if (existingTeam) {
            // If the team exists, add the new position to the existing array
            // Make sure to not add duplicate positions
            if (!existingTeam.position.includes(position)) {
                existingTeam.position.push(position);
                await existingTeam.save();
                return res.json({ success: true, message: "Position added to the existing team." });
            } else {
                return res.status(400).json({ success: false, message: "Position already exists in this team." });
            }
        } else {
            // If the team doesn't exist, create a new team with the positions
            const teamData = {
                name,
                position: [position],
                date: Date.now(),
            };

            const team = new teamModel(teamData);
            await team.save();

            res.json({ success: true, message: "Team Added Successfully" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to list all teams
const listTeams = async (req, res) => {
    try {
        const teams = await teamModel.find({});
        res.json({ success: true, teams });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to remove a team
// Function to remove a position from a team
const removePosition = async (req, res) => {
    try {
        const { teamId, position } = req.body;

        // Validate that teamId and position are provided
        if (!teamId || !position) {
            return res.status(400).json({ error: "Team ID and Position are required!" });
        }

        // Find the team by its ID
        const team = await teamModel.findById(teamId);

        // If team not found
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        // Remove the position from the team
        const positionIndex = team.position.indexOf(position);
        if (positionIndex === -1) {
            return res.status(400).json({ error: "Position not found in the team" });
        }

        // Remove the position from the array
        team.position.splice(positionIndex, 1);
        await team.save();

        res.json({ success: true, message: "Position removed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Function to get a single team's details
const singleTeam = async (req, res) => {
    try {
        const { teamId } = req.body;
        const team = await teamModel.findById(teamId);
        res.json({ success: true, team });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addTeam, listTeams, removePosition, singleTeam };
