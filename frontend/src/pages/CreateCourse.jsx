import { useState } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";
import { useNavigate } from "react-router-dom";

function CreateCourse() {

  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);


  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================
  const handleChange = (e) => {

    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };


  // ==========================
  // CREATE COURSE
  // ==========================
  const handleCreateCourse = async () => {

    try {

      const token = localStorage.getItem("token");

      if (
        !courseData.title ||
        !courseData.description ||
        !courseData.price
      ) {

        alert("Please fill all fields ❗");

        return;
      }

      setLoading(true);

      const res = await axios.post(
        "/api/courses/create",
        {
          title: courseData.title,
          description: courseData.description,
          price: Number(courseData.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "✅ Course Response:",
        res.data
      );

      const createdCourse =
        res.data.course;

      alert(
        "🎉 Course Created Successfully!"
      );

      // ✅ REDIRECT TO EDIT PAGE
      navigate(
        `/edit-course/${createdCourse._id}`
      );

      // ✅ RESET FORM
      setCourseData({
        title: "",
        description: "",
        price: "",
      });

    } catch (err) {

      console.error(
        "❌ Create Course Error:",
        err
      );

      alert(
        err.response?.data?.message ||
        "Error creating course ❌"
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <Layout>

      <div style={styles.page}>


        {/* ================= HEADER ================= */}
        <div style={styles.header}>

          <h1 style={styles.title}>
            🚀 Create New Course
          </h1>

          <p style={styles.subtitle}>
            Build professional courses for your students
          </p>

        </div>


        {/* ================= FORM CARD ================= */}
        <div style={styles.section}>


          {/* COURSE TITLE */}
          <div style={styles.field}>

            <label style={styles.label}>
              📘 Course Title
            </label>

            <input
              name="title"
              placeholder="Enter course title"
              value={courseData.title}
              onChange={handleChange}
              style={styles.input}
            />

          </div>


          {/* DESCRIPTION */}
          <div style={styles.field}>

            <label style={styles.label}>
              📝 Course Description
            </label>

            <textarea
              name="description"
              placeholder="Write detailed course description..."
              value={courseData.description}
              onChange={handleChange}
              style={styles.textarea}
            />

          </div>


          {/* PRICE */}
          <div style={styles.field}>

            <label style={styles.label}>
              💰 Course Price
            </label>

            <input
              name="price"
              type="number"
              placeholder="Enter course price"
              value={courseData.price}
              onChange={handleChange}
              style={styles.input}
            />

          </div>


          {/* BUTTON */}
          <button
            style={styles.btn}
            onClick={handleCreateCourse}
            disabled={loading}
          >

            {loading
              ? "Creating Course..."
              : "➕ Create Course"}

          </button>

        </div>

      </div>

    </Layout>
  );
}

export default CreateCourse;


// ==========================
// STYLES
// ==========================
const styles = {

  // ================= PAGE =================
  page: {
    padding: "10px",
    color: "var(--text-color)",
  },


  // ================= HEADER =================
  header: {
    marginBottom: "30px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "var(--text-color)",
  },

  subtitle: {
    fontSize: "16px",
    color: "#94a3b8",
  },


  // ================= FORM CARD =================
  section: {

    background: "var(--card-bg)",

    padding: "35px",

    borderRadius: "24px",

    display: "flex",

    flexDirection: "column",

    gap: "25px",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 15px 35px rgba(0,0,0,0.18)",
  },


  // ================= FIELD =================
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  label: {
    fontSize: "17px",
    fontWeight: "600",
    color: "var(--text-color)",
  },


  // ================= INPUT =================
  input: {

    padding: "16px",

    borderRadius: "14px",

    border:
      "1px solid rgba(255,255,255,0.08)",

    background:
      "rgba(255,255,255,0.04)",

    color: "var(--text-color)",

    fontSize: "16px",

    outline: "none",

    transition: "0.3s",
  },


  // ================= TEXTAREA =================
  textarea: {

    padding: "16px",

    borderRadius: "14px",

    border:
      "1px solid rgba(255,255,255,0.08)",

    background:
      "rgba(255,255,255,0.04)",

    color: "var(--text-color)",

    minHeight: "140px",

    resize: "vertical",

    fontSize: "16px",

    outline: "none",

    transition: "0.3s",
  },


  // ================= BUTTON =================
  btn: {

    background:
      "linear-gradient(135deg,#10b981,#059669)",

    color: "#fff",

    padding: "18px",

    border: "none",

    borderRadius: "16px",

    cursor: "pointer",

    fontWeight: "bold",

    fontSize: "17px",

    transition: "0.3s",

    marginTop: "10px",

    boxShadow:
      "0 10px 25px rgba(16,185,129,0.25)",
  },
};