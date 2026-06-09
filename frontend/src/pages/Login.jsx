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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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
          // ✅ Check if teacher is approved
          if (!user.isApproved) {
            navigate("/", { replace: true });
            return;
          }
          // ✅ IF ONBOARDING DONE → DASHBOARD
          if (user.onboarding?.teaching) {
            navigate("/teacher-dashboard", { replace: true });
          } else {
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
      
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", form.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // ================= REDIRECT =================
      if (user.role === "teacher") {
        if (!user.isApproved) {
          alert("Waiting for Admin Approval ⏳");
          navigate("/", { replace: true });
          return;
        }
        if (user.onboarding?.teaching) {
          navigate("/teacher-dashboard", { replace: true });
        } else {
          navigate("/teacher-onboarding", { replace: true });
        }
        return;
      }

      if (user.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
        return;
      }

      navigate("/student-dashboard", { replace: true });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    alert("Password reset link will be sent to your email 📧");
    // You can implement actual forgot password logic here
  };

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setForm(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div style={styles.page}>
      {/* Animated Background */}
      <div style={styles.bgAnimation}>
        <div style={styles.bgShape1}></div>
        <div style={styles.bgShape2}></div>
        <div style={styles.bgShape3}></div>
        <div style={styles.bgShape4}></div>
        <div style={styles.bgShape5}></div>
      </div>

      {/* Floating Particles */}
      <div style={styles.particles}>
        {[...Array(30)].map((_, i) => (
          <div key={i} style={{ ...styles.particle, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s` }}></div>
        ))}
      </div>

      <div style={styles.card}>
        {/* Logo / Brand */}
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🎓</div>
          <div style={styles.logoText}>EduAI Nexus</div>
        </div>

        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to continue your learning journey</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Input */}
          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>📧</div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              autoFocus
              style={{
                ...styles.input,
                borderColor: focusedField === 'email' ? '#667eea' : '#e2e8f0',
                boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(102, 126, 234, 0.1)' : 'none',
              }}
            />
          </div>

          {/* Password Input */}
          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>🔒</div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
              style={{
                ...styles.input,
                borderColor: focusedField === 'password' ? '#667eea' : '#e2e8f0',
                boxShadow: focusedField === 'password' ? '0 0 0 3px rgba(102, 126, 234, 0.1)' : 'none',
              }}
            />
            <button
              type="button"
              style={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div style={styles.options}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              style={styles.forgotButton}
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? (
              <span style={styles.loaderWrapper}>
                <span style={styles.spinner}></span>
                Logging in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>or continue with</span>
          <span style={styles.dividerLine}></span>
        </div>

        {/* Social Login */}
        <div style={styles.socialButtons}>
          <button style={styles.socialBtn}>
            <span style={styles.socialIcon}>G</span>
            Google
          </button>
          <button style={styles.socialBtn}>
            <span style={styles.socialIcon}>𝕏</span>
            X (Twitter)
          </button>
          <button style={styles.socialBtn}>
            <span style={styles.socialIcon}>📘</span>
            Facebook
          </button>
        </div>

        <p style={styles.footer}>
          Contact admin to create your account
        </p>
      </div>
    </div>
  );
}

export default Login;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  bgAnimation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    zIndex: 0,
  },
  bgShape1: {
    position: "absolute",
    top: "-20%",
    right: "-10%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent)",
    animation: "float 8s ease-in-out infinite",
  },
  bgShape2: {
    position: "absolute",
    bottom: "-20%",
    left: "-10%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent)",
    animation: "float 10s ease-in-out infinite reverse",
  },
  bgShape3: {
    position: "absolute",
    top: "30%",
    left: "20%",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.05), transparent)",
    animation: "float 6s ease-in-out infinite",
  },
  bgShape4: {
    position: "absolute",
    bottom: "20%",
    right: "15%",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent)",
    animation: "float 7s ease-in-out infinite reverse",
  },
  bgShape5: {
    position: "absolute",
    top: "50%",
    right: "30%",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.04), transparent)",
    animation: "float 5s ease-in-out infinite",
  },
  particles: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    zIndex: 0,
  },
  particle: {
    position: "absolute",
    bottom: "-10px",
    width: "3px",
    height: "3px",
    background: "rgba(255,255,255,0.4)",
    borderRadius: "50%",
    animation: "floatUp linear infinite",
  },
  card: {
    position: "relative",
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(10px)",
    padding: "48px 40px",
    borderRadius: "32px",
    width: "440px",
    maxWidth: "90%",
    textAlign: "center",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    zIndex: 1,
    transition: "transform 0.3s ease",
    animation: "fadeInUp 0.6s ease-out",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
  },
  logoIcon: {
    fontSize: "32px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    fontSize: "18px",
    opacity: 0.6,
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "14px 14px 14px 45px",
    borderRadius: "14px",
    border: "2px solid #e2e8f0",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },
  passwordToggle: {
    position: "absolute",
    right: "14px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    opacity: 0.6,
    padding: 0,
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "4px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#6b7280",
    cursor: "pointer",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
    accentColor: "#667eea",
  },
  forgotButton: {
    fontSize: "13px",
    color: "#667eea",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.2s ease",
    padding: 0,
  },
  button: {
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "8px",
  },
  loaderWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    margin: "28px 0 20px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e2e8f0",
  },
  dividerText: {
    fontSize: "12px",
    color: "#94a3b8",
  },
  socialButtons: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
  },
  socialBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    color: "#4b5563",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease",
  },
  socialIcon: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  footer: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#9ca3af",
    textAlign: "center",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(-20px) translateX(10px);
    }
    50% {
      transform: translateY(10px) translateX(-10px);
    }
    75% {
      transform: translateY(-10px) translateX(20px);
    }
  }
  
  @keyframes floatUp {
    0% {
      transform: translateY(100vh) scale(0);
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(-20vh) scale(1);
      opacity: 0;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  .social-btn:hover {
    background: #f8fafc;
    border-color: #667eea;
  }
  
  input:hover {
    border-color: #cbd5e1;
  }
  
  .forgot-button:hover {
    color: #5b21b6;
    text-decoration: underline;
  }
`;
document.head.appendChild(styleSheet);