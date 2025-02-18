import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"; // Assuming you have some CSS styling

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    // Fetch Tickets
    axios
      .get("http://localhost:5000/api/tickets")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleClosePopup = () => {
    setSelectedTicket(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Tickets</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Job ID</th>
            <th>Issue</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.ticket_id}>
              <td>{ticket.ticket_id}</td>
              <td>{ticket.username}</td>
              <td>{ticket.role}</td>
              <td>{ticket.job_id}</td>
              <td>{ticket.issue}</td>
              <td>{ticket.status}</td>
              <td>
                <button
                  style={buttonStyle}
                  onClick={() => handleTicketClick(ticket)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTicket && (
        <div style={popupStyle}>
          <div style={popupContentStyle}>
            <h2>Ticket Details</h2>
            <p>
              <strong>ID:</strong> {selectedTicket.ticket_id}
            </p>
            <p>
              <strong>Username:</strong> {selectedTicket.username}
            </p>
            <p>
              <strong>Role:</strong> {selectedTicket.role}
            </p>
            <p>
              <strong>Email:</strong> {selectedTicket.email}
            </p>
            <p>
              <strong>Job ID:</strong> {selectedTicket.job_id}
            </p>
            <p>
              <strong>Issue:</strong> {selectedTicket.issue}
            </p>
            <p>
              <strong>Status:</strong> {selectedTicket.status}
            </p>
            <button style={buttonStyle} onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
};

const buttonStyle = {
  padding: "10px 15px",
  borderRadius: "5px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const popupStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "50%",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

export default Tickets;
