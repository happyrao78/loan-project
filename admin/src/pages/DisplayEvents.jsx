import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {backendUrl} from "../App";

const DisplayEvents = () => {
  // State to store all events and loading state
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/events/list`);
        console.log(response);
        const result = await response.json();
        console.log(result); // Log the result to see its structure

        if (response.ok) {
          if (result.success && Array.isArray(result.teams)) {
            setEvents(result.teams);
          } else {
            console.error('Fetched data is not in the expected format:', result);
          }
        } else {
          console.error('Error fetching events:', result.error);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Loading state
  if (loading) {
    return <div className="text-center py-10">Loading Events</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={event.image}
              alt={`${event.name}`}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
            <p className="text-sm text-gray-600 mb-2">Date {event.date}</p>
            <p className="text-sm text-gray-600 mb-2">Time: {event.time}</p>
            <p className="text-sm text-gray-600 mb-4">Location: {event.location}</p>
            {/* <Link
              to={`/event/${event._id}`}
              className="text-blue-500 hover:underline"
            >
              View Application
            </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayEvents;