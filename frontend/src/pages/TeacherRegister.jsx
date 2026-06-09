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
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters ❗");
      return;
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      alert("Please enter a valid 10-digit phone number ❗");
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

      console.log("TEACHER REGISTERED:", user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("🎉 Instructor Registered Successfully!");

      navigate("/teacher-onboarding", { replace: true });

    } catch (err) {
      console.error("REGISTER ERROR:", err);

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
      {/* Background Pattern */}
      <div style={styles.bgPattern}>
        <div style={styles.bgShape1}></div>
        <div style={styles.bgShape2}></div>
        <div style={styles.bgShape3}></div>
        <div style={styles.bgShape4}></div>
      </div>

      {/* Floating Particles */}
      <div style={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{ ...styles.particle, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s` }}></div>
        ))}
      </div>

      <div style={styles.card}>
        {/* Logo / Brand */}
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🎓</div>
          <div style={styles.logoText}>EduAI Nexus</div>
        </div>

        <h2 style={styles.title}>Become an Instructor 🚀</h2>
        <p style={styles.subtitle}>Share your knowledge with the world</p>

        <div style={styles.form}>
          {/* Name Input */}
          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>👤</div>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...styles.input,
                borderColor: focusedField === 'name' ? '#667eea' : '#e2e8f0',
                boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(102, 126, 234, 0.1)' : 'none',
              }}
            />
          </div>

          {/* Email Input */}
          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>📧</div>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...styles.input,
                borderColor: focusedField === 'email' ? '#667eea' : '#e2e8f0',
                boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(102, 126, 234, 0.1)' : 'none',
              }}
            />
          </div>

          {/* Phone Input */}
          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>📞</div>
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...styles.input,
                borderColor: focusedField === 'phone' ? '#667eea' : '#e2e8f0',
                boxShadow: focusedField === 'phone' ? '0 0 0 3px rgba(102, 126, 234, 0.1)' : 'none',
              }}
            />
          </div>

          {/* Password Input */}
          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>🔒</div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
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

          <div style={styles.passwordHint}>Password must be at least 6 characters</div>

          {/* Submit Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            style={styles.btn}
          >
            {loading ? (
              <span style={styles.btnLoader}>
                <span style={styles.spinner}></span>
                Registering...
              </span>
            ) : (
              "Start Teaching →"
            )}
          </button>

          {/* Divider */}
          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>Already have an account?</span>
            <span style={styles.dividerLine}></span>
          </div>

          {/* Login Link */}
          <button
            onClick={() => navigate("/login")}
            style={styles.loginBtn}
          >
            Sign In Instead
          </button>
        </div>

        {/* Trust Badge */}
        <div style={styles.trustBadge}>
          <span>✅</span>
          <span>Free to join</span>
          <span>•</span>
          <span>💳 No setup fee</span>
          <span>•</span>
          <span>🎓 Earn 70% revenue</span>
        </div>
      </div>
    </div>
  );
}

export default TeacherRegister;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
  },
  bgPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
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
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent)",
    animation: "float 7s ease-in-out infinite reverse",
  },
  particles: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
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
    width: "480px",
    maxWidth: "90%",
    background: "#fff",
    borderRadius: "32px",
    padding: "48px 40px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    position: "relative",
    zIndex: 1,
    animation: "fadeInUp 0.6s ease-out",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "32px",
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
    color: "#1e293b",
    textAlign: "center",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    textAlign: "center",
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
  passwordHint: {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "-8px",
  },
  btn: {
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "8px",
  },
  btnLoader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    margin: "8px 0",
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
  loginBtn: {
    padding: "12px",
    borderRadius: "14px",
    border: "2px solid #e2e8f0",
    background: "#fff",
    color: "#667eea",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  trustBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0",
    fontSize: "11px",
    color: "#94a3b8",
    flexWrap: "wrap",
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
  
  input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  .login-btn:hover {
    background: #f8fafc;
    border-color: #667eea;
  }
`;
document.head.appendChild(styleSheet);