import React, { useState } from "react";
import axios from "axios";

const BookingCleaner = () => {
  const [newBooking, setNewBooking] = useState({
    user_id: localStorage.getItem("user_id"),
    serviceType: "",
    numRooms: 0,
    squareFootage: "",
    date: "",
    time: "",
    address: "",
    specialInstructions: "",
  });

  const handlePostBooking = async (e) => {
    e.preventDefault();

    // Ask for confirmation before proceeding
    const isConfirmed = window.confirm(
      "Are you sure you want to post this booking? The only way to cancel is by submitting a ticket."
    );

    if (!isConfirmed) return;

    const bookingData = {
      user_id: newBooking.user_id,
      service_type: newBooking.serviceType,
      num_rooms: parseInt(newBooking.numRooms) || 0,
      square_footage: parseInt(newBooking.squareFootage) || 0,
      date: newBooking.date,
      time: newBooking.time,
      address: newBooking.address,
      special_instructions: newBooking.specialInstructions || "",
    };

    console.log("📤 Sending Booking Data:", bookingData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData
      );
      console.log("✅ Booking Response:", response.data);
      alert("Booking posted successfully!");
    } catch (error) {
      console.error(
        "❌ Error posting booking:",
        error.response ? error.response.data : error
      );
      alert("Failed to post booking.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book a Cleaner</h1>
      <form onSubmit={handlePostBooking} style={{ marginBottom: "20px" }}>
        <label>Service Type</label>
        <select
          value={newBooking.serviceType}
          onChange={(e) =>
            setNewBooking({ ...newBooking, serviceType: e.target.value })
          }
          style={inputStyle}
        >
          <option value="">Select Service</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Deep Cleaning">Deep Cleaning</option>
        </select>

        <label>Number of Rooms</label>
        <input
          type="number"
          value={newBooking.numRooms}
          onChange={(e) =>
            setNewBooking({ ...newBooking, numRooms: e.target.value })
          }
          style={inputStyle}
        />

        <label>Square Footage</label>
        <input
          type="text"
          value={newBooking.squareFootage}
          onChange={(e) =>
            setNewBooking({ ...newBooking, squareFootage: e.target.value })
          }
          style={inputStyle}
        />

        <label>Date</label>
        <input
          type="date"
          value={newBooking.date}
          onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
          style={inputStyle}
        />

        <label>Time</label>
        <input
          type="time"
          value={newBooking.time}
          onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
          style={inputStyle}
        />

        <label>Address</label>
        <input
          type="text"
          value={newBooking.address}
          onChange={(e) => setNewBooking({ ...newBooking, address: e.target.value })}
          style={inputStyle}
        />

        <label>Special Instructions</label>
        <textarea
          value={newBooking.specialInstructions}
          onChange={(e) =>
            setNewBooking({ ...newBooking, specialInstructions: e.target.value })
          }
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Submit Booking
        </button>
      </form>
    </div>
  );
};

// Styles
const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "5px 0",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#2E6F57",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default BookingCleaner;
