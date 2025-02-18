import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [overview, setOverview] = useState({
    totalEarnings: 0,
    jobsCompleted: 0,
    jobsScheduled: 0,
  });

  const [scheduledJobs, setScheduledJobs] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [earnings, setEarnings] = useState({ weekly: 0, monthly: 0 });

  // Mock Data (Replace with API calls)
  useEffect(() => {
    // Fetch Overview Data
    setOverview({
      totalEarnings: 3200,
      jobsCompleted: 150,
      jobsScheduled: 5,
    });

    // Fetch Scheduled Jobs
    setScheduledJobs([
      { id: 1, name: "Office Cleaning", date: "2025-01-10", time: "10:00 AM" },
      { id: 2, name: "Apartment Cleaning", date: "2025-01-11", time: "2:00 PM" },
    ]);

    // Fetch Available Jobs
    setAvailableJobs([
      { id: 1, name: "Warehouse Cleaning", location: "Downtown", pay: "$150" },
      { id: 2, name: "School Cleaning", location: "Suburb", pay: "$200" },
    ]);

    // Fetch Earnings
    setEarnings({ weekly: 800, monthly: 3200 });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Overview Section */}
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={cardStyle}>
          <h3>Total Earnings</h3>
          <p>${overview.totalEarnings}</p>
        </div>
        <div style={cardStyle}>
          <h3>Jobs Completed</h3>
          <p>{overview.jobsCompleted}</p>
        </div>
        <div style={cardStyle}>
          <h3>Jobs Scheduled</h3>
          <p>{overview.jobsScheduled}</p>
        </div>
      </div>

      {/* Scheduled Jobs Section */}
      <h2>Scheduled Jobs</h2>
      {scheduledJobs.length > 0 ? (
        <ul style={listStyle}>
          {scheduledJobs.map((job) => (
            <li key={job.id} style={listItemStyle}>
              <p><strong>{job.name}</strong></p>
              <p>{job.date} at {job.time}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs scheduled</p>
      )}

      {/* Available Jobs Section */}
      <h2>Available Jobs</h2>
      {availableJobs.length > 0 ? (
        <ul style={listStyle}>
          {availableJobs.map((job) => (
            <li key={job.id} style={listItemStyle}>
              <p><strong>{job.name}</strong> - {job.location}</p>
              <p>Pay: {job.pay}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No available jobs</p>
      )}

      {/* Earnings Summary Section */}
      <h2>Earnings Summary</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={cardStyle}>
          <h3>Weekly Earnings</h3>
          <p>${earnings.weekly}</p>
        </div>
        <div style={cardStyle}>
          <h3>Monthly Earnings</h3>
          <p>${earnings.monthly}</p>
        </div>
      </div>
    </div>
  );
};

// Styles for simplicity
const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center",
  flex: 1,
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
};

const listItemStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  marginBottom: "10px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
};

export default Dashboard;
