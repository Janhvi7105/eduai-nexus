import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Layout from "../components/common/Layout";
import Swal from "sweetalert2";


function TeacherCourse() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] =
    useState(null);

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const theme =
    localStorage.getItem("theme") ||
    "light";


  // ================= HANDLE UPLOAD COURSE =================
  const handleUploadCourse = async () => {

    await Swal.fire({
      icon: "success",
      title: "Course Uploaded Successfully 🎉",
      text: "Course is now visible to students.",
      confirmButtonText: "OK",
    });

    navigate("/courses");
  };


  // ================= FETCH COURSE =================
  useEffect(() => {

    const fetchCourse =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          // ================= COURSE =================
          const courseRes =
            await axios.get(
              `/api/courses/${id}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setCourse(
            courseRes.data.course
          );


          // ================= STUDENTS =================
          try {

            const studentRes =
              await axios.get(
                `/api/user/students`,
                {
                  headers: {
                    Authorization:
                      `Bearer ${token}`,
                  },
                }
              );

            setStudents(
              studentRes.data.students ||
              []
            );

          } catch (err) {

            console.log(
              "Student fetch skipped"
            );
          }

        } catch (err) {

          console.error(
            "COURSE ERROR:",
            err
          );

        } finally {

          setLoading(false);
        }
      };

    fetchCourse();

  }, [id]);


  // ================= SAVE COURSE =================
  const handleSaveCourse =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `/api/courses/${course._id}`,
          {
            title:
              course.title,

            description:
              course.description,

            price:
              course.price,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "✅ Course Updated Successfully"
        );

      } catch (err) {

        console.error(err);

        alert(
          "❌ Failed to update course"
        );
      }
    };


  // ================= LOADING =================
  if (loading) {

    return (

      <Layout>

        <div style={styles.loading}>
          ⏳ Loading course...
        </div>

      </Layout>
    );
  }


  // ================= NO COURSE =================
  if (!course) {

    return (

      <Layout>

        <div style={styles.loading}>
          ❌ Course not found
        </div>

      </Layout>
    );
  }


  return (

    <Layout>

      <div style={styles.page}>


        {/* ================= HEADER ================= */}
        <div
          style={{
            ...styles.header,

            background:
              theme === "dark"
                ? "#111827"
                : "#ffffff",
          }}
        >

          <div>

            <h1
              style={{
                ...styles.title,

                color:
                  theme === "dark"
                    ? "#ffffff"
                    : "#111827",
              }}
            >
              👨‍🏫 Manage Course
            </h1>

            <p style={styles.subtitle}>
              Professional instructor dashboard
            </p>

          </div>


          {/* ================= BUTTONS ================= */}
          <div style={styles.headerBtns}>


            {/* ✏️ EDIT */}
            <button
              style={styles.editBtn}
              onClick={() =>
                navigate(
                  `/edit-course/${course._id}`
                )
              }
            >
              ✏️ Edit Course
            </button>


            {/* 🚀 UPLOAD COURSE */}
            <button
              style={styles.uploadBtn}
              onClick={handleUploadCourse}
            >
              🚀 Upload Course
            </button>

            {/* 📝 MOCK TEST */}
            <button
              style={styles.mockBtn}
              onClick={() =>
                navigate(
                  `/mock-test/${course._id}`
                )
              }
            >
              📝 Create Mock Test
            </button>

          </div>

        </div>


        {/* ================= EDITABLE COURSE BANNER ================= */}
        <div
          style={{
            ...styles.banner,

            background:
              "linear-gradient(135deg,#2563eb,#4f46e5)",
          }}
        >


          {/* LEFT */}
          <div style={{ flex: 1 }}>


            {/* TITLE */}
            <input
              type="text"

              value={course.title}

              onChange={(e) =>
                setCourse({
                  ...course,
                  title:
                    e.target.value,
                })
              }

              style={styles.courseInput}
            />


            {/* DESCRIPTION */}
            <textarea
              value={course.description}

              onChange={(e) =>
                setCourse({
                  ...course,
                  description:
                    e.target.value,
                })
              }

              style={styles.descInput}
            />

          </div>


          {/* RIGHT */}
          <div style={styles.priceBox}>


            {/* PRICE */}
            <input
              type="number"

              value={course.price}

              onChange={(e) =>
                setCourse({
                  ...course,
                  price:
                    e.target.value,
                })
              }

              style={styles.priceInput}
            />


            <p style={styles.priceLabel}>
              Course Price
            </p>


            {/* SAVE */}
            <button
              style={styles.saveCourseBtn}

              onClick={
                handleSaveCourse
              }
            >
              💾 Save Changes
            </button>

          </div>

        </div>


        {/* ================= ANALYTICS ================= */}
        <div style={styles.grid}>


          <div
            style={{
              ...styles.card,

              background:
                theme === "dark"
                  ? "#111827"
                  : "#ffffff",
            }}
          >

            <h2 style={styles.cardIcon}>
              👨‍🎓
            </h2>

            <h3 style={styles.cardTitle}>
              Students
            </h3>

            <h1 style={styles.cardNumber}>
              {students.length}
            </h1>

          </div>


          <div
            style={{
              ...styles.card,

              background:
                theme === "dark"
                  ? "#111827"
                  : "#ffffff",
            }}
          >

            <h2 style={styles.cardIcon}>
              📹
            </h2>

            <h3 style={styles.cardTitle}>
              Lectures
            </h3>

            <h1 style={styles.cardNumber}>
              {
                course?.sections?.reduce(
                  (
                    acc,
                    sec
                  ) =>
                    acc +
                    sec.lectures.length,
                  0
                ) || 0
              }
            </h1>

          </div>


          <div
            style={{
              ...styles.card,

              background:
                theme === "dark"
                  ? "#111827"
                  : "#ffffff",
            }}
          >

            <h2 style={styles.cardIcon}>
              💰
            </h2>

            <h3 style={styles.cardTitle}>
              Earnings
            </h3>

            <h1 style={styles.cardNumber}>
              ₹0
            </h1>

          </div>


          <div
            style={{
              ...styles.card,

              background:
                theme === "dark"
                  ? "#111827"
                  : "#ffffff",
            }}
          >

            <h2 style={styles.cardIcon}>
              ⭐
            </h2>

            <h3 style={styles.cardTitle}>
              Rating
            </h3>

            <h1 style={styles.cardNumber}>
              5.0
            </h1>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default TeacherCourse;


// ================= STYLES =================
const styles = {

  page: {
    paddingBottom: "40px",
  },

  loading: {
    height: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "700",
  },


  // ================= HEADER =================
  header: {
    padding: "30px",
    borderRadius: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "20px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.1)",
  },

  title: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "16px",
  },

  headerBtns: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  editBtn: {
    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",
    color: "#fff",
    border: "none",
    padding: "14px 22px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
  },

  uploadBtn: {
    background:
      "linear-gradient(135deg,#10b981,#059669)",
    color: "#fff",
    border: "none",
    padding: "14px 22px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
  },

  mockBtn: {

    background:
      "linear-gradient(135deg,#f59e0b,#ea580c)",

    color: "#fff",

    border: "none",

    padding: "14px 22px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",

    boxShadow:
      "0 10px 20px rgba(249,115,22,0.35)",
  },


  // ================= BANNER =================
  banner: {
    padding: "40px",
    borderRadius: "28px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "30px",
    marginBottom: "35px",
  },

  courseInput: {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "52px",
    fontWeight: "900",
    marginBottom: "18px",
  },

  descInput: {
    width: "100%",
    minHeight: "120px",
    background:
      "rgba(255,255,255,0.12)",
    border:
      "1px solid rgba(255,255,255,0.2)",
    borderRadius: "18px",
    padding: "20px",
    color: "#fff",
    fontSize: "18px",
    outline: "none",
    resize: "none",
  },

  priceBox: {
    textAlign: "center",
  },

  priceInput: {
    width: "180px",
    background:
      "rgba(255,255,255,0.12)",
    border:
      "1px solid rgba(255,255,255,0.2)",
    borderRadius: "18px",
    padding: "18px",
    color: "#fff",
    fontSize: "42px",
    fontWeight: "900",
    textAlign: "center",
    outline: "none",
    marginBottom: "15px",
  },

  priceLabel: {
    opacity: 0.9,
    fontSize: "18px",
  },

  saveCourseBtn: {
    marginTop: "25px",
    background:
      "linear-gradient(135deg,#10b981,#059669)",
    color: "#fff",
    border: "none",
    padding: "16px 26px",
    borderRadius: "16px",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "16px",
  },


  // ================= GRID =================
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "25px",
    marginBottom: "35px",
  },

  card: {
    padding: "30px",
    borderRadius: "24px",
    textAlign: "center",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)",
  },

  cardIcon: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  cardTitle: {
    color: "#94a3b8",
    marginBottom: "10px",
  },

  cardNumber: {
    fontSize: "42px",
    fontWeight: "900",
    color: "#2563eb",
  },
};