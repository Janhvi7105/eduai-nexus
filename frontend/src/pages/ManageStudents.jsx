import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminLayout
from "../components/admin/AdminLayout";


function ManageStudents() {

  const [students, setStudents] =
    useState([]);

  const [search, setSearch] =
    useState("");


  // ================= FETCH STUDENTS =================
  useEffect(() => {

    fetchStudents();

  }, []);


  const fetchStudents =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(

            "http://localhost:5000/api/admin/students",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setStudents(
          res.data.students
        );

      } catch (error) {

        console.log(error);
      }
    };


  // ================= DELETE USER =================
  const handleDelete =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(

          `http://localhost:5000/api/admin/user/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchStudents();

      } catch (error) {

        console.log(error);
      }
    };


  // ================= FILTER =================
  const filteredStudents =
    students.filter((student) =>

      (student?.name || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  return (

    <AdminLayout>

      <div style={styles.page}>


        <h1 style={styles.heading}>
          👨‍🎓 Manage Students
        </h1>


        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={styles.search}
        />


        {/* STUDENT GRID */}
        <div style={styles.studentGrid}>

          {filteredStudents.map((student) => (

            <div
              key={student._id}
              style={styles.studentCard}
            >

              <div style={styles.avatar}>
                {student.name?.charAt(0)}
              </div>

              <h3>
                {student.name}
              </h3>

              <p>
                📧 {student.email}
              </p>

              <p>
                📚 Courses:
                {" "}
                {student.enrolledCourses?.length || 0}
              </p>

              <div style={styles.buttonRow}>

                <button
                  style={styles.viewBtn}
                  onClick={() => {

                    const courses =
                      student.enrolledCourses
                        ?.map(
                          c => c.title
                        )
                        .join("\n");

                    alert(
                      courses ||
                      "No courses enrolled"
                    );

                  }}
                >
                  View Details
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    handleDelete(student._id)
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

export default ManageStudents;


// ================= STYLES =================
const styles = {

  page: {
    color: "white",
  },

  heading: {
    fontSize: "40px",
    marginBottom: "25px",
  },

  search: {

    width: "100%",

    padding: "16px",

    borderRadius: "12px",

    border: "none",

    marginBottom: "25px",

    fontSize: "16px",

    background: "#1e293b",

    color: "white",
  },

  studentGrid: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fill,minmax(320px,1fr))",

    gap: "25px",
  },

  studentCard: {

    background: "#0f172a",

    padding: "25px",

    borderRadius: "20px",

    boxShadow:
      "0 10px 25px rgba(0,0,0,0.2)",

    color: "white",

    transition: "0.3s",
  },

  avatar: {

    width: "70px",

    height: "70px",

    borderRadius: "50%",

    background:
      "linear-gradient(135deg,#8b5cf6,#ec4899)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "28px",

    fontWeight: "bold",

    marginBottom: "15px",
  },

  buttonRow: {

    display: "flex",

    gap: "10px",

    marginTop: "15px",
  },

  viewBtn: {

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