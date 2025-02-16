import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Partners = () => {
    const [partners, setPartners] = useState([]);
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch partners from backend
    const fetchPartners = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}`+'/api/ui'); // Adjust API URL as needed
            setPartners(response.data);
        } catch (err) {
            console.error('Error fetching partners:', err);
        }
    };

    // Add a new partner
    const handleAddPartner = async (e) => {
        e.preventDefault();
        if (!name || !imageUrl) {
            setError('Name and Image URL are required');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}`+'/api/ui', { name, imageUrl });
            setPartners([...partners, response.data.partner]);
            setName('');
            setImageUrl('');
            setError('');
        } catch (err) {
            console.error('Error adding partner:', err);
            setError('Failed to add partner');
        }
        setLoading(false);
    };

    // Delete a partner
    const handleDeletePartner = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}`+`/api/ui/${id}`);
            setPartners(partners.filter((partner) => partner._id !== id));
        } catch (err) {
            console.error('Error deleting partner:', err);
            setError('Failed to delete partner');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    return (
        <div className="p-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Manage Partners</h2>

            {/* Add Partner Form */}
            <form onSubmit={handleAddPartner} className="mb-6 bg-white shadow-md p-4 rounded-lg">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="mb-3">
                    <label className="block text-gray-700">Partner Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter partner name"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter image URL"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {loading ? 'Adding...' : 'Add Partner'}
                </button>
            </form>

            {/* Partners List */}
            <div className="bg-white shadow-md p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Current Partners</h3>
                {partners.length === 0 ? (
                    <p>No partners added yet.</p>
                ) : (
                    <ul>
                        {partners.map((partner) => (
                            <li key={partner._id} className="flex justify-between items-center p-2 border-b">
                                <div className="flex items-center">
                                    <img src={partner.imageUrl} alt={partner.name} className="w-10 h-10 mr-2 rounded-full" />
                                    <span className="text-gray-800">{partner.name}</span>
                                </div>
                                <button
                                    onClick={() => handleDeletePartner(partner._id)}
                                    className="text-red-500 hover:text-red-700"
                                    disabled={loading}
                                >
                                    {loading ? 'Deleting...' : 'Delete'}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Partners;
