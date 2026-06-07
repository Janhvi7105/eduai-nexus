import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";

function Students() {

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);


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

        setStudents(
          res.data.students || []
        );

      } catch (err) {

        console.error(
          "Student fetch error:",
          err
        );

      } finally {

        setLoading(false);
      }
    };

    fetchStudents();

  }, []);


  return (
    <Layout>

      {/* ================= HEADER ================= */}
      <div style={styles.topSection}>

        <h1 style={styles.heading}>
          👨‍🎓 Registered Students
        </h1>

        <p style={styles.subHeading}>
          Manage all enrolled students and their registered courses
        </p>

      </div>


      {/* ================= LOADING ================= */}
      {loading ? (

        <div style={styles.loading}>
          Loading students...
        </div>

      ) : students.length === 0 ? (

        <div style={styles.empty}>
          No students registered yet ❗
        </div>

      ) : (

        <div style={styles.grid}>

          {students.map((student, index) => (

            <div
              key={index}
              style={styles.studentCard}
            >

              {/* ================= TOP ================= */}
              <div style={styles.cardTop}>

                <div style={styles.avatar}>
                  👤
                </div>

                <div>

                  <h2 style={styles.studentName}>
                    {student.name || "New User"}
                  </h2>

                  <p style={styles.role}>
                    🎯 {student.role}
                  </p>

                </div>

              </div>


              {/* ================= INFO ================= */}
              <div style={styles.infoSection}>

                <div style={styles.infoBox}>

                  <p style={styles.label}>
                    📧 Email
                  </p>

                  <p style={styles.value}>
                    {student.email}
                  </p>

                </div>


                <div style={styles.infoBox}>

                  <p style={styles.label}>
                    📞 Phone
                  </p>

                  <p style={styles.value}>
                    {student.phone || "N/A"}
                  </p>

                </div>

              </div>


              {/* ================= COURSES ================= */}
              <div style={styles.courseSection}>

                <h3 style={styles.courseHeading}>
                  📚 Registered Courses
                </h3>


                {student.enrolledCourses?.length > 0 ? (

                  <div style={styles.courseList}>

                    {student.enrolledCourses.map(
                      (course, i) => (

                        <div
                          key={i}
                          style={styles.courseBadge}
                        >
                          {course.title}
                        </div>
                      )
                    )}

                  </div>

                ) : (

                  <div style={styles.noCourseBox}>

                    No enrolled courses

                  </div>
                )}


                <div style={styles.totalBox}>

                  <span>
                    Total Courses
                  </span>

                  <span style={styles.totalNumber}>
                    {
                      student.enrolledCourses
                        ?.length || 0
                    }
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </Layout>
  );
}

export default Students;



// ================= STYLES =================
const styles = {

  // ================= PAGE =================
  topSection: {
    marginBottom: "30px",
  },

  heading: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "var(--text-color)",
  },

  subHeading: {
    color: "#94a3b8",
    fontSize: "16px",
  },


  // ================= STATES =================
  loading: {

    background: "var(--card-bg)",

    color: "var(--text-color)",

    padding: "25px",

    borderRadius: "18px",

    fontSize: "18px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.15)",
  },


  empty: {

    background: "var(--card-bg)",

    color: "#ef4444",

    padding: "25px",

    borderRadius: "18px",

    fontSize: "18px",

    textAlign: "center",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.15)",
  },


  // ================= GRID =================
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(320px, 320px))",
    gap: "20px",
    justifyContent: "start",
  },


  // ================= CARD =================
  studentCard: {

    background: "var(--card-bg)",

    color: "var(--text-color)",

    borderRadius: "24px",

    padding: "20px",

    width: "320px",

    minHeight: "300px",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 15px 35px rgba(0,0,0,0.18)",

    transition: "0.3s",
  },


  // ================= TOP =================
  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "25px",
  },

  avatar: {

    width: "70px",

    height: "70px",

    borderRadius: "50%",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "32px",

    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",

    color: "#fff",

    boxShadow:
      "0 8px 20px rgba(37,99,235,0.3)",
  },

  studentName: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "var(--text-color)",
  },

  role: {
    color: "#94a3b8",
    fontSize: "15px",
  },


  // ================= INFO =================
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "28px",
  },

  infoBox: {

    background:
      "rgba(255,255,255,0.04)",

    padding: "16px",

    borderRadius: "14px",

    border:
      "1px solid rgba(255,255,255,0.05)",
  },

  label: {
    fontSize: "13px",
    color: "#94a3b8",
    marginBottom: "5px",
  },

  value: {
    fontSize: "17px",
    fontWeight: "500",
    color: "var(--text-color)",
  },


  // ================= COURSES =================
  courseSection: {
    marginTop: "10px",
  },

  courseHeading: {
    marginBottom: "18px",
    fontSize: "22px",
    color: "var(--text-color)",
  },

  courseList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "20px",
  },

  courseBadge: {

    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",

    color: "#fff",

    padding: "10px 18px",

    borderRadius: "999px",

    fontSize: "14px",

    fontWeight: "600",

    boxShadow:
      "0 6px 15px rgba(37,99,235,0.25)",
  },


  noCourseBox: {

    background:
      "rgba(239,68,68,0.08)",

    color: "#ef4444",

    padding: "14px",

    borderRadius: "12px",

    marginBottom: "18px",

    textAlign: "center",
  },


  // ================= TOTAL =================
  totalBox: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: "20px",

    paddingTop: "18px",

    borderTop:
      "1px solid rgba(255,255,255,0.08)",

    fontWeight: "600",

    color: "var(--text-color)",
  },

  totalNumber: {

    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",

    color: "#fff",

    width: "38px",

    height: "38px",

    borderRadius: "50%",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontWeight: "bold",
  },
};