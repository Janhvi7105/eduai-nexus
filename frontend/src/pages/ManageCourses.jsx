import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminLayout
from "../components/admin/AdminLayout";


function ManageCourses() {

  const [courses, setCourses] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  // ================= MOBILE DETECTION =================
  const isMobile =
    window.innerWidth <= 768;

  // ================= FETCH COURSES =================
  useEffect(() => {

    fetchCourses();

  }, []);


  const fetchCourses =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(

            "http://localhost:5000/api/admin/courses",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setCourses(
          res.data.courses
        );

      } catch (error) {

        console.log(error);
      }
    };


  // ================= DELETE =================
  const handleDelete =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(

          `http://localhost:5000/api/admin/courses/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchCourses();

      } catch (error) {

        console.log(error);
      }
    };


  // ================= SEARCH FILTER =================
  const filteredCourses =
    courses.filter((course) =>
      course.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );


  // ================= STATS =================
  const totalEnrollments =
    courses.reduce(
      (sum, course) =>
        sum +
        (course.studentsEnrolled?.length || 0),
      0
    );


  return (

    <AdminLayout>

      <div style={styles.page}>


        <h1
          style={{
            ...styles.heading,
            fontSize:
              isMobile ? "28px" : "42px",
          }}
        >
          📚 Manage Courses
        </h1>


        {/* STATS CARDS */}
        <div style={styles.stats}>

          <div style={{
            ...styles.statCard,
            flex: 1,
          }}>
            <h2>{courses.length}</h2>
            <p>Total Courses</p>
          </div>

          <div style={{
            ...styles.statCard,
            flex: 1,
          }}>
            <h2>{totalEnrollments}</h2>
            <p>Total Enrollments</p>
          </div>

        </div>


        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.search}
        />


        {/* COURSES GRID */}
        <div
          style={{
            ...styles.grid,
            gridTemplateColumns:
              isMobile
                ? "1fr"
                : "repeat(auto-fit,minmax(320px,1fr))",
          }}
        >

          {filteredCourses.map((course) => (

            <div
              key={course._id}
              style={styles.card}
            >

              {/* THUMBNAIL */}
              <img
                src={course.thumbnail}
                alt={course.title}
                style={{
                  ...styles.thumbnail,
                  height:
                    isMobile ? "140px" : "180px",
                }}
              />

              <h2>
                {course.title}
              </h2>

              <p>
                👨‍🏫 Instructor:
                {course.teacher?.name || course.instructor?.name || "Unknown"}
              </p>

              <p>
                💰 Price:
                ₹{course.price}
              </p>

              <p>
                👨‍🎓 Students:
                {course.studentsEnrolled?.length || 0}
              </p>

              <p>
                📅 Created:
                {new Date(course.createdAt)
                  .toLocaleDateString()}
              </p>

              <p>
                ⭐ Rating:
                {course.rating || 0} / 5
              </p>


              <div style={styles.buttons}>

                <button
                  style={styles.viewBtn}
                  onClick={() =>
                    setSelectedCourse(course)
                  }
                >
                  View
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    handleDelete(
                      course._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* VIEW COURSE MODAL */}
      {selectedCourse && (

        <div style={styles.modalOverlay}>

          <div style={{
            ...styles.modal,
            padding: isMobile ? "20px" : "30px",
            width: "90%",
            maxWidth: "600px",
          }}>

            <h2 style={styles.modalHeading}>
              📖 Course Details
            </h2>

            <img
              src={selectedCourse.thumbnail}
              alt={selectedCourse.title}
              style={styles.modalThumbnail}
            />

            <p>
              <strong>Course Name:</strong>
              {" "}
              {selectedCourse.title}
            </p>

            <p>
              <strong>Instructor:</strong>
              {" "}
              {selectedCourse.teacher?.name || selectedCourse.instructor?.name || "Unknown"}
            </p>

            <p>
              <strong>Price:</strong>
              {" "}
              ₹{selectedCourse.price}
            </p>

            <p>
              <strong>Students Enrolled:</strong>
              {" "}
              {selectedCourse.studentsEnrolled?.length || 0}
            </p>

            <p>
              <strong>Created Date:</strong>
              {" "}
              {new Date(selectedCourse.createdAt)
                .toLocaleDateString()}
            </p>

            <p>
              <strong>Rating:</strong>
              {" "}
              ⭐ {selectedCourse.rating || 0} / 5
            </p>

            <p>
              <strong>Modules:</strong>
              {" "}
              {selectedCourse.modules?.length || 0}
            </p>

            <p>
              <strong>Lectures:</strong>
              {" "}
              {selectedCourse.modules?.reduce(
                (total, module) =>
                  total + (module.lectures?.length || 0),
                0
              ) || 0}
            </p>

            <p>
              <strong>Description:</strong>
            </p>
            <p style={styles.description}>
              {selectedCourse.description || "No description available"}
            </p>

            <div style={styles.modalButtons}>

              <button
                style={styles.closeBtn}
                onClick={() =>
                  setSelectedCourse(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>
  );
}

export default ManageCourses;


// ================= STYLES =================
const styles = {

  page: {
    color: "white",
  },

  heading: {
    fontSize: "42px",
    marginBottom: "30px",
  },

  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  statCard: {
    background: "#0f172a",
    padding: "25px",
    borderRadius: "20px",
    minWidth: "200px",
  },

  search: {
    width: "100%",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #334155",
    marginBottom: "30px",
    fontSize: "16px",
    background: "#1e293b",
    color: "white",
    outline: "none",
    boxSizing: "border-box",
  },

  grid: {

    display: "grid",

    gap: "24px",
  },

  card: {

    background: "#0f172a",

    padding: "24px",

    borderRadius: "22px",

    border:
      "1px solid #1e293b",
  },

  thumbnail: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "16px",
    marginBottom: "15px",
  },

  buttons: {

    display: "flex",

    gap: "12px",

    marginTop: "20px",

    flexWrap: "wrap",
  },

  viewBtn: {
    background: "#8b5cf6",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  deleteBtn: {

    background: "#ef4444",

    color: "white",

    border: "none",

    padding: "10px 16px",

    borderRadius: "10px",

    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    overflowY: "auto",
  },

  modal: {
    background: "#0f172a",
    color: "white",
    padding: "30px",
    borderRadius: "20px",
    width: "600px",
    maxWidth: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    boxSizing: "border-box",
  },

  modalHeading: {
    fontSize: "28px",
    marginBottom: "20px",
  },

  modalThumbnail: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "16px",
    marginBottom: "20px",
  },

  description: {
    marginTop: "10px",
    lineHeight: "1.6",
    color: "#cbd5e1",
  },

  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },

  closeBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },
};