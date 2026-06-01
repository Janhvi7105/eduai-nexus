import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminLayout
from "../components/admin/AdminLayout";


function ManageTeachers() {

  const [teachers, setTeachers] =
    useState([]);

  const [search, setSearch] =
    useState("");


  // ================= FETCH TEACHERS =================
  useEffect(() => {

    fetchTeachers();

  }, []);


  const fetchTeachers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(

            "http://localhost:5000/api/admin/teachers",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTeachers(
          res.data.teachers
        );

      } catch (error) {

        console.log(error);
      }
    };


  // ================= DELETE TEACHER =================
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

        fetchTeachers();

      } catch (error) {

        console.log(error);
      }
    };


  // ================= SEARCH FILTER =================
  const filteredTeachers =
    teachers.filter((teacher) =>

      teacher.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  return (

    <AdminLayout>

      <div style={styles.page}>


        {/* ================= HEADER ================= */}
        <div style={styles.header}>


          <div>

            <h1 style={styles.heading}>
              👨‍🏫 Manage Teachers
            </h1>

            <p style={styles.subtext}>
              Manage instructors on EduAI Nexus
            </p>

          </div>

        </div>


        {/* ================= SEARCH ================= */}
        <input
          type="text"
          placeholder="Search teachers..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={styles.search}
        />


        {/* ================= TABLE ================= */}
        <div style={styles.tableContainer}>


          <table style={styles.table}>


            <thead>

              <tr>

                <th style={styles.th}>
                  Name
                </th>

                <th style={styles.th}>
                  Email
                </th>

                <th style={styles.th}>
                  Role
                </th>

                <th style={styles.th}>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>


              {filteredTeachers.map(
                (teacher) => (

                  <tr
                    key={teacher._id}
                    style={styles.tr}
                  >

                    <td style={styles.td}>
                      {teacher.name}
                    </td>

                    <td style={styles.td}>
                      {teacher.email}
                    </td>

                    <td style={styles.td}>
                      {teacher.role}
                    </td>

                    <td style={styles.td}>

                      <button

                        style={styles.deleteBtn}

                        onClick={() =>
                          handleDelete(
                            teacher._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default ManageTeachers;


// ================= STYLES =================
const styles = {

  page: {
    color: "white",
  },

  header: {
    marginBottom: "30px",
  },

  heading: {

    fontSize: "42px",

    fontWeight: "800",

    marginBottom: "10px",
  },

  subtext: {

    color: "#94a3b8",

    fontSize: "18px",
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
  },

  tableContainer: {

    overflowX: "auto",

    background: "#0f172a",

    borderRadius: "22px",

    border:
      "1px solid #1e293b",

    boxShadow:
      "0 10px 25px rgba(0,0,0,0.3)",
  },

  table: {

    width: "100%",

    borderCollapse:
      "collapse",
  },

  th: {

    textAlign: "left",

    padding: "18px",

    background: "#1e293b",

    color: "#cbd5e1",

    fontSize: "16px",
  },

  tr: {

    borderBottom:
      "1px solid #1e293b",
  },

  td: {

    padding: "18px",

    color: "#f8fafc",

    fontSize: "16px",
  },

  deleteBtn: {

    background:
      "linear-gradient(135deg,#ef4444,#dc2626)",

    color: "white",

    border: "none",

    padding: "10px 18px",

    borderRadius: "10px",

    cursor: "pointer",

    fontWeight: "600",
  },
};