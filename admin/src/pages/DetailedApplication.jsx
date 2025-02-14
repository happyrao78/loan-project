import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {backendUrl} from "../App";

const ApplicationDetail = () => {
  const { id } = useParams();  // Get the application ID from URL params
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/applications/${id}`);
        const result = await response.json();

        if (response.ok) {
          setApplication(result);
        } else {
          console.error('Error fetching application:', result.error);
        }
      } catch (error) {
        console.error('Error fetching application:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  // Loading state
  if (loading) {
    return <div className="text-center py-10">Loading application details...</div>;
  }

  if (!application) {
    return <div className="text-center py-10">Application not found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Application Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img
          src={application.photo}
          alt={`${application.firstName} ${application.lastName}`}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
        <h2 className="text-2xl font-semibold mb-4">{application.firstName} {application.lastName}</h2>
        <p className="text-sm text-gray-600 mb-4">Email: {application.email}</p>
        <p className="text-sm text-gray-600 mb-4">Mobile: {application.mobile}</p>
        <p className="text-sm text-gray-600 mb-4">Roll Number: {application.rollNumber}</p>
        <p className="text-sm text-gray-600 mb-4">Branch: {application.branch}</p>
        <p className="text-sm text-gray-600 mb-4">Year: {application.year}</p>
        <p className="text-sm text-gray-600 mb-4">Applied for: {application.appliedFor}</p>
        <p className="text-sm text-gray-600 mb-4">LinkedIn: <a href={application.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View LinkedIn</a></p>
        <p className="text-sm text-gray-600 mb-4">GitHub: <a href={application.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View GitHub</a></p>
        
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Resume:</h3>
          <a href={application.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
