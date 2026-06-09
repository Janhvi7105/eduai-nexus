import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import { 
  BookOpen, 
  Trophy, 
  PlayCircle, 
  TrendingUp,
  Sparkles,
  Brain,
  ChevronRight
} from "lucide-react";
import Chatbot from "../components/student/Chatbot";

function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalMockTests: 0,
    progress: 0,
    totalCertificates: 0,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/student-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <Layout>
      <div style={{ ...styles.page, padding: isMobile ? "15px" : "30px" }}>
        
        {/* Animated Background */}
        <div style={styles.bgGradient}></div>
        
        {/* Welcome Section */}
        <div style={styles.topBar}>
          <div>
            <div style={styles.greetingBadge}>
              <Sparkles size={16} color="#fbbf24" />
              <span>{getGreeting()}</span>
            </div>
            <h1 style={{ ...styles.welcome, fontSize: isMobile ? "28px" : "42px" }}>
              Welcome Back, <span style={styles.userName}>{user?.name?.split(" ")[0] || "Student"}!</span>
            </h1>
            <p style={styles.subtitle}>
              Ready to continue your learning journey? You're making great progress! 🚀
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ 
          ...styles.hero, 
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "20px" : "0",
          padding: isMobile ? "25px" : "40px",
          textAlign: isMobile ? "center" : "left",
        }}>
          <div>
            <h2 style={{ ...styles.heroTitle, fontSize: isMobile ? "28px" : "42px" }}>
              {stats.progress >= 70 ? "🏆 Almost There!" : stats.progress >= 40 ? "📚 Great Progress!" : "🚀 Let's Start Learning!"}
            </h2>
            <p style={{ ...styles.heroText, fontSize: isMobile ? "14px" : "18px" }}>
              {stats.progress >= 70 
                ? "You're crushing it! Complete your remaining courses to earn certificates."
                : stats.progress >= 40
                ? "You're on fire! Keep up the momentum and complete more courses."
                : "Every expert was once a beginner. Start your first course today!"}
            </p>
            <div style={styles.progressContainer}>
              <div style={styles.progressLabel}>
                <span>Overall Progress</span>
                <span style={styles.progressPercent}>{stats.progress}%</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${stats.progress}%` }}></div>
              </div>
            </div>
          </div>
          
          <button
            style={{ ...styles.resumeBtn, width: isMobile ? "100%" : "auto" }}
            onClick={() => navigate("/my-courses")}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            Continue Learning
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loader}></div>
            <p style={styles.loadingText}>Loading your dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div style={{ 
              ...styles.statsGrid, 
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))"
            }}>
              <div style={styles.card} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ ...styles.cardIcon, background: "#3b82f6" }}>
                  <BookOpen size={28} color="white" />
                </div>
                <div>
                  <h3 style={styles.cardTitle}>Enrolled Courses</h3>
                  <p style={styles.cardValue}>{stats.totalCourses}</p>
                  <span style={styles.cardTrend}>Active enrollments</span>
                </div>
              </div>

              <div style={styles.card} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ ...styles.cardIcon, background: "#8b5cf6" }}>
                  <PlayCircle size={28} color="white" />
                </div>
                <div>
                  <h3 style={styles.cardTitle}>Mock Tests</h3>
                  <p style={styles.cardValue}>{stats.totalMockTests}</p>
                  <span style={styles.cardTrend}>Practice exams</span>
                </div>
              </div>

              <div style={styles.card} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ ...styles.cardIcon, background: "#10b981" }}>
                  <TrendingUp size={28} color="white" />
                </div>
                <div>
                  <h3 style={styles.cardTitle}>Completion Rate</h3>
                  <p style={styles.cardValue}>{stats.progress}%</p>
                  <span style={styles.cardTrend}>Overall progress</span>
                </div>
              </div>

              <div style={styles.card} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ ...styles.cardIcon, background: "#f59e0b" }}>
                  <Trophy size={28} color="white" />
                </div>
                <div>
                  <h3 style={styles.cardTitle}>Certificates</h3>
                  <p style={styles.cardValue}>{stats.totalCertificates}</p>
                  <span style={styles.cardTrend}>Earned credentials</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Section */}
            <div style={styles.quickActions}>
              <h3 style={styles.quickActionsTitle}>Quick Actions</h3>
              <div style={styles.actionsGrid}>
                <button 
                  style={styles.actionCard} 
                  onClick={() => navigate("/courses")}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <span style={styles.actionIcon}>📚</span>
                  <span style={styles.actionText}>Browse Courses</span>
                  <ChevronRight size={16} />
                </button>
                
                <button 
                  style={styles.actionCard} 
                  onClick={() => navigate("/mock-tests")}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <span style={styles.actionIcon}>📝</span>
                  <span style={styles.actionText}>Take Mock Test</span>
                  <ChevronRight size={16} />
                </button>
                
                <button 
                  style={styles.actionCard} 
                  onClick={() => navigate("/certificates")}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <span style={styles.actionIcon}>🏆</span>
                  <span style={styles.actionText}>View Certificates</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Motivation Quote */}
            <div style={styles.quoteSection}>
              <div style={styles.quoteContent}>
                <Brain size={32} color="#8b5cf6" />
                <p style={styles.quoteText}>
                  "The beautiful thing about learning is that no one can take it away from you."
                </p>
                <p style={styles.quoteAuthor}>- B.B. King</p>
              </div>
            </div>
          </>
        )}
      </div>
      <Chatbot />
    </Layout>
  );
}

export default StudentDashboard;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    position: "relative",
    overflowX: "hidden",
  },

  bgGradient: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.08), transparent)",
    pointerEvents: "none",
  },

  topBar: {
    marginBottom: "30px",
    position: "relative",
    zIndex: 1,
  },

  greetingBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.05)",
    padding: "6px 14px",
    borderRadius: "20px",
    marginBottom: "16px",
    fontSize: "13px",
    color: "#fbbf24",
  },

  welcome: {
    fontSize: "42px",
    fontWeight: "700",
    color: "white",
    marginBottom: "8px",
  },

  userName: {
    background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "16px",
  },

  hero: {
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    border: "1px solid rgba(255,255,255,0.05)",
    padding: "40px",
    borderRadius: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
    position: "relative",
    zIndex: 1,
  },

  heroTitle: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "12px",
    color: "white",
  },

  heroText: {
    color: "#94a3b8",
    fontSize: "18px",
    marginBottom: "20px",
  },

  progressContainer: {
    maxWidth: "400px",
  },

  progressLabel: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#cbd5e1",
  },

  progressPercent: {
    fontWeight: "600",
    color: "#60a5fa",
  },

  progressBar: {
    height: "8px",
    background: "#334155",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },

  resumeBtn: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "14px 28px",
    borderRadius: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },

  statsGrid: {
    display: "grid",
    gap: "20px",
    marginBottom: "35px",
    position: "relative",
    zIndex: 1,
  },

  card: {
    background: "#1e293b",
    padding: "24px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.05)",
  },

  cardIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    fontSize: "14px",
    color: "#94a3b8",
    fontWeight: "500",
    marginBottom: "4px",
  },

  cardValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "white",
  },

  cardTrend: {
    fontSize: "12px",
    color: "#64748b",
  },

  quickActions: {
    background: "#1e293b",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "35px",
    border: "1px solid rgba(255,255,255,0.05)",
    position: "relative",
    zIndex: 1,
  },

  quickActionsTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "white",
    marginBottom: "20px",
  },

  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },

  actionCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "16px 20px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
  },

  actionIcon: {
    fontSize: "24px",
  },

  actionText: {
    flex: 1,
    textAlign: "left",
  },

  quoteSection: {
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.05)",
    position: "relative",
    zIndex: 1,
  },

  quoteContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },

  quoteText: {
    fontSize: "16px",
    color: "#cbd5e1",
    fontStyle: "italic",
    maxWidth: "500px",
  },

  quoteAuthor: {
    fontSize: "13px",
    color: "#64748b",
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "3px solid rgba(255,255,255,0.1)",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    marginTop: "16px",
    color: "#94a3b8",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);