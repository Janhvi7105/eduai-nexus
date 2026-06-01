import {
  useState,
} from "react";

import Layout
from "../components/common/Layout";

function StudentProfile() {

  // ================= STUDENT STATE =================
  const [student, setStudent] =
    useState({

      name: "Janhvi Ghuikar",

      email:
        "janhvighuikar@gmail.com",

      mobile:
        "9876543210",

      education:
        "B.E Computer Engineering",

      goal:
        "Become Full Stack Developer",

      interests:
        "React, Node.js, AI",
    });


  // ================= HANDLE INPUT =================
  const handleChange =
    (e) => {

      setStudent({

        ...student,

        [e.target.name]:
          e.target.value,
      });
    };


  // ================= UPDATE PROFILE =================
  const handleUpdate =
    () => {

      alert(
        "✅ Profile Updated Successfully"
      );
    };


  return (

    <Layout>

      <div style={styles.page}>


        {/* ================= HEADER ================= */}
        <div style={styles.header}>


          {/* AVATAR */}
          <div style={styles.avatar}>

            {
              student.name[0]
                .toUpperCase()
            }

          </div>


          <div>

            <h1 style={styles.heading}>
              👨‍🎓 Student Profile
            </h1>

            <p style={styles.subtext}>
              Update your personal information
            </p>

          </div>

        </div>


        {/* ================= PROFILE CARD ================= */}
        <div style={styles.card}>


          {/* NAME */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              style={styles.input}
            />

          </div>


          {/* EMAIL */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              style={styles.input}
            />

          </div>


          {/* MOBILE */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Mobile Number
            </label>

            <input
              type="text"
              name="mobile"
              value={student.mobile}
              onChange={handleChange}
              style={styles.input}
            />

          </div>


          {/* EDUCATION */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Education
            </label>

            <input
              type="text"
              name="education"
              value={student.education}
              onChange={handleChange}
              style={styles.input}
            />

          </div>


          {/* GOAL */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Learning Goal
            </label>

            <input
              type="text"
              name="goal"
              value={student.goal}
              onChange={handleChange}
              style={styles.input}
            />

          </div>


          {/* INTERESTS */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Interests
            </label>

            <input
              type="text"
              name="interests"
              value={student.interests}
              onChange={handleChange}
              style={styles.input}
            />

          </div>


          {/* UPDATE BUTTON */}
          <button
            style={styles.updateBtn}
            onClick={handleUpdate}
          >
            ✅ Update Profile
          </button>

        </div>

      </div>

    </Layout>
  );
}

export default StudentProfile;


// ================= STYLES =================
const styles = {

  page: {
    padding: "30px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "35px",
  },

  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",

    background:
      "linear-gradient(135deg,#8b5cf6,#ec4899)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "40px",

    fontWeight: "bold",

    color: "white",
  },

  heading: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  subtext: {
    color: "#94a3b8",
    fontSize: "18px",
  },

  card: {
    background: "#1e293b",
    padding: "35px",
    borderRadius: "20px",
  },

  inputGroup: {
    marginBottom: "24px",
  },

  label: {
    display: "block",
    marginBottom: "10px",
    fontSize: "17px",
    color: "#cbd5e1",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "18px",
    borderRadius: "14px",
    border: "2px solid #334155",
    outline: "none",
    background: "#0f172a",
    color: "white",
    fontSize: "17px",
    boxSizing: "border-box",
  },

  updateBtn: {

    width: "100%",

    padding: "18px",

    borderRadius: "14px",

    border: "none",

    cursor: "pointer",

    color: "white",

    fontWeight: "700",

    fontSize: "18px",

    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",

    marginTop: "10px",
  },
};