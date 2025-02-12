import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const JobsContext = createContext();

const JobsProvider = ({ children }) => {
 
  const baseURL = "http://localhost:5000/api/jobs/list";
  // const baseURL = "https://job-portal-server-seven-xi.vercel.app/home/get-jobs";

  const [hirings, setHirings] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(baseURL);
      // console.log(response)
      if (response.data && response.data.teams) {
        setHirings(response.data.teams);
        setDataFetched(true);
        // console.log("API Response:", response.data.teams); // ✅ API response prints first
        
      } else {
        console.error("Invalid API response:", response);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // useEffect(() => {
  //   if (dataFetched) {
  //     console.log("Data fetched:", dataFetched); // ✅ This will print true
  //     console.log("Hirings", hirings); // ✅ This will print the updated hirings
  //   }
  // }, [dataFetched]);

  return (
    <JobsContext.Provider value={{hirings, setHirings, baseURL }}>
      {children}
    </JobsContext.Provider>
  );
};

export { JobsContext, JobsProvider };