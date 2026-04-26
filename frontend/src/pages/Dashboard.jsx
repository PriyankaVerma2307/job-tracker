import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    selected: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await API.get("/jobs");
      const jobs = res.data;

      setStats({
        total: jobs.length,
        applied: jobs.filter(j => j.status === "Applied").length,
        interview: jobs.filter(j => j.status === "Interview").length,
        selected: jobs.filter(j => j.status === "Selected").length,
        rejected: jobs.filter(j => j.status === "Rejected").length,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3>Total</h3>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h3>Applied</h3>
          <p className="text-xl font-bold">{stats.applied}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h3>Interview</h3>
          <p className="text-xl font-bold">{stats.interview}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h3>Selected</h3>
          <p className="text-xl font-bold">{stats.selected}</p>
        </div>

        <div className="bg-red-100 p-4 rounded shadow text-center">
          <h3>Rejected</h3>
          <p className="text-xl font-bold">{stats.rejected}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;