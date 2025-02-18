import React, { useState } from 'react';

function ScheduleJobs() {
  // Preloaded dummy data for scheduled jobs
  const [scheduledJobs, setScheduledJobs] = useState([
    { id: 1, title: 'Office Cleaning', date: '2025-01-10', time: '10:00 AM', location: 'Downtown Office' },
    { id: 2, title: 'Home Cleaning', date: '2025-01-12', time: '2:00 PM', location: 'Smith Residence' },
  ]);

  // Preloaded dummy data for available jobs
  const [availableJobs, setAvailableJobs] = useState([
    { id: 3, title: 'Retail Store Cleaning', date: '2025-01-15', time: '9:00 AM', location: 'Mall Plaza' },
    { id: 4, title: 'Restaurant Cleaning', date: '2025-01-18', time: '11:00 PM', location: 'City Center' },
  ]);

  // State for requesting a job
  const [requestInfo, setRequestInfo] = useState({
    name: '',
    contact: '',
    jobId: '',
  });

  // State for form inputs for adding scheduled jobs
  const [jobTitle, setJobTitle] = useState('');
  const [jobDate, setJobDate] = useState('');
  const [jobTime, setJobTime] = useState('');
  const [jobLocation, setJobLocation] = useState('');

  // Handle adding a new scheduled job
  const handleAddJob = (e) => {
    e.preventDefault();
    if (jobTitle && jobDate && jobTime && jobLocation) {
      const newJob = {
        id: scheduledJobs.length + availableJobs.length + 1,
        title: jobTitle,
        date: jobDate,
        time: jobTime,
        location: jobLocation,
      };
      setScheduledJobs([...scheduledJobs, newJob]);
      // Clear the form inputs
      setJobTitle('');
      setJobDate('');
      setJobTime('');
      setJobLocation('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  // Handle requesting a job
  const handleRequestJob = (e, jobId) => {
    e.preventDefault();
    if (requestInfo.name && requestInfo.contact) {
      alert(`Request submitted for Job ID ${jobId}`);
      // Clear the request info
      setRequestInfo({ name: '', contact: '', jobId: '' });
    } else {
      alert('Please provide your name and contact information.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Jobs Dashboard</h1>
      <p>Find available jobs to request or view your scheduled jobs.</p>

      {/* Available Jobs Section */}
      <h2>Available Jobs</h2>
      {availableJobs.length > 0 ? (
        <ul className="list-group mb-4">
          {availableJobs.map((job) => (
            <li key={job.id} className="list-group-item">
              <div>
                <strong>{job.title}</strong> - {job.date} at {job.time} ({job.location})
              </div>
              <form
                className="mt-3"
                onSubmit={(e) => {
                  setRequestInfo((prevInfo) => ({ ...prevInfo, jobId: job.id }));
                  handleRequestJob(e, job.id);
                }}
              >
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    value={requestInfo.name}
                    onChange={(e) =>
                      setRequestInfo((prevInfo) => ({ ...prevInfo, name: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Contact Info"
                    value={requestInfo.contact}
                    onChange={(e) =>
                      setRequestInfo((prevInfo) => ({ ...prevInfo, contact: e.target.value }))
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Request Job
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p>No available jobs at the moment.</p>
      )}

      {/* Scheduled Jobs Section */}
      <h2>Scheduled Jobs</h2>
      {scheduledJobs.length > 0 ? (
        <ul className="list-group">
          {scheduledJobs.map((job) => (
            <li key={job.id} className="list-group-item">
              <strong>{job.title}</strong> - {job.date} at {job.time} ({job.location})
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs scheduled yet.</p>
      )}

      {/* Form to Add Scheduled Jobs */}
      <h2 className="mt-5">Add a Scheduled Job</h2>
      <form className="mb-4" onSubmit={handleAddJob}>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">
            Job Title
          </label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter job title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jobDate" className="form-label">
            Job Date
          </label>
          <input
            type="date"
            className="form-control"
            id="jobDate"
            value={jobDate}
            onChange={(e) => setJobDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jobTime" className="form-label">
            Job Time
          </label>
          <input
            type="time"
            className="form-control"
            id="jobTime"
            value={jobTime}
            onChange={(e) => setJobTime(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jobLocation" className="form-label">
            Job Location
          </label>
          <input
            type="text"
            className="form-control"
            id="jobLocation"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            placeholder="Enter job location"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Job
        </button>
      </form>
    </div>
  );
}

export default ScheduleJobs;
