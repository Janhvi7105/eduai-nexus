import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminLayout
from "../components/admin/AdminLayout";


function PendingTeachers() {

  const [teachers, setTeachers] =
    useState([]);


  // ================= FETCH PENDING TEACHERS =================
  useEffect(() => {

    fetchPendingTeachers();

  }, []);


  const fetchPendingTeachers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(

            "http://localhost:5000/api/admin/pending-teachers",

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


  // ================= APPROVE TEACHER =================
  const handleApprove =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(

          `http://localhost:5000/api/admin/approve-teacher/${id}`,

          {},

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchPendingTeachers();

      } catch (error) {

        console.log(error);
      }
    };


  // ================= DELETE REQUEST =================
  const handleReject =
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

        fetchPendingTeachers();

      } catch (error) {

        console.log(error);
      }
    };


  return (

    <AdminLayout>

      <div style={styles.page}>


        {/* ================= HEADER ================= */}
        <div style={styles.header}>


          <h1 style={styles.heading}>
            👨‍🏫 Pending Instructor Requests
          </h1>


          <p style={styles.subtext}>
            Review and approve instructor applications
          </p>

        </div>


        {/* ================= EMPTY STATE ================= */}
        {teachers.length === 0 && (

          <div style={styles.emptyBox}>

            <h2>
              🎉 No Pending Requests
            </h2>

            <p>
              All instructor applications
              are reviewed.
            </p>

          </div>
        )}


        {/* ================= TEACHERS GRID ================= */}
        <div style={styles.grid}>


          {teachers.map((teacher) => (

            <div
              key={teacher._id}
              style={styles.card}
            >

              {/* AVATAR */}
              <div style={styles.avatar}>
                {
                  teacher.name?.[0]
                    ?.toUpperCase()
                }
              </div>


              {/* INFO */}
              <h2 style={styles.name}>
                {teacher.name}
              </h2>

              <p style={styles.email}>
                {teacher.email}
              </p>

              <p style={styles.role}>
                Role:
                {" "}
                {teacher.role}
              </p>


              {/* BUTTONS */}
              <div style={styles.buttonRow}>


                {/* APPROVE */}
                <button

                  style={styles.approveBtn}

                  onClick={() =>
                    handleApprove(
                      teacher._id
                    )
                  }
                >
                  ✅ Approve
                </button>


                {/* REJECT */}
                <button

                  style={styles.rejectBtn}

                  onClick={() =>
                    handleReject(
                      teacher._id
                    )
                  }
                >
                  ❌ Reject
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </AdminLayout>
  );
}

export default PendingTeachers;


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

  emptyBox: {

    background: "#0f172a",

    border:
      "1px solid #1e293b",

    padding: "40px",

    borderRadius: "22px",

    textAlign: "center",

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

    border:
      "1px solid #1e293b",

    borderRadius: "24px",

    padding: "30px",

    textAlign: "center",

    boxShadow:
      "0 10px 25px rgba(0,0,0,0.3)",
  },

  avatar: {

    width: "80px",

    height: "80px",

    borderRadius: "50%",

    background:
      "linear-gradient(135deg,#8b5cf6,#ec4899)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    color: "white",

    fontSize: "32px",

    fontWeight: "800",

    margin:
      "0 auto 20px auto",
  },

  name: {

    fontSize: "24px",

    fontWeight: "700",

    marginBottom: "10px",
  },

  email: {

    color: "#cbd5e1",

    marginBottom: "10px",
  },

  role: {

    color: "#94a3b8",

    marginBottom: "25px",
  },

  buttonRow: {

    display: "flex",

    gap: "14px",

    justifyContent: "center",
  },

  approveBtn: {

    background:
      "linear-gradient(135deg,#10b981,#059669)",

    color: "white",

    border: "none",

    padding: "12px 20px",

    borderRadius: "12px",

    cursor: "pointer",

    fontWeight: "700",
  },

  rejectBtn: {

    background:
      "linear-gradient(135deg,#ef4444,#dc2626)",

    color: "white",

    border: "none",

    padding: "12px 20px",

    borderRadius: "12px",

    cursor: "pointer",

    fontWeight: "700",
  },
};