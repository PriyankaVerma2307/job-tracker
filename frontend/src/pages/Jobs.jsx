import { useState, useEffect } from "react";
import API from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    companyName: "",
    role: "",
    location: "",
    status: "Applied",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE JOB
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/jobs/${editId}`, form);
        alert("Job updated");
        setEditId(null);
      } else {
        await API.post("/jobs", form);
        alert("Job added");
      }

      setForm({
        companyName: "",
        role: "",
        location: "",
        status: "Applied",
      });

      fetchJobs();
    } catch (err) {
       console.error(err);  
       alert("Error");
    }
  };

  // DELETE JOB
  const deleteJob = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);
      fetchJobs();
    } 
    catch (err) {
       console.error(err);  
       alert("Error");
    }
  };

  // EDIT BUTTON CLICK
  const handleEdit = (job) => {
    setEditId(job._id);
    setForm({
      companyName: job.companyName,
      role: job.role,
      location: job.location,
      status: job.status,
    });
  };

  // FETCH JOBS
  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
       console.error(err);  
       alert("Error");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h2 className="text-2xl font-bold mb-4">Jobs</h2>

   
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <div className="grid md:grid-cols-4 gap-3">
        <input
          name="companyName"
          placeholder="Company"
          value={form.companyName}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Selected</option>
        </select>
      </div>

      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        {editId ? "Update Job" : "Add Job"}
      </button>
    </form>

    
    <div className="grid md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <div key={job._id} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">{job.companyName}</h3>
          <p>{job.role}</p>

          <span className="text-sm text-gray-500">{job.status}</span>

          <div className="mt-3">
            <button
              onClick={() => handleEdit(job)}
              className="bg-yellow-400 px-3 py-1 mr-2 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => deleteJob(job._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Jobs;