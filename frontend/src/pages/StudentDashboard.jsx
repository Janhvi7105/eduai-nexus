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
  GraduationCap,
  Bell,
} from "lucide-react";

import Chatbot from "../components/student/Chatbot";


function StudentDashboard() {

  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );


  // ================= FETCH COURSES =================
  useEffect(() => {

    const fetchCourses =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const user =
            JSON.parse(
              localStorage.getItem("user")
            );

          const email = user?.email;

          // Debugging
          console.log("TOKEN =", token);
          console.log("EMAIL =", email);

          if (
            !email ||
            !token
          ) {

            navigate(
              "/login",
              {
                replace: true,
              }
            );

            return;
          }

          const res =
            await axios.get(

              `/api/enroll/my-courses?email=${email}`,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setCourses(
            res.data.courses || []
          );

        } catch (err) {

          console.error(err);

          if (
            err.response?.status ===
            401
          ) {

            localStorage.clear();

            navigate(
              "/login",
              {
                replace: true,
              }
            );
          }

        } finally {

          setLoading(false);
        }
      };

    fetchCourses();

  }, [navigate]);


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


          <div style={styles.notification}>
            <Bell size={24} />
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
                  {courses.length}
                </p>

              </div>


              {/* MOCK TESTS */}
              <div style={styles.card}>

                <PlayCircle size={40} />

                <h3 style={styles.cardTitle}>
                  Mock Tests
                </h3>

                <p style={styles.cardValue}>
                  {courses.length > 0
                    ? 5
                    : 0}
                </p>

              </div>


              {/* PROGRESS */}
              <div style={styles.card}>

                <Clock size={40} />

                <h3 style={styles.cardTitle}>
                  Progress
                </h3>

                <p style={styles.cardValue}>
                  {courses.length > 0
                    ? "68%"
                    : "0%"}
                </p>

              </div>


              {/* CERTIFICATES */}
              <div style={styles.card}>

                <Trophy size={40} />

                <h3 style={styles.cardTitle}>
                  Certificates
                </h3>

                <p style={styles.cardValue}>
                  {courses.length > 0
                    ? 2
                    : 0}
                </p>

              </div>

            </div>


            {/* ================= CONTINUE LEARNING ================= */}
            <div style={styles.section}>


              <h2 style={styles.sectionTitle}>
                📚 Continue Learning
              </h2>


              {courses.length === 0 ? (

                <div style={styles.emptyBox}>
                  No courses enrolled ❗
                </div>

              ) : (

                courses.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      style={styles.courseCard}
                    >

                      <div>

                        <h3 style={styles.courseTitle}>
                          {
                            item.courseId
                              ?.title
                          }
                        </h3>

                        <p style={styles.courseDesc}>
                          Continue from where
                          you left off
                        </p>

                      </div>


                      <button

                        style={
                          styles.continueBtn
                        }

                        onClick={() =>
                          navigate(
                            `/course/${item.courseId?._id}`
                          )
                        }
                      >
                        Continue
                      </button>

                    </div>
                  )
                )
              )}

            </div>


            {/* ================= RECENT ACTIVITY ================= */}
            <div style={styles.section}>


              <h2 style={styles.sectionTitle}>
                🔥 Recent Activity
              </h2>


              <div style={styles.activityBox}>
                ✅ Completed Binary Search Lecture
              </div>

              <div style={styles.activityBox}>
                📝 Attempted Mock Test
              </div>

              <div style={styles.activityBox}>
                📜 Certificate unlocked
              </div>

            </div>


            {/* ================= RECOMMENDED ================= */}
            <div style={styles.section}>


              <h2 style={styles.sectionTitle}>
                🎯 Recommended Courses
              </h2>


              <div style={styles.recommendGrid}>


                <div
                  style={
                    styles.recommendCard
                  }
                >

                  <GraduationCap
                    size={36}
                  />

                  <h3
                    style={
                      styles.recommendTitle
                    }
                  >
                    React Masterclass
                  </h3>

                  <p
                    style={
                      styles.recommendText
                    }
                  >
                    Build modern frontend apps
                  </p>

                </div>


                <div
                  style={
                    styles.recommendCard
                  }
                >

                  <GraduationCap
                    size={36}
                  />

                  <h3
                    style={
                      styles.recommendTitle
                    }
                  >
                    Node.js Backend
                  </h3>

                  <p
                    style={
                      styles.recommendText
                    }
                  >
                    APIs and server systems
                  </p>

                </div>


                <div
                  style={
                    styles.recommendCard
                  }
                >

                  <GraduationCap
                    size={36}
                  />

                  <h3
                    style={
                      styles.recommendTitle
                    }
                  >
                    MongoDB Complete Guide
                  </h3>

                  <p
                    style={
                      styles.recommendText
                    }
                  >
                    Learn NoSQL databases
                  </p>

                </div>

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

  notification: {
    background: "#111827",
    padding: "15px",
    borderRadius: "14px",
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

  section: {
    marginBottom: "40px",
  },

  sectionTitle: {
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "20px",
  },

  emptyBox: {
    background: "#111827",
    padding: "30px",
    borderRadius: "20px",
    color: "#94a3b8",
  },

  courseCard: {
    background: "#111827",
    padding: "28px",
    borderRadius: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  courseTitle: {
    fontSize: "28px",
    fontWeight: "700",
  },

  courseDesc: {
    color: "#94a3b8",
    marginTop: "10px",
  },

  continueBtn: {
    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",

    color: "white",

    border: "none",

    padding: "16px 24px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",
  },

  activityBox: {
    background: "#111827",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "15px",
    fontSize: "18px",
  },

  recommendGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",

    gap: "20px",
  },

  recommendCard: {
    background: "#111827",
    padding: "30px",
    borderRadius: "22px",
  },

  recommendTitle: {
    marginTop: "18px",
    fontSize: "24px",
    fontWeight: "700",
  },

  recommendText: {
    marginTop: "10px",
    color: "#94a3b8",
  },

  loading: {
    textAlign: "center",
    marginTop: "40px",
    fontSize: "28px",
  },
};