import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployerDashboard = () => {
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const [overview, setOverview] = useState({
    total_bookings: 0,
    completed_bookings: 0,
    pending_bookings: 0,
  });

  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedBookings, setExpandedBookings] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    axios
      .get("http://localhost:5000/api/profile", { params: { user_id: userId } })
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching profile:", error));

    axios
      .get("http://localhost:5000/api/bookings", { params: { user_id: userId } })
      .then((response) => setOverview(response.data))
      .catch((error) => console.error("Error fetching overview:", error));
  }, []);

  const fetchBookingsByStatus = async (status) => {
    try {
      if (expandedSection === status) {
        setExpandedSection(null);
        setExpandedBookings([]);
        return;
      }

      const userId = localStorage.getItem("user_id");
      const response = await axios.get("http://localhost:5000/api/bookings/list", {
        params: { user_id: userId, status },
      });
      setExpandedBookings(response.data);
      setExpandedSection(status);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setExpandedBookings([]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employer Dashboard</h1>

      <div style={profileStyle}>
        <h2>Profile</h2>
        <p><strong>Name:</strong> {profile.name || "N/A"}</p>
        <p><strong>Address:</strong> {profile.address || "N/A"}</p>
        <p><strong>Contact:</strong> {profile.contact || "N/A"}</p>
      </div>

      <h2>Overview</h2>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={cardStyle} onClick={() => fetchBookingsByStatus("all")}>
          <h3>Total Jobs Posted</h3>
          <p>{overview.total_bookings}</p>
        </div>
        <div style={cardStyle} onClick={() => fetchBookingsByStatus("completed")}>
          <h3>Jobs Completed</h3>
          <p>{overview.completed_bookings}</p>
        </div>
        <div style={cardStyle} onClick={() => fetchBookingsByStatus("pending")}>
          <h3>Jobs in Progress</h3>
          <p>{overview.pending_bookings}</p>
        </div>
      </div>

      {expandedSection && (
        <div style={expandedContainerStyle}>
          <h3>{
            expandedSection === "all"
              ? "All Bookings"
              : expandedSection === "pending"
              ? "Pending Bookings"
              : "Completed Bookings"
          }</h3>
          {expandedBookings.length > 0 ? (
            <ul>
              {expandedBookings.map((booking) => (
                <li key={booking.id} style={listItemStyle}>
                  <p><strong>{booking.service_type}</strong></p>
                  <p>Status: {booking.status}</p>
                  <p>Date: {booking.date}</p>
                  <p>Address: {booking.address}</p>
                  <p>Special Instructions: {booking.special_instructions}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
};

const profileStyle = {
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  marginBottom: "20px",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center",
  flex: 1,
  cursor: "pointer",
};

const expandedContainerStyle = {
  marginTop: "20px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const listItemStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  marginBottom: "10px",
};

export default EmployerDashboard;
