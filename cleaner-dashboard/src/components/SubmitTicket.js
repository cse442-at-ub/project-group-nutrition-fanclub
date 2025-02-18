import React, { useState } from 'react';

function SubmitTicket() {
  const [ticketDetails, setTicketDetails] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ticket Submitted:', ticketDetails);
    // Add your API call or backend integration here to save the ticket
    alert('Ticket Submitted Successfully!');
    setTicketDetails({ title: '', description: '' }); // Reset form after submission
  };

  return (
    <div className="container mt-5">
      <h2>Submit a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Ticket Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={ticketDetails.title}
            onChange={handleChange}
            placeholder="Enter the title of the ticket"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Ticket Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={ticketDetails.description}
            onChange={handleChange}
            placeholder="Describe the issue or request"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Ticket
        </button>
      </form>
    </div>
  );
}

export default SubmitTicket;
