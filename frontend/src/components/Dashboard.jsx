import React, { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    window.location.href = 'https://loan-project-admin.vercel.app';
  }, []);

  return (
    <div>Redirecting to Dashboard...</div>
  );
};

export default Dashboard;