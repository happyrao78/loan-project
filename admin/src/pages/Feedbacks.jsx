import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    feedback: "",
    image: null,
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Fetch feedbacks from the backend
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}`+'/api/ui/feedback');
      setFeedbacks(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      toast.error("Failed to load feedbacks.");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.position || !formData.feedback || !formData.image) {
      toast.warn("All fields are required.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("position", formData.position);
    data.append("feedback", formData.feedback);
    data.append("image", formData.image);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}`+'/api/ui/feedback', data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Feedback added successfully!");
      fetchFeedbacks();
      setFormData({ name: "", position: "", feedback: "", image: null });
    } catch (error) {
      console.error("Error adding feedback:", error);
      toast.error("Failed to add feedback.");
    }
  };

  // Handle delete feedback
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}`+`/api/ui/feedback/${id}`);
      toast.success("Feedback deleted!");
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error("Failed to delete feedback.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Feedbacks</h2>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <textarea
          name="feedback"
          placeholder="Enter feedback"
          value={formData.feedback}
          onChange={handleChange}
          className="p-2 border rounded-md w-full mt-4"
        ></textarea>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="p-2 border rounded-md w-full mt-4"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Feedback
        </button>
      </form>

      {/* Feedback List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">User Feedbacks</h3>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500 text-center">No feedback available.</p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-3"
            >
              <div className="flex items-center gap-4">
                <img src={fb.image} alt={fb.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold">{fb.name}</h4>
                  <p className="text-sm text-gray-600">{fb.position}</p>
                  <p className="text-sm">{fb.feedback.substring(0, 80)}...</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(fb._id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
