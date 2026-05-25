import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= REGISTER TEACHER =================
  const handleRegister = async () => {
    // ✅ validation
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.phone.trim()
    ) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/register-teacher", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim(),
      });

      const { user, token } = res.data;

      // ✅ store auth
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("TEACHER REGISTERED:", user);

      alert("🎉 Instructor Registered Successfully!");

      // ✅ redirect to onboarding
      navigate("/teacher-onboarding", { replace: true });

    } catch (err) {
      console.error("REGISTER ERROR:", err);

      // 🔥 better error message
      if (err.response?.data?.message === "User already exists ❌") {
        alert("⚠️ Email already registered. Please use different email.");
      } else {
        alert(err.response?.data?.message || "Registration failed ❌");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🚀 Become Instructor</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          style={styles.btn}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p style={styles.loginText}>
          Already have account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={styles.link}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default TeacherRegister;

// ================= STYLES =================
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6366f1, #ec4899)",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  btn: {
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#10b981",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  loginText: {
    textAlign: "center",
    fontSize: "14px",
  },

  link: {
    color: "blue",
    cursor: "pointer",
  },
};