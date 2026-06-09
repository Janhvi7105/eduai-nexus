import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";

function TeacherDashboard() {

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    revenue: 0,
  });


  // ================= LOAD USER =================
  useEffect(() => {

    try {

      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      setUser(storedUser);

    } catch (err) {

      console.error(
        "User load error:",
        err
      );
    }

  }, []);


  // ================= FETCH STUDENTS =================
  useEffect(() => {

    const fetchStudents = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await axios.get(
          "/api/user/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(prev => ({
          ...prev,
          students: res.data.students?.length || 0
        }));

      } catch (err) {

        console.error(
          "Student fetch error:",
          err
        );
      }
    };

    fetchStudents();

  }, []);


  // ================= FETCH COURSES =================
  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const res = await axios.get(
          "/api/courses"
        );

        setStats(prev => ({
          ...prev,
          courses: res.data.courses?.length || 0
        }));

      } catch (err) {

        console.error(
          "Course fetch error:",
          err
        );
      }
    };

    fetchCourses();

  }, []);


  // ================= FETCH REVENUE =================
  useEffect(() => {

    const fetchRevenue = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const revenueRes =
          await axios.get(
            "/api/revenue/teacher",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setStats((prev) => ({
          ...prev,
          revenue: revenueRes.data.revenue,
        }));

      } catch (err) {

        console.error(
          "Revenue fetch error:",
          err
        );
      }
    };

    fetchRevenue();

  }, []);


  return (
    <Layout>

      {/* ================= HEADER ================= */}
      <h1 style={styles.heading}>
        👨‍🏫 Teacher Dashboard
      </h1>


      {/* ================= PROFILE ================= */}
      {user && (

        <div style={styles.section}>

          <h2>
            🎯 Your Teaching Profile
          </h2>

          <p>
            <strong>
              Teaching Type:
            </strong>{" "}
            {user?.onboarding?.teaching}
          </p>

          <p>
            <strong>
              Experience:
            </strong>{" "}
            {user?.onboarding?.video}
          </p>

          <p>
            <strong>
              Audience:
            </strong>{" "}
            {user?.onboarding?.audience}
          </p>

        </div>
      )}


      {/* ================= STATS ================= */}
      <div style={styles.stats}>


        {/* COURSES */}
        <div style={styles.card}>

          <h3>📚 Courses</h3>

          <p style={styles.number}>
            {stats.courses}
          </p>

        </div>


        {/* STUDENTS */}
        <div style={styles.card}>

          <h3>👨‍🎓 Students</h3>

          <p style={styles.number}>
            {stats.students}
          </p>

        </div>


        {/* EARNINGS */}
        <div style={styles.card}>

          <h3>💰 Earnings</h3>

          <p style={styles.number}>
            ₹{stats.revenue}
          </p>

        </div>

      </div>

    </Layout>
  );
}

export default TeacherDashboard;



// ================= STYLES =================
const styles = {

  // ================= PAGE =================
  heading: {
    marginBottom: "20px",
    color: "var(--text-color)",
    fontSize: "48px",
    fontWeight: "bold",
  },


  // ================= STATS =================
  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  card: {
    flex: 1,
    minWidth: "250px",

    background: "var(--card-bg)",

    color: "var(--text-color)",

    padding: "30px",

    borderRadius: "18px",

    textAlign: "center",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.15)",

    transition: "0.3s",
  },

  number: {
    fontSize: "42px",
    fontWeight: "bold",
    marginTop: "15px",
    color: "#3b82f6",
  },


  // ================= PROFILE SECTION =================
  section: {

    background: "var(--card-bg)",

    color: "var(--text-color)",

    padding: "35px",

    borderRadius: "18px",

    marginBottom: "30px",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.15)",

    lineHeight: "2",
  },
};