import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/jobs/list`, {
        headers: { token },
      });

      if (response.data && Array.isArray(response.data.teams)) {
        setTeams(response.data.teams);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching teams:", err);
      toast.error("Failed to load teams");
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Group teams by name
  const groupedTeams = teams.reduce((acc, team) => {
    if (!acc[team.name]) acc[team.name] = [];
    acc[team.name].push(team);
    return acc;
  }, {});

  const handleDeletePosition = async (teamId, position) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/jobs/remove`, {
        headers: { token },
        data: { teamId, position },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reload the team list to reflect the changes
        fetchTeams(); 
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Error removing position:", err);
      toast.error("Failed to remove position");
    }
  };

  // Remove teams that no longer have positions
  const filteredTeams = teams.filter(team => team.position.length > 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">All Teams</h2>

      {loading ? (
        <p className="text-blue-500 text-center">Loading teams...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : filteredTeams.length === 0 ? (
        <p className="text-gray-500 text-center">No teams available</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedTeams).map(([teamName, positions]) => {
            const team = positions[0]; // Each team should only have one entry, using the first one
            return (
              <div key={team._id} className="bg-white border rounded-lg shadow-md p-6">
                {/* Team Name */}
                <h3 className="text-xl font-bold text-orange-600 mb-4">{teamName}</h3>

                {/* Open Positions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.position.map((position, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 border rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <h4 className="text-lg font-semibold text-gray-700">{position}</h4>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Created:</strong> {new Date(team.createdAt).toLocaleDateString()}
                      </p>

                      {/* Delete Position Button */}
                      <button
                        onClick={() => handleDeletePosition(team._id, position)}
                        className="mt-4 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                      >
                        Delete Position
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default List;
