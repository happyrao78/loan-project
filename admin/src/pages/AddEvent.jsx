import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const AddEvent = ({ token }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: null,
    link: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, image: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, date, time, location, description, image } = formData;

    // Basic validation
    if (!name || !date || !time || !location || !description || !image) {
      toast.error("Please fill out all required fields and select an image!");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("date", date);
    form.append("time", time);
    form.append("location", location);
    form.append("description", description);
    form.append("image", image);
    form.append("link", formData.link); // Optional link field

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/events/create`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          token, // Assuming the token is passed as a prop
        },
      });

      if (response.data.success) {
        toast.success("Event created successfully!");
        setFormData({
          name: "",
          date: "",
          time: "",
          location: "",
          description: "",
          image: null,
          link: "",
        });
      } else {
        toast.error(response.data.message || "Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg ">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Event Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Event Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Event Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Event Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Event Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            accept="image/*"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Event Link (Optional)</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg"
          disabled={loading}
        >
          {loading ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
