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


  // ================= APPROVE =================
  const handleApprove =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(

          `http://localhost:5000/api/admin/courses/approve/${id}`,

          {},

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


  // ================= FEATURE =================
  const handleFeature =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(

          `http://localhost:5000/api/admin/courses/feature/${id}`,

          {},

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


  return (

    <AdminLayout>

      <div style={styles.page}>


        <h1 style={styles.heading}>
          📚 Manage Courses
        </h1>


        <div style={styles.grid}>


          {courses.map((course) => (

            <div
              key={course._id}
              style={styles.card}
            >

              <h2>
                {course.title}
              </h2>

              <p>
                👨‍🏫 {
                  course.teacher?.name
                }
              </p>

              <p>
                💰 ₹{course.price}
              </p>

              <p>
                ✅ Approved:
                {" "}
                {
                  course.approved
                    ? "Yes"
                    : "No"
                }
              </p>

              <p>
                ⭐ Featured:
                {" "}
                {
                  course.featured
                    ? "Yes"
                    : "No"
                }
              </p>


              <div style={styles.buttons}>


                <button

                  style={styles.approveBtn}

                  onClick={() =>
                    handleApprove(
                      course._id
                    )
                  }
                >
                  Approve
                </button>


                <button

                  style={styles.featureBtn}

                  onClick={() =>
                    handleFeature(
                      course._id
                    )
                  }
                >
                  Feature
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

  grid: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",

    gap: "24px",
  },

  card: {

    background: "#0f172a",

    padding: "24px",

    borderRadius: "22px",

    border:
      "1px solid #1e293b",
  },

  buttons: {

    display: "flex",

    gap: "12px",

    marginTop: "20px",

    flexWrap: "wrap",
  },

  approveBtn: {

    background: "#10b981",

    color: "white",

    border: "none",

    padding: "10px 16px",

    borderRadius: "10px",

    cursor: "pointer",
  },

  featureBtn: {

    background: "#2563eb",

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
};