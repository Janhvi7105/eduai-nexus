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

      student.name
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


        {/* TABLE */}
        <div style={styles.tableContainer}>


          <table style={styles.table}>


            <thead>

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Role</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>


              {filteredStudents.map(
                (student) => (

                  <tr key={student._id}>

                    <td>
                      {student.name}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {student.role}
                    </td>

                    <td>

                      <button

                        style={styles.deleteBtn}

                        onClick={() =>
                          handleDelete(
                            student._id
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

  tableContainer: {

    overflowX: "auto",
  },

  table: {

    width: "100%",

    borderCollapse:
      "collapse",

    background: "#0f172a",

    borderRadius: "20px",

    overflow: "hidden",
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