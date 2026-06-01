import AdminLayout from "../components/admin/AdminLayout";
import { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error("STATS ERROR:", err);
      }
    };
    fetchStats();
  }, []);

  // ================= ANALYTICS =================
  const analytics = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: "👨‍🎓",
      color: "#2563eb",
    },
    {
      title: "Total Teachers",
      value: stats.totalTeachers,
      icon: "👨‍🏫",
      color: "#7c3aed",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: "📚",
      color: "#10b981",
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: "💰",
      color: "#f59e0b",
    },
  ];

  // ================= RECENT ACTIVITY =================
  const activities = [
    "👨‍🎓 Rahul enrolled in React Course",
    "👨‍🏫 Teacher uploaded new lecture",
    "🏆 Janhvi completed DSA Course",
    "📚 New Python course created",
    "🔔 New instructor request received",
  ];

  return (
    <AdminLayout>
      <div style={styles.page}>
        {/* ================= PAGE HEADER ================= */}
        <div style={styles.header}>
          <h1 style={styles.heading}>
            📊 Admin Dashboard
          </h1>
          <p style={styles.subtext}>
            Monitor and manage EduAI Nexus platform
          </p>
        </div>

        {/* ================= ANALYTICS CARDS ================= */}
        <div style={styles.cardsContainer}>
          {analytics.map((item) => (
            <div
              key={item.title}
              style={styles.card}
            >
              <div
                style={{
                  ...styles.iconBox,
                  background: item.color,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h2 style={styles.cardValue}>
                  {item.value}
                </h2>
                <p style={styles.cardTitle}>
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= RECENT ACTIVITY ================= */}
        <div style={styles.activityCard}>
          <h2 style={styles.activityHeading}>
            🔥 Recent Activity
          </h2>
          <div style={styles.activityList}>
            {activities.map(
              (activity, index) => (
                <div
                  key={index}
                  style={styles.activityItem}
                >
                  {activity}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;

// ================= STYLES =================
const styles = {
  page: {
    color: "white",
  },
  header: {
    marginBottom: "35px",
  },
  heading: {
    fontSize: "46px",
    fontWeight: "800",
    marginBottom: "10px",
  },
  subtext: {
    color: "#94a3b8",
    fontSize: "18px",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "24px",
    marginBottom: "35px",
  },
  card: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "24px",
    padding: "28px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },
  iconBox: {
    width: "70px",
    height: "70px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "34px",
  },
  cardValue: {
    fontSize: "34px",
    fontWeight: "800",
    margin: 0,
  },
  cardTitle: {
    color: "#94a3b8",
    marginTop: "8px",
    fontSize: "16px",
  },
  activityCard: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },
  activityHeading: {
    fontSize: "30px",
    marginBottom: "25px",
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  activityItem: {
    background: "#1e293b",
    padding: "18px",
    borderRadius: "14px",
    fontSize: "17px",
    color: "#e2e8f0",
  },
};