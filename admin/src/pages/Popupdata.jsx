import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopupData = () => {
  const [popupData, setPopupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://loan-project-backend.onrender.com/api/popup/get');
        setPopupData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch popup data');
        setLoading(false);
        console.error('Error fetching popup data:', err);
      }
    };

    fetchData();
  }, []);

  // Search functionality
  const filteredData = popupData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] === null) return 1;
    if (b[sortConfig.key] === null) return -1;
    if (a[sortConfig.key] === b[sortConfig.key]) return 0;
    
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading data...</div>;
  
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Popup Data</h1>
      
      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email or message..."
          className="w-full md:w-1/2 p-2 border rounded shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Data table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort('name')}
              >
                Name {getSortIndicator('name')}
              </th>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort('email')}
              >
                Email {getSortIndicator('email')}
              </th>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort('phone')}
              >
                Phone {getSortIndicator('phone')}
              </th>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort('loanAmount')}
              >
                Loan Amount {getSortIndicator('loanAmount')}
              </th>
              <th className="px-4 py-3 text-left">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3">{item.phone || 'N/A'}</td>
                  <td className="px-4 py-3">
                    {item.loanAmount ? `₹ ${item.loanAmount.toLocaleString()}` : 'N/A'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-h-32 overflow-y-auto">
                      {item.message || 'N/A'}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No matching data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-blue-800">Total Submissions</h3>
          <p className="text-2xl font-bold">{popupData.length}</p>
        </div>
        {/* <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-green-800">Loan Requests</h3>
          <p className="text-2xl font-bold">
            {popupData.filter(item => item.loanAmount && item.loanAmount > 0).length}
          </p>
        </div> */}
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-purple-800">Avg. Loan Amount</h3>
          <p className="text-2xl font-bold">
            {popupData.length > 0 && popupData.some(item => item.loanAmount) ? 
              `₹ ${Math.round(
                popupData
                  .filter(item => item.loanAmount)
                  .reduce((sum, item) => sum + item.loanAmount, 0) / 
                popupData.filter(item => item.loanAmount).length
              ).toLocaleString()}` : 
              'N/A'
            }
          </p>
        </div>
      </div>

      {/* Export button */}
      <div className="mt-6">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
          onClick={() => {
            const csvContent = "data:text/csv;charset=utf-8," + 
              "Name,Email,Phone,Loan Amount,Message\n" +
              popupData.map(item => 
                `${item.name},${item.email},${item.phone || ''},${item.loanAmount || ''},"${(item.message || '').replace(/"/g, '""')}"`
              ).join("\n");
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "popup_data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
};

export default PopupData;