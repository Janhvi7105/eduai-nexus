import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  DollarSign,
  Star,
  Target,
  Award,
  Plus,
  Eye
} from "lucide-react";

function TeacherDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    revenue: 0,
    rating: 4.8,
    reviews: 124,
    monthlyGrowth: 15
  });

  // ================= LOAD USER =================
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch (err) {
      console.error("User load error:", err);
    }
  }, []);

  // ================= FETCH STATS =================
  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        // Fetch students
        const studentsRes = await axios.get("/api/user/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Fetch courses
        const coursesRes = await axios.get("/api/courses");
        
        // Fetch revenue
        const revenueRes = await axios.get("/api/revenue/teacher", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setStats(prev => ({
          ...prev,
          courses: coursesRes.data.courses?.length || 0,
          students: studentsRes.data.students?.length || 0,
          revenue: revenueRes.data.revenue || 0
        }));
        
        setLoading(false);
      } catch (err) {
        console.error("Stats fetch error:", err);
        setLoading(false);
      }
    };
    
    fetchAllStats();
  }, []);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Loading skeleton
  if (loading) {
    return (
      <Layout>
        <div style={styles.loadingContainer}>
          <div style={styles.loader}></div>
          <p style={styles.loadingText}>Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={styles.page}>
        
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <div style={styles.heroContent}>
            <div style={styles.greetingBadge}>
              <span>{getGreeting()}</span>
            </div>
            <h1 style={styles.heroTitle}>
              👨‍🏫 Welcome Back, <span style={styles.userName}>{user?.name?.split(" ")[0] || "Teacher"}!</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Here's what's happening with your courses and students today
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#3b82f6" }}>
              <BookOpen size={24} color="white" />
            </div>
            <div style={styles.statInfo}>
              <h3 style={styles.statValue}>{stats.courses}</h3>
              <p style={styles.statLabel}>Total Courses</p>
              <span style={styles.statTrend}>+2 this month</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#10b981" }}>
              <Users size={24} color="white" />
            </div>
            <div style={styles.statInfo}>
              <h3 style={styles.statValue}>{stats.students}</h3>
              <p style={styles.statLabel}>Active Students</p>
              <span style={styles.statTrend}>+{stats.monthlyGrowth}% growth</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#f59e0b" }}>
              <DollarSign size={24} color="white" />
            </div>
            <div style={styles.statInfo}>
              <h3 style={styles.statValue}>₹{stats.revenue.toLocaleString()}</h3>
              <p style={styles.statLabel}>Total Earnings</p>
              <span style={styles.statTrend}>This month</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#8b5cf6" }}>
              <Star size={24} color="white" />
            </div>
            <div style={styles.statInfo}>
              <h3 style={styles.statValue}>{stats.rating}</h3>
              <p style={styles.statLabel}>Instructor Rating</p>
              <span style={styles.statTrend}>{stats.reviews} reviews</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={styles.twoColumn}>
          
          {/* Left Column - Teaching Profile & Quick Actions */}
          <div style={styles.leftColumn}>
            
            {/* Teaching Profile */}
            {user && (
              <div style={styles.profileCard}>
                <h3 style={styles.cardTitle}>🎯 Teaching Profile</h3>
                <div style={styles.profileInfo}>
                  <div style={styles.profileRow}>
                    <span style={styles.profileLabel}>Teaching Type:</span>
                    <span style={styles.profileValue}>{user?.onboarding?.teaching || "Not specified"}</span>
                  </div>
                  <div style={styles.profileRow}>
                    <span style={styles.profileLabel}>Experience:</span>
                    <span style={styles.profileValue}>{user?.onboarding?.video || "Not specified"}</span>
                  </div>
                  <div style={styles.profileRow}>
                    <span style={styles.profileLabel}>Target Audience:</span>
                    <span style={styles.profileValue}>{user?.onboarding?.audience || "Not specified"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div style={styles.quickActions}>
              <h3 style={styles.cardTitle}>⚡ Quick Actions</h3>
              <div style={styles.actionButtons}>
                <button 
                  style={styles.actionBtn}
                  onClick={() => window.location.href = "/create-course"}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <Plus size={18} />
                  Create New Course
                </button>
                <button 
                  style={styles.actionBtn}
                  onClick={() => window.location.href = "/students"}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <Eye size={18} />
                  View All Students
                </button>
              </div>
            </div>

            {/* Achievement Badges */}
            <div style={styles.achievements}>
              <h3 style={styles.cardTitle}>🏆 Achievements</h3>
              <div style={styles.badges}>
                <div style={styles.badge}>
                  <Award size={24} color="#f59e0b" />
                  <span>Top Instructor</span>
                </div>
                <div style={styles.badge}>
                  <Target size={24} color="#10b981" />
                  <span>Course Creator</span>
                </div>
                <div style={styles.badge}>
                  <TrendingUp size={24} color="#8b5cf6" />
                  <span>Rising Star</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Welcome Message & Tips */}
          <div style={styles.rightColumn}>
            
            {/* Welcome Card */}
            <div style={styles.welcomeCard}>
              <div style={styles.welcomeIcon}>🎓</div>
              <h3 style={styles.welcomeTitle}>Make a Difference Today</h3>
              <p style={styles.welcomeText}>
                Your expertise can change lives. Create engaging courses and help students achieve their dreams.
              </p>
              <button 
                style={styles.startBtn}
                onClick={() => window.location.href = "/create-course"}
              >
                Start Creating
                <span style={styles.btnArrow}>→</span>
              </button>
            </div>

            {/* Tips Card */}
            <div style={styles.tipsCard}>
              <h3 style={styles.tipsTitle}>💡 Pro Tips for Success</h3>
              <ul style={styles.tipsList}>
                <li>Update your course content regularly</li>
                <li>Engage with students through discussions</li>
                <li>Share additional resources and materials</li>
                <li>Gather feedback to improve your teaching</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div style={styles.quoteSection}>
          <div style={styles.quoteContent}>
            <p style={styles.quoteText}>
              "The art of teaching is the art of assisting discovery."
            </p>
            <p style={styles.quoteAuthor}>- Mark Van Doren</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TeacherDashboard;

// ================= PROFESSIONAL STYLES =================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "3px solid #e2e8f0",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    marginTop: "16px",
    color: "#64748b",
    fontSize: "14px",
  },

  heroSection: {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    padding: "50px 30px",
    marginBottom: "30px",
    borderRadius: "24px",
  },

  heroContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  greetingBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.1)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#a78bfa",
    marginBottom: "16px",
  },

  heroTitle: {
    fontSize: "36px",
    fontWeight: "800",
    color: "white",
    marginBottom: "12px",
  },

  userName: {
    background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroSubtitle: {
    fontSize: "16px",
    color: "#94a3b8",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto 30px",
    padding: "0 20px",
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },

  statIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  statInfo: {
    flex: 1,
  },

  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "4px",
  },

  statLabel: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "4px",
  },

  statTrend: {
    fontSize: "12px",
    color: "#10b981",
  },

  twoColumn: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto 30px",
    padding: "0 20px",
  },

  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  profileCard: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "20px",
  },

  profileInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  profileRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #e2e8f0",
  },

  profileLabel: {
    fontSize: "14px",
    color: "#64748b",
  },

  profileValue: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1e293b",
  },

  quickActions: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  actionButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  actionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#1e293b",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  achievements: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "20px",
    padding: "24px",
    color: "white",
  },

  badges: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },

  badge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.2)",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "13px",
  },

  welcomeCard: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    borderRadius: "20px",
    padding: "30px",
    color: "white",
    textAlign: "center",
  },

  welcomeIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },

  welcomeTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
  },

  welcomeText: {
    fontSize: "14px",
    lineHeight: "1.6",
    marginBottom: "20px",
    opacity: 0.95,
  },

  startBtn: {
    background: "white",
    color: "#3b82f6",
    border: "none",
    padding: "10px 24px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },

  btnArrow: {
    transition: "transform 0.3s ease",
  },

  tipsCard: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  tipsTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "16px",
  },

  tipsList: {
    margin: 0,
    paddingLeft: "20px",
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.8",
  },

  quoteSection: {
    maxWidth: "1200px",
    margin: "0 auto 30px",
    padding: "0 20px",
  },

  quoteContent: {
    background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
  },

  quoteText: {
    fontSize: "16px",
    color: "#334155",
    fontStyle: "italic",
    marginBottom: "8px",
  },

  quoteAuthor: {
    fontSize: "13px",
    color: "#64748b",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  .start-btn:hover .btn-arrow {
    transform: translateX(5px);
  }
`;
document.head.appendChild(styleSheet);