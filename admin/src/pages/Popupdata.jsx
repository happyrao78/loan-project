import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopupData = () => {
  const [popupData, setPopupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  
  // Date filtering states
  const [dateFilterType, setDateFilterType] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://loan-project-backend.onrender.com/api/popup/get');
        
        // Add parsed date object for each entry for easier filtering
        const dataWithParsedDates = response.data.map(item => ({
          ...item,
          createdAt: item.createdAt ? new Date(item.createdAt) : null,
          // If createdAt doesn't exist in your data, you may need to modify this
          // You might need to add this field in your backend or use another timestamp field
        }));
        
        setPopupData(dataWithParsedDates);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch popup data');
        setLoading(false);
        console.error('Error fetching popup data:', err);
      }
    };

    fetchData();
  }, []);

  // Get today's date at midnight for date comparisons
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get date for start of current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  
  // Get date for start of current month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Apply date filters
  const getFilteredByDate = () => {
    if (dateFilterType === 'all') return popupData;
    
    return popupData.filter(item => {
      // Skip items without date
      if (!item.createdAt) return false;
      
      const itemDate = new Date(item.createdAt);
      
      switch (dateFilterType) {
        case 'daily':
          return itemDate >= today;
        case 'weekly':
          return itemDate >= startOfWeek;
        case 'monthly':
          return itemDate >= startOfMonth;
        case 'custom':
          const start = customStartDate ? new Date(customStartDate) : null;
          const end = customEndDate ? new Date(customEndDate) : null;
          
          if (start && end) {
            // Set end date to end of day
            end.setHours(23, 59, 59, 999);
            return itemDate >= start && itemDate <= end;
          } else if (start) {
            return itemDate >= start;
          } else if (end) {
            end.setHours(23, 59, 59, 999);
            return itemDate <= end;
          }
          return true;
        default:
          return true;
      }
    });
  };

  // Apply text search filter on date-filtered data
  const filteredByDateData = getFilteredByDate();
  
  const filteredData = filteredByDateData.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.phone && item.phone.includes(searchTerm))
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
    if (a[sortConfig.key] === null || a[sortConfig.key] === undefined) return 1;
    if (b[sortConfig.key] === null || b[sortConfig.key] === undefined) return -1;
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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading data...</div>;
  
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Popup Data</h1>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search bar */}
        <div>
          <input
            type="text"
            placeholder="Search by name, email, phone or message..."
            className="w-full p-2 border rounded shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Date filter options */}
        <div className="flex flex-col md:flex-row gap-2">
          <select 
            value={dateFilterType} 
            onChange={(e) => {
              setDateFilterType(e.target.value);
              setShowDatePicker(e.target.value === 'custom');
            }}
            className="p-2 border rounded shadow-sm"
          >
            <option value="all">All Time</option>
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
          
          {showDatePicker && (
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center">
                <label className="mr-2 whitespace-nowrap">From:</label>
                <input 
                  type="date" 
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="p-2 border rounded shadow-sm"
                />
              </div>
              <div className="flex items-center">
                <label className="mr-2 whitespace-nowrap">To:</label>
                <input 
                  type="date" 
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="p-2 border rounded shadow-sm"
                />
              </div>
            </div>
          )}
        </div>
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
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort('createdAt')}
              >
                Date {getSortIndicator('createdAt')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.name || 'N/A'}</td>
                  <td className="px-4 py-3">{item.email || 'N/A'}</td>
                  <td className="px-4 py-3">{item.phone || 'N/A'}</td>
                  <td className="px-4 py-3">
                    {item.loanAmount ? `₹ ${item.loanAmount.toLocaleString()}` : 'N/A'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-h-32 overflow-y-auto">
                      {item.message || 'N/A'}
                    </div>
                  </td>
                  <td className="px-4 py-3">{formatDate(item.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No matching data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-blue-800">Total Submissions</h3>
          <p className="text-2xl font-bold">{filteredData.length}</p>
          <p className="text-xs text-gray-600">
            {dateFilterType !== 'all' ? `Filtered: ${dateFilterType}` : 'All time'}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-green-800">Loan Requests</h3>
          <p className="text-2xl font-bold">
            {filteredData.filter(item => item.loanAmount && item.loanAmount > 0).length}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-purple-800">Avg. Loan Amount</h3>
          <p className="text-2xl font-bold">
            {filteredData.length > 0 && filteredData.some(item => item.loanAmount) ? 
              `₹ ${Math.round(
                filteredData
                  .filter(item => item.loanAmount)
                  .reduce((sum, item) => sum + item.loanAmount, 0) / 
                filteredData.filter(item => item.loanAmount).length
              ).toLocaleString()}` : 
              'N/A'
            }
          </p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-amber-800">Total Loan Volume</h3>
          <p className="text-2xl font-bold">
            {filteredData.some(item => item.loanAmount) ? 
              `₹ ${filteredData
                .filter(item => item.loanAmount)
                .reduce((sum, item) => sum + item.loanAmount, 0)
                .toLocaleString()}` : 
              'N/A'
            }
          </p>
        </div>
      </div>

      {/* Export button */}
      <div className="mt-6 flex gap-4">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
          onClick={() => {
            // Include the date in export file name
            const dateStr = new Date().toISOString().split('T')[0];
            let fileName = `popup_data_${dateStr}`;
            
            // Add filter type to file name
            if (dateFilterType !== 'all') {
              fileName += `_${dateFilterType}`;
              if (dateFilterType === 'custom' && customStartDate && customEndDate) {
                fileName += `_${customStartDate}_to_${customEndDate}`;
              }
            }
            
            const csvContent = "data:text/csv;charset=utf-8," + 
              "Name,Email,Phone,Loan Amount,Message,Date\n" +
              filteredData.map(item => 
                `"${item.name || ''}","${item.email || ''}","${item.phone || ''}",${item.loanAmount || ''},"${(item.message || '').replace(/"/g, '""')}","${item.createdAt ? new Date(item.createdAt).toISOString() : ''}"`
              ).join("\n");
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `${fileName}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          Export to CSV
        </button>
        
        <button 
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded shadow"
          onClick={() => {
            setSearchTerm('');
            setDateFilterType('all');
            setCustomStartDate('');
            setCustomEndDate('');
            setShowDatePicker(false);
            setSortConfig({ key: 'name', direction: 'ascending' });
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default PopupData;