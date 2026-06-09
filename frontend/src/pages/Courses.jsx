import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ================= FETCH COURSES =================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/courses");
        setCourses(res.data.courses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // ================= ENROLL =================
  const handleEnroll = (course) => {
    if (token) {
      navigate("/payment", { state: { course } });
      return;
    }
    setSelectedCourse(course);
    setShowModal(true);
    setName("");
    setEmail("");
    setPhone("");
    setOtp("");
    setShowOtpInput(false);
  };

  // ================= SEND OTP =================
  const sendOTP = async () => {
    if (!name) {
      alert("Please enter your name ❗");
      return;
    }
    if (!email) {
      alert("Please enter your email ❗");
      return;
    }
    if (!phone) {
      alert("Please enter your phone number ❗");
      return;
    }
    try {
      setSendingOtp(true);
      await axios.post("/api/auth/send-otp", { email });
      alert("✅ OTP sent successfully!");
      setShowOtpInput(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOTP = async () => {
    if (!otp) {
      alert("Please enter OTP ❗");
      return;
    }
    if (!selectedCourse?._id) {
      alert("Course not selected ❗");
      return;
    }
    try {
      setVerifyingOtp(true);
      const res = await axios.post("/api/auth/verify-otp", {
        name, email, phone, otp,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("✅ Registration successful!");
      setShowModal(false);
      navigate("/payment", {
        state: { course: selectedCourse, name, email, phone },
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ OTP verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Get course icon based on title
  const getCourseIcon = (title) => {
    const lower = title?.toLowerCase() || "";
    if (lower.includes("ai") || lower.includes("machine")) return "🤖";
    if (lower.includes("react") || lower.includes("web") || lower.includes("full")) return "💻";
    if (lower.includes("data") || lower.includes("analytics")) return "📊";
    if (lower.includes("java")) return "☕";
    if (lower.includes("python")) return "🐍";
    if (lower.includes("design")) return "🎨";
    return "📚";
  };

  // Loading skeleton
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}></div>
        <p style={styles.loadingText}>Loading amazing courses...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroBadge}>✨ 500+ Courses Available</div>
        <h1 style={styles.heroTitle}>
          Explore Our <span style={styles.gradientText}>Premium Courses</span>
        </h1>
        <p style={styles.heroSubtitle}>
          Discover high-quality courses taught by industry experts and take your skills to the next level
        </p>
        <div style={styles.heroStats}>
          <div style={styles.heroStat}>
            <span style={styles.heroStatValue}>50+</span>
            <span style={styles.heroStatLabel}>Expert Instructors</span>
          </div>
          <div style={styles.heroStat}>
            <span style={styles.heroStatValue}>200+</span>
            <span style={styles.heroStatLabel}>Live Courses</span>
          </div>
          <div style={styles.heroStat}>
            <span style={styles.heroStatValue}>10k+</span>
            <span style={styles.heroStatLabel}>Active Students</span>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div style={styles.grid}>
        {courses.map((course, index) => (
          <div key={course._id} style={{ ...styles.card, animationDelay: `${index * 0.05}s` }}>
            <div style={styles.cardImage}>
              <span style={styles.cardEmoji}>{getCourseIcon(course.title)}</span>
              <span style={styles.cardBadge}>
                {course.level || "All Levels"}
              </span>
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.courseTitle}>{course.title}</h3>
              <div style={styles.instructorInfo}>
                <div style={styles.instructorAvatar}>
                  {course.instructor?.name?.charAt(0) || "E"}
                </div>
                <span style={styles.instructorName}>
                  {course.instructor?.name || "Expert Instructor"}
                </span>
              </div>
              <p style={styles.description}>
                {course.description?.substring(0, 100) || "Comprehensive course covering all essential topics with hands-on projects."}
                {course.description?.length > 100 ? "..." : ""}
              </p>
              <div style={styles.courseMeta}>
                <span style={styles.metaItem}>📚 {Math.floor(Math.random() * 30) + 15} Lessons</span>
                <span style={styles.metaItem}>⏱️ {Math.floor(Math.random() * 40) + 20} Hours</span>
                <span style={styles.metaItem}>⭐ 4.8 ({Math.floor(Math.random() * 500) + 100} reviews)</span>
              </div>
              <div style={styles.cardFooter}>
                <div>
                  <span style={styles.oldPrice}>₹{Number(course.price) + 2000}</span>
                  <div style={styles.priceContainer}>
                    <span style={styles.currency}>₹</span>
                    <span style={styles.price}>{course.price}</span>
                  </div>
                </div>
                <button
                  style={styles.enrollBtn}
                  onClick={() => handleEnroll(course)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}
                >
                  {token ? "🎬 Watch Now" : "🚀 Enroll Now"}
                  <span style={styles.btnArrow}>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
          <p style={styles.ctaText}>Join thousands of students and start learning today</p>
          <button style={styles.ctaButton} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Browse All Courses →
          </button>
        </div>
      </div>

      {/* OTP MODAL */}
      {showModal && (
        <div style={modal.overlay} onClick={() => setShowModal(false)}>
          <div style={modal.box} onClick={(e) => e.stopPropagation()}>
            <div style={modal.header}>
              <h3 style={modal.title}>{!showOtpInput ? "✨ Complete Registration" : "🔐 Verify OTP"}</h3>
              <button style={modal.closeBtn} onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={modal.body}>
              {!showOtpInput ? (
                <>
                  <div style={modal.inputGroup}>
                    <label style={modal.label}>Full Name</label>
                    <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} style={modal.input} />
                  </div>
                  <div style={modal.inputGroup}>
                    <label style={modal.label}>Email Address</label>
                    <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={modal.input} />
                  </div>
                  <div style={modal.inputGroup}>
                    <label style={modal.label}>Phone Number</label>
                    <input type="tel" placeholder="+91 9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} style={modal.input} />
                  </div>
                  <button onClick={sendOTP} disabled={sendingOtp} style={modal.submitBtn}>
                    {sendingOtp ? <span style={modal.btnLoader}></span> : "Send OTP →"}
                  </button>
                </>
              ) : (
                <>
                  <div style={modal.otpInfo}>
                    <p>OTP sent to: <strong>{email}</strong></p>
                    <p style={modal.otpHint}>Please check your inbox</p>
                  </div>
                  <div style={modal.inputGroup}>
                    <label style={modal.label}>Enter OTP</label>
                    <input type="text" placeholder="6-digit code" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" style={modal.input} />
                  </div>
                  <button onClick={verifyOTP} disabled={verifyingOtp} style={modal.submitBtn}>
                    {verifyingOtp ? <span style={modal.btnLoader}></span> : "Verify & Continue →"}
                  </button>
                  <button onClick={() => { setShowOtpInput(false); setOtp(""); }} style={modal.backBtn}>← Back</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    marginTop: "20px",
    color: "white",
    fontSize: "18px",
    fontWeight: "500",
  },

  heroSection: {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    padding: "80px 20px",
    textAlign: "center",
  },

  heroBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.1)",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#a78bfa",
    marginBottom: "20px",
  },

  heroTitle: {
    fontSize: "52px",
    fontWeight: "800",
    marginBottom: "20px",
    color: "white",
    letterSpacing: "-0.02em",
  },

  gradientText: {
    background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroSubtitle: {
    fontSize: "18px",
    color: "#94a3b8",
    maxWidth: "600px",
    margin: "0 auto 40px",
  },

  heroStats: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
  },

  heroStat: {
    textAlign: "center",
  },

  heroStatValue: {
    display: "block",
    fontSize: "28px",
    fontWeight: "700",
    color: "white",
  },

  heroStatLabel: {
    fontSize: "13px",
    color: "#94a3b8",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gap: "30px",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "60px 20px",
  },

  card: {
    background: "white",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
    transition: "all 0.3s ease",
    animation: "fadeInUp 0.5s ease-out forwards",
    opacity: 0,
    transform: "translateY(20px)",
  },

  cardImage: {
    height: "180px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  cardEmoji: {
    fontSize: "64px",
    filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.2))",
  },

  cardBadge: {
    position: "absolute",
    top: "16px",
    left: "16px",
    background: "rgba(255,255,255,0.9)",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#4f46e5",
  },

  cardContent: {
    padding: "24px",
  },

  courseTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#1e293b",
  },

  instructorInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },

  instructorAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "14px",
  },

  instructorName: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
  },

  description: {
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "16px",
    fontSize: "14px",
  },

  courseMeta: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  metaItem: {
    fontSize: "12px",
    color: "#64748b",
    background: "#f1f5f9",
    padding: "4px 10px",
    borderRadius: "20px",
  },

  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "16px",
    borderTop: "1px solid #e2e8f0",
  },

  oldPrice: {
    fontSize: "14px",
    color: "#94a3b8",
    textDecoration: "line-through",
    display: "block",
  },

  priceContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: "2px",
  },

  currency: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#3b82f6",
  },

  price: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#3b82f6",
  },

  enrollBtn: {
    padding: "10px 20px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },

  btnArrow: {
    transition: "transform 0.3s ease",
  },

  ctaSection: {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    margin: "20px",
    borderRadius: "24px",
    padding: "60px 20px",
    textAlign: "center",
  },

  ctaContent: {
    maxWidth: "500px",
    margin: "0 auto",
  },

  ctaTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "white",
    marginBottom: "12px",
  },

  ctaText: {
    fontSize: "16px",
    color: "#94a3b8",
    marginBottom: "24px",
  },

  ctaButton: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "14px 32px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

const modal = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  box: {
    background: "white",
    borderRadius: "20px",
    width: "450px",
    maxWidth: "90%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    overflow: "hidden",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
  },

  title: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
  },

  closeBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  body: {
    padding: "24px",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#334155",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },

  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  backBtn: {
    width: "100%",
    padding: "12px",
    background: "#f1f5f9",
    color: "#475569",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "12px",
  },

  otpInfo: {
    textAlign: "center",
    marginBottom: "24px",
    padding: "12px",
    background: "#f0fdf4",
    borderRadius: "12px",
  },

  otpHint: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "4px",
  },

  btnLoader: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    display: "inline-block",
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
  }
  .card:hover img {
    transform: scale(1.05);
  }
  input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  button:hover {
    transform: translateY(-2px);
  }
`;
document.head.appendChild(styleSheet);