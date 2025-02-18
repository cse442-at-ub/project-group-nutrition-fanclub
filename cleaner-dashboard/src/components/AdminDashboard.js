import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [clients, setClients] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [formData, setFormData] = useState({ username: "", email: "", role: "", company_name: "", phone_number: "", address: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Fetch Employers (Clients)
    axios
      .get("http://localhost:5000/api/employers")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employers:", error);
      });

    // Fetch Cleaners
    axios
      .get("http://localhost:5000/api/cleaners")
      .then((response) => {
        setCleaners(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cleaners:", error);
      });
  }, []);

  const handleButtonClick = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEdit = async () => {
    try {
      if (editMode) {
        // Editing existing entry
        if (formData.role === "employer") {
          await axios.put(`http://localhost:5000/api/employers/${editingId}`, formData);
          setClients((prev) => prev.map((client) => (client.user_id === editingId ? { ...formData, user_id: editingId } : client)));
        } else if (formData.role === "cleaner") {
          await axios.put(`http://localhost:5000/api/cleaners/${editingId}`, formData);
          setCleaners((prev) => prev.map((cleaner) => (cleaner.user_id === editingId ? { ...formData, user_id: editingId } : cleaner)));
        }
        alert("Successfully updated!");
      } else {
        // Adding new entry
        if (formData.role === "employer") {
          await axios.post("http://localhost:5000/api/employers", formData);
          setClients((prev) => [...prev, { ...formData, id: Math.random() }]);
        } else if (formData.role === "cleaner") {
          await axios.post("http://localhost:5000/api/cleaners", formData);
          setCleaners((prev) => [...prev, { ...formData, id: Math.random() }]);
        }
        alert("Successfully added!");
      }
      setIsFormVisible(false);
      setEditMode(false);
      setFormData({ username: "", email: "", role: "", company_name: "", phone_number: "", address: "" });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
  };

  const handleEdit = (id, role, existingData) => {
    setEditingId(id);
    setFormData({ ...existingData, role });
    setEditMode(true);
    setIsFormVisible(true);
  };

  const handleDelete = async (id, role) => {
    try {
      if (role === "employer") {
        await axios.delete(`http://localhost:5000/api/employers/${id}`);
        setClients((prev) => prev.filter((client) => client.user_id !== id));
      } else if (role === "cleaner") {
        await axios.delete(`http://localhost:5000/api/cleaners/${id}`);
        setCleaners((prev) => prev.filter((cleaner) => cleaner.user_id !== id));
      }
      alert("Successfully deleted!");
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => handleButtonClick("clients")}>
          Manage Clients
        </button>
        <button style={buttonStyle} onClick={() => handleButtonClick("cleaners")}>
          Manage Cleaners
        </button>
        <button style={actionButtonStyle} onClick={() => setIsFormVisible(!isFormVisible)}>
          {editMode ? "Edit Entry" : "Add New"}
        </button>
      </div>

      {isFormVisible && (
        <div style={formContainerStyle}>
          <h3>{editMode ? "Edit Entry" : "Add New"}</h3>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleFormChange}
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleFormChange}
              style={inputStyle}
            />
            <select name="role" value={formData.role} onChange={handleFormChange} style={inputStyle}>
              <option value="">Select Role</option>
              <option value="employer">Client</option>
              <option value="cleaner">Cleaner</option>
            </select>
            {formData.role === "employer" && (
              <>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Company Name"
                  value={formData.company_name}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </>
            )}
            <button type="button" style={formButtonStyle} onClick={handleAddOrEdit}>
              {editMode ? "Update" : "Add"}
            </button>
          </form>
        </div>
      )}

      {activeSection === "clients" && (
        <div>
          <h2>Clients</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Company Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.user_id}>
                  <td>{client.user_id}</td>
                  <td>{client.username}</td>
                  <td>{client.email}</td>
                  <td>{client.company_name}</td>
                  <td>{client.phone_number}</td>
                  <td>{client.address}</td>
                  <td>
                    <button
                      style={editButtonStyle}
                      onClick={() => handleEdit(client.user_id, "employer", client)}
                    >
                      Edit
                    </button>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(client.user_id, "employer")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSection === "cleaners" && (
        <div>
          <h2>Cleaners</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Total Jobs</th>
                <th>Earnings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cleaners.map((cleaner) => (
                <tr key={cleaner.user_id}>
                  <td>{cleaner.user_id}</td>
                  <td>{cleaner.username}</td>
                  <td>{cleaner.email}</td>
                  <td>{cleaner.rating}</td>
                  <td>{cleaner.total_jobs}</td>
                  <td>${cleaner.earnings}</td>
                  <td>
                    <button
                      style={editButtonStyle}
                      onClick={() => handleEdit(cleaner.user_id, "cleaner", cleaner)}
                    >
                      Edit
                    </button>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(cleaner.user_id, "cleaner")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Styles
const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "30px",
};

const buttonStyle = {
  padding: "15px 30px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  backgroundColor: "#007BFF",
  color: "white",
  cursor: "pointer",
};

const editButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#FFC107",
};

const actionButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#28A745",
};

const formContainerStyle = {
  margin: "20px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  width: "60%",
  backgroundColor: "#f9f9f9",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const formButtonStyle = {
  padding: "10px 20px",
  fontSize: "14px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#DC3545",
};

export default AdminDashboard;
