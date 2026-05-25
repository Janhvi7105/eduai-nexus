import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= AUTO REDIRECT =================
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user) {

        // 🚫 Prevent loop
        if (location.pathname === "/teacher-onboarding") return;

        // ================= TEACHER FLOW =================
        if (user.role === "teacher") {

          // ✅ IF ONBOARDING DONE → DASHBOARD
          if (user.onboarding?.teaching) {
            navigate("/teacher-dashboard", { replace: true });
          } 
          // ❌ IF NOT DONE → ONBOARDING
          else {
            navigate("/teacher-onboarding", { replace: true });
          }

          return;
        }

        // ================= ADMIN =================
        if (user.role === "admin") {
          navigate("/admin-dashboard", { replace: true });
          return;
        }

        // ================= STUDENT =================
        navigate("/student-dashboard", { replace: true });
      }

    } catch (err) {
      console.error("LocalStorage error:", err);
      localStorage.clear();
    }
  }, [navigate, location.pathname]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= HANDLE LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields ⚠️");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", form);

      const { user, token } = res.data;

      // ✅ STORE
      localStorage.setItem("token", token);
      localStorage.setItem("email", form.email);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful ✅");

      // ================= REDIRECT =================

      // TEACHER
      if (user.role === "teacher") {

        if (user.onboarding?.teaching) {
          navigate("/teacher-dashboard", { replace: true });
        } else {
          navigate("/teacher-onboarding", { replace: true });
        }

        return;
      }

      // ADMIN
      if (user.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
        return;
      }

      // STUDENT
      navigate("/student-dashboard", { replace: true });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Welcome Back</h2>
        <p style={styles.subtitle}>Login to EduAI Nexus</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            autoFocus
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.footer}>
          Contact admin to create your account
        </p>
      </div>
    </div>
  );
}

export default Login;


// ================= STYLES =================
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI",
  },
  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(15px)",
    padding: "40px 30px",
    borderRadius: "15px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    color: "#fff",
  },
  title: {
    fontSize: "26px",
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "25px",
    opacity: 0.8,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: {
    marginTop: "15px",
    fontSize: "14px",
  },
};