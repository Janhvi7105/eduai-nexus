import AdminLayout from "../components/admin/AdminLayout";
import { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {

  // ================= DARK MODE STATE =================
  const [darkMode] = useState(true);

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

  return (
    <AdminLayout darkMode={darkMode}>
      <div
        style={{
          ...styles.page,
          backgroundColor: darkMode ? "#020617" : "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        {/* ================= PAGE HEADER ================= */}
        <div style={styles.header}>
          <h1 style={{
            ...styles.heading,
            color: darkMode ? "white" : "#111827",
          }}>
            📊 Admin Dashboard
          </h1>
          <p style={{
            ...styles.subtext,
            color: darkMode ? "#94a3b8" : "#6b7280",
          }}>
            Monitor and manage EduAI Nexus platform
          </p>
        </div>

        {/* ================= ANALYTICS CARDS ================= */}
        <div style={styles.cardsContainer}>
          {analytics.map((item) => (
            <div
              key={item.title}
              style={{
                ...styles.card,
                background: darkMode ? "#0f172a" : "white",
                border: darkMode ? "1px solid #1e293b" : "1px solid #e5e7eb",
                boxShadow: darkMode ? "0 10px 25px rgba(0,0,0,0.3)" : "0 10px 25px rgba(0,0,0,0.1)",
              }}
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
                <h2 style={{
                  ...styles.cardValue,
                  color: darkMode ? "white" : "#111827",
                }}>
                  {item.value}
                </h2>
                <p style={{
                  ...styles.cardTitle,
                  color: darkMode ? "#94a3b8" : "#6b7280",
                }}>
                  {item.title}
                </p>
              </div>
            </div>
          ))}
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
    padding: "30px",
    transition: "all 0.3s ease",
  },
  header: {
    marginBottom: "35px",
  },
  heading: {
    fontSize: "46px",
    fontWeight: "800",
    marginBottom: "10px",
    transition: "color 0.3s ease",
  },
  subtext: {
    fontSize: "18px",
    transition: "color 0.3s ease",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "24px",
    marginBottom: "35px",
  },
  card: {
    borderRadius: "24px",
    padding: "28px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    transition: "all 0.3s ease",
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
    transition: "color 0.3s ease",
  },
  cardTitle: {
    marginTop: "8px",
    fontSize: "16px",
    transition: "color 0.3s ease",
  },
};