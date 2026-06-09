import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import Layout
from "../components/common/Layout";

import {
  BookOpen,
  Trophy,
  Clock,
  PlayCircle,
} from "lucide-react";

import Chatbot from "../components/student/Chatbot";


function StudentDashboard() {

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalMockTests: 0,
    progress: 0,
    totalCertificates: 0,
  });

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );


  // ================= FETCH STATS =================
  useEffect(() => {

    const fetchStats = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res =
          await axios.get(
            "/api/user/student-stats",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setStats(res.data);
        setLoading(false);

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchStats();

  }, []);


  // ================= UI =================
  return (

    <Layout>

      <div style={styles.page}>


        {/* ================= TOP BAR ================= */}
        <div style={styles.topBar}>


          <div>

            <h1 style={styles.welcome}>
              👋 Welcome Back,
              {" "}
              {user?.name || "Student"}
            </h1>

            <p style={styles.subtitle}>
              Continue your learning journey
            </p>

          </div>

        </div>


        {/* ================= HERO ================= */}
        <div style={styles.hero}>


          <div>

            <h2 style={styles.heroTitle}>
              🚀 Keep Learning Daily
            </h2>

            <p style={styles.heroText}>
              Complete courses,
              practice mock tests,
              and unlock certificates.
            </p>

          </div>


          <button
            style={styles.resumeBtn}
            onClick={() =>
              navigate("/my-courses")
            }
          >
            My Courses 📚
          </button>

        </div>


        {/* ================= LOADING ================= */}
        {loading ? (

          <h2 style={styles.loading}>
            Loading...
          </h2>

        ) : (

          <>


            {/* ================= STATS ================= */}
            <div style={styles.statsGrid}>


              {/* COURSES */}
              <div style={styles.card}>

                <BookOpen size={40} />

                <h3 style={styles.cardTitle}>
                  Courses
                </h3>

                <p style={styles.cardValue}>
                  {stats.totalCourses}
                </p>

              </div>


              {/* MOCK TESTS */}
              <div style={styles.card}>

                <PlayCircle size={40} />

                <h3 style={styles.cardTitle}>
                  Mock Tests
                </h3>

                <p style={styles.cardValue}>
                  {stats.totalMockTests}
                </p>

              </div>


              {/* PROGRESS */}
              <div style={styles.card}>

                <Clock size={40} />

                <h3 style={styles.cardTitle}>
                  Progress
                </h3>

                <p style={styles.cardValue}>
                  {stats.progress}%
                </p>

              </div>


              {/* CERTIFICATES */}
              <div style={styles.card}>

                <Trophy size={40} />

                <h3 style={styles.cardTitle}>
                  Certificates
                </h3>

                <p style={styles.cardValue}>
                  {stats.totalCertificates}
                </p>

              </div>

            </div>

          </>
        )}

      </div>

      <Chatbot />

    </Layout>
  );
}

export default StudentDashboard;


// ================= STYLES =================
const styles = {

  page: {
    padding: "30px",
    color: "white",
    background: "#020617",
    minHeight: "100vh",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  welcome: {
    fontSize: "42px",
    fontWeight: "800",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "10px",
    fontSize: "18px",
  },

  hero: {
    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",

    padding: "40px",

    borderRadius: "30px",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "35px",
  },

  heroTitle: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "12px",
  },

  heroText: {
    color: "#e2e8f0",
    fontSize: "18px",
  },

  resumeBtn: {
    background: "white",
    color: "#111827",
    border: "none",
    padding: "18px 28px",
    borderRadius: "14px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "16px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",

    gap: "25px",

    marginBottom: "40px",
  },

  card: {
    background: "#111827",
    padding: "30px",
    borderRadius: "22px",
    textAlign: "center",
  },

  cardTitle: {
    marginTop: "18px",
    fontSize: "22px",
  },

  cardValue: {
    marginTop: "12px",
    fontSize: "34px",
    fontWeight: "800",
  },

  loading: {
    textAlign: "center",
    marginTop: "40px",
    fontSize: "28px",
  },
};