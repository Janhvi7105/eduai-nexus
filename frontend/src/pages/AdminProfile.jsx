import { useState } from "react";

function AdminProfile() {

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [name, setName] =
    useState(user.name || "");

  const [email, setEmail] =
    useState(user.email || "");

  const [password, setPassword] =
    useState("");

  const updateProfile = () => {

    const updatedUser = {
      ...user,
      name,
      email,
      password: password || user.password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile Updated Successfully");
    
    // Clear password field after update
    setPassword("");
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        {/* Avatar */}
        <div style={styles.avatar}>
          {name ? name[0].toUpperCase() : "A"}
        </div>

        <h1 style={styles.heading}>
          Admin Profile
        </h1>

        {/* Name */}
        <input
          style={styles.input}
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Full Name"
        />

        {/* Email */}
        <input
          style={styles.input}
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
          style={styles.input}
        />

        <button
          style={styles.primaryBtn}
          onClick={updateProfile}
        >
          Update Profile
        </button>

      </div>

    </div>
  );
}

export default AdminProfile;

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#0f172a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  card: {
    width: "500px",
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "24px",
    padding: "35px",
    boxShadow:
      "0 20px 50px rgba(0,0,0,0.4)",
  },

  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#8b5cf6,#ec4899)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "42px",
    fontWeight: "bold",
    margin: "0 auto 20px",
  },

  heading: {
    color: "white",
    textAlign: "center",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  primaryBtn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  },
};