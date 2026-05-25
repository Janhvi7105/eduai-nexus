import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";

function MyCourses() {

  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const theme =
    localStorage.getItem("theme") || "light";

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};


  // ================= COURSE IMAGE FUNCTION =================
  const getCourseImage = (title) => {

    const lower =
      title?.toLowerCase() || "";

    // ================= JAVA =================
    if (
      lower.includes("java")
    ) {
      return "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop";
    }

    // ================= REACT =================
    if (
      lower.includes("react")
    ) {
      return "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop";
    }

    // ================= PYTHON =================
    if (
      lower.includes("python")
    ) {
      return "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200&auto=format&fit=crop";
    }

    // ================= DATABASE =================
    if (
      lower.includes("database") ||
      lower.includes("sql") ||
      lower.includes("mongodb")
    ) {
      return "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop";
    }

    // ================= DSA =================
    if (
      lower.includes("array") ||
      lower.includes("dsa") ||
      lower.includes("algorithm") ||
      lower.includes("hash") ||
      lower.includes("tree")
    ) {
      return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop";
    }

    // ================= WEB DEV =================
    if (
      lower.includes("html") ||
      lower.includes("css") ||
      lower.includes("javascript")
    ) {
      return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";
    }

    // ================= AI =================
    if (
      lower.includes("ai") ||
      lower.includes("machine learning")
    ) {
      return "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop";
    }

    // ================= DEFAULT =================
    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop";
  };


  // ================= FETCH COURSES =================
  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const token =
          localStorage.getItem("token");

        // 🔴 If not logged in
        if (!token) {

          alert(
            "Please login first ❗"
          );

          navigate("/login", {
            replace: true,
          });

          return;
        }

        // ✅ FETCH ALL COURSES
        const res = await axios.get(
          "/api/courses",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        console.log(
          "📚 COURSES:",
          res.data
        );

        setCourses(
          res.data.courses || []
        );

      } catch (err) {

        console.error(
          "ERROR:",
          err
        );

        // 🔴 Token expired
        if (
          err.response?.status === 401
        ) {

          alert(
            "Session expired ❌ Please login again"
          );

          localStorage.clear();

          navigate("/login", {
            replace: true,
          });

        } else {

          alert(
            "Failed to load courses ❌"
          );
        }
      }
    };

    fetchCourses();

  }, [navigate]);


  return (

    <Layout>

      <div style={styles.page}>


        {/* ================= HEADER ================= */}
        <div style={styles.header}>


          <div>

            <h1 style={styles.title}>
              {
                user?.role ===
                "teacher"

                  ? "👨‍🏫 My Teaching Courses"

                  : "📚 My Courses"
              }
            </h1>

            <p style={styles.subtitle}>

              {
                user?.role ===
                "teacher"

                  ? "Manage your courses, lectures and analytics"

                  : "Continue learning and complete your courses"
              }

            </p>

          </div>

        </div>


        {/* ================= EMPTY ================= */}
        {courses.length === 0 ? (

          <div style={styles.emptyBox}>

            <h2 style={styles.emptyIcon}>
              📭
            </h2>

            <p style={styles.empty}>
              No courses available ❗
            </p>

          </div>

        ) : (

          <div style={styles.grid}>


            {courses.map((c, i) => (

              <div
                key={i}

                style={{
                  ...styles.card,

                  background:
                    theme === "dark"
                      ? "#111827"
                      : "#ffffff",
                }}
              >


                {/* ================= COURSE IMAGE ================= */}
                <div style={styles.thumbnail}>


                  <img
                    src={getCourseImage(c.title)}
                    alt="course"
                    style={styles.image}
                  />


                  <div style={styles.overlay}>


                    <span style={styles.badge}>

                      {
                        user?.role ===
                        "teacher"

                          ? "Instructor"

                          : "Course"
                      }

                    </span>

                  </div>

                </div>


                {/* ================= CONTENT ================= */}
                <div style={styles.content}>


                  <h2
                    style={{
                      ...styles.courseTitle,

                      color:
                        theme === "dark"
                          ? "#f8fafc"
                          : "#111827",
                    }}
                  >
                    {
                      c.title ||
                      "Untitled Course"
                    }
                  </h2>


                  <p style={styles.description}>
                    {
                      c.description ||
                      "No description available"
                    }
                  </p>


                  {/* ================= BOTTOM ================= */}
                  <div style={styles.bottom}>


                    <div>

                      <p style={styles.priceLabel}>
                        Price
                      </p>

                      <h3 style={styles.price}>
                        ₹ {c.price}
                      </h3>

                    </div>


                    {/* ================= ROLE BASED BUTTON ================= */}
                    <button

                      style={styles.btn}

                      onClick={() => {

                        // 👨‍🏫 TEACHER
                        if (
                          user?.role ===
                          "teacher"
                        ) {

                          navigate(
                            `/teacher-course/${c._id}`
                          );

                        }

                        // 👨‍🎓 STUDENT
                        else {

                          navigate(
                            `/course-player/${c._id}`
                          );
                        }
                      }}
                    >

                      {
                        user?.role ===
                        "teacher"

                          ? "Manage Course ⚙️"

                          : "Start Learning ▶"
                      }

                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </Layout>
  );
}

export default MyCourses;


// ================= STYLES =================
const styles = {

  // ================= PAGE =================
  page: {
    padding: "10px",
    color: "var(--text-color)",
  },

  header: {
    marginBottom: "30px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "var(--text-color)",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "16px",
  },


  // ================= GRID =================
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px",
  },


  // ================= CARD =================
  card: {

    borderRadius: "22px",

    overflow: "hidden",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.15)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    transition: "0.3s",
  },


  // ================= THUMBNAIL =================
  thumbnail: {
    position: "relative",
    height: "220px",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "0.4s",
  },

  overlay: {
    position: "absolute",
    top: "15px",
    left: "15px",
  },

  badge: {
    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",

    color: "#fff",

    padding: "6px 14px",

    borderRadius: "999px",

    fontSize: "13px",

    fontWeight: "bold",
  },


  // ================= CONTENT =================
  content: {
    padding: "22px",
  },

  courseTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  description: {
    color: "#94a3b8",
    lineHeight: "1.7",
    minHeight: "60px",
    marginBottom: "20px",
  },


  // ================= BOTTOM =================
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginTop: "20px",
  },

  priceLabel: {
    fontSize: "13px",
    color: "#94a3b8",
    marginBottom: "5px",
  },

  price: {
    color: "#3b82f6",
    fontSize: "28px",
    fontWeight: "bold",
  },


  // ================= BUTTON =================
  btn: {

    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",

    color: "#fff",

    border: "none",

    padding: "14px 20px",

    borderRadius: "12px",

    cursor: "pointer",

    fontWeight: "bold",

    fontSize: "15px",

    transition: "0.3s",
  },


  // ================= EMPTY =================
  emptyBox: {

    background: "var(--card-bg)",

    borderRadius: "20px",

    padding: "60px 20px",

    textAlign: "center",

    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  emptyIcon: {
    fontSize: "50px",
    marginBottom: "10px",
  },

  empty: {
    color: "#ef4444",
    fontSize: "18px",
    fontWeight: "500",
  },
};