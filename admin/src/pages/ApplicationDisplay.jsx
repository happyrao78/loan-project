import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import Papa from 'papaparse';
import {backendUrl} from '../App';
const ApplicationDisplay = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/applications`);
        const result = await response.json();
        if (response.ok) {
          setApplications(result);
        } else {
          console.error('Error fetching applications:', result.error);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();

    const socket = io(backendUrl);
    socket.on('newApplication', (newApplication) => {
      setApplications((prevApps) => [...prevApps, newApplication]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const downloadCSV = () => {
    const csvData = applications.map(({ firstName, lastName, email, mobile, city, state, country, linkedIn, github, appliedFor }) => ({
      Name: `${firstName} ${lastName}`,
      Email: email,
      Mobile: mobile,
      City: city,
      State: state,
      Country: country,
      LinkedIn: linkedIn,
      GitHub: github,
      AppliedFor: appliedFor,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'applications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const teams = [...new Set(applications.map(app => app.appliedFor.split('-')[0]))];
  const positions = selectedTeam ? [...new Set(applications.filter(app => app.appliedFor.split('-')[0] === selectedTeam).map(app => app.appliedFor))] : [];

  const filteredApplications = applications.filter(app => {
    return (!selectedTeam || app.appliedFor.split('-')[0] === selectedTeam) &&
           (!selectedPosition || app.appliedFor === selectedPosition);
  });

  if (loading) {
    return <div className="text-center py-10">Loading applications...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Applications</h1>
      <button onClick={downloadCSV} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Download All Applications</button>
      <div className="mb-4">
        <label className="block mb-2">Filter by Team:</label>
        <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} className="p-2 border rounded w-full">
          <option value="">All Teams</option>
          {teams.map(team => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
      </div>
      {selectedTeam && (
        <div className="mb-4">
          <label className="block mb-2">Filter by Position:</label>
          <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)} className="p-2 border rounded w-full">
            <option value="">All Positions</option>
            {positions.map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>
      )}
      <div className="overflow-x-auto">
        {filteredApplications.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Serial No.</th>
                <th className="py-2 px-4 border">Full Name</th>
                <th className="py-2 px-4 border">Applied For</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application, index) => (
                <tr key={application._id} className="text-center">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{application.firstName} {application.lastName}</td>
                  <td className="py-2 px-4 border">{application.appliedFor}</td>
                  <td className="py-2 px-4 border">
                    <Link
                      to={`/application/${application._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Application
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10">No positions open</div>
        )}
      </div>
    </div>
  );
};

export default ApplicationDisplay;
