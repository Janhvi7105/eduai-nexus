import AdminLayout from "../components/admin/AdminLayout";
import { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [darkMode] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    totalRevenue: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        
        // Fetch stats
        const statsRes = await axios.get("/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(statsRes.data);

        // Fetch recent activities
        const activitiesRes = await axios.get("/api/admin/recent-activities", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentActivities(activitiesRes.data.activities || []);

        // Fetch top courses
        const coursesRes = await axios.get("/api/admin/top-courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTopCourses(coursesRes.data.courses || []);
      } catch (err) {
        console.error("DASHBOARD ERROR:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const analytics = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: "👨‍🎓",
      iconBg: "#4f46e5",
      trend: "+12%",
      trendUp: true,
      gradient: "linear-gradient(135deg, #4f46e5, #6366f1)",
    },
    {
      title: "Total Teachers",
      value: stats.totalTeachers,
      icon: "👨‍🏫",
      iconBg: "#8b5cf6",
      trend: "+8%",
      trendUp: true,
      gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: "📚",
      iconBg: "#10b981",
      trend: "+15%",
      trendUp: true,
      gradient: "linear-gradient(135deg, #10b981, #34d399)",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: "💰",
      iconBg: "#f59e0b",
      trend: "+23%",
      trendUp: true,
      gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    },
  ];

  const quickActions = [
    { title: "Add New Course", icon: "📖", color: "#4f46e5", path: "/add-course" },
    { title: "Manage Users", icon: "👥", color: "#8b5cf6", path: "/manage-users" },
    { title: "View Reports", icon: "📊", color: "#10b981", path: "/reports" },
    { title: "Settings", icon: "⚙️", color: "#f59e0b", path: "/settings" },
  ];

  return (
    <AdminLayout darkMode={darkMode}>
      <div
        style={{
          ...styles.page,
          padding: isMobile ? "16px" : "28px",
          backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
        }}
      >
        {/* Background Pattern */}
        <div style={styles.bgPattern}></div>

        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <div style={styles.welcomeContent}>
            <div>
              <h1 style={{ ...styles.welcomeTitle, color: darkMode ? "#fff" : "#1e293b" }}>
                Welcome back, Admin! 👋
              </h1>
              <p style={{ ...styles.welcomeSubtitle, color: darkMode ? "#94a3b8" : "#64748b" }}>
                Here's what's happening with your platform today
              </p>
            </div>
            <div style={styles.dateBox}>
              <span style={styles.dateIcon}>📅</span>
              <div>
                <div style={styles.dateText}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
                <div style={styles.dateSubtext}>
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ ...styles.statsGrid, gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)" }}>
          {analytics.map((item, index) => (
            <div
              key={item.title}
              style={{
                ...styles.statCard,
                background: darkMode ? "#1e293b" : "#ffffff",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div style={styles.statHeader}>
                <div style={{ ...styles.statIcon, background: item.iconBg }}>
                  <span style={styles.statIconText}>{item.icon}</span>
                </div>
                <div style={styles.trendBadge}>
                  <span>{item.trend}</span>
                  <span>{item.trendUp ? "↑" : "↓"}</span>
                </div>
              </div>
              <div style={styles.statValue}>{item.value}</div>
              <div style={{ ...styles.statTitle, color: darkMode ? "#94a3b8" : "#64748b" }}>
                {item.title}
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: "75%", background: item.iconBg }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Activity Section */}
        <div style={{ ...styles.chartsGrid, gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)" }}>
          {/* Recent Activity */}
          <div style={{ ...styles.activityCard, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <div style={styles.cardHeader}>
              <h3 style={{ ...styles.cardTitle, color: darkMode ? "#fff" : "#1e293b" }}>
                <span>🔄</span> Recent Activity
              </h3>
              <button style={styles.viewAllBtn}>View All →</button>
            </div>
            <div style={styles.activityList}>
              {isLoading ? (
                <div style={styles.loadingState}>
                  <div style={styles.spinner}></div>
                  <p>Loading activities...</p>
                </div>
              ) : recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} style={styles.activityItem}>
                    <div style={styles.activityIcon}>
                      {activity.type === "course" ? "📖" : activity.type === "user" ? "👤" : "💰"}
                    </div>
                    <div style={styles.activityContent}>
                      <div style={styles.activityText}>{activity.message}</div>
                      <div style={styles.activityTime}>{activity.timeAgo || "Just now"}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={styles.emptyState}>
                  <span>📭</span>
                  <p>No recent activities</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Courses */}
          <div style={{ ...styles.coursesCard, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <div style={styles.cardHeader}>
              <h3 style={{ ...styles.cardTitle, color: darkMode ? "#fff" : "#1e293b" }}>
                <span>🏆</span> Top Performing Courses
              </h3>
              <button style={styles.viewAllBtn}>View All →</button>
            </div>
            <div style={styles.coursesList}>
              {isLoading ? (
                <div style={styles.loadingState}>
                  <div style={styles.spinner}></div>
                  <p>Loading courses...</p>
                </div>
              ) : topCourses.length > 0 ? (
                topCourses.map((course, index) => (
                  <div key={index} style={styles.courseItem}>
                    <div style={styles.courseRank}>#{index + 1}</div>
                    <div style={styles.courseInfo}>
                      <div style={styles.courseName}>{course.name}</div>
                      <div style={styles.courseStats}>
                        <span>👨‍🎓 {course.students} students</span>
                        <span>⭐ {course.rating}</span>
                      </div>
                    </div>
                    <div style={styles.courseProgress}>
                      <div style={{ ...styles.courseProgressFill, width: `${course.progress || 75}%` }}></div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={styles.emptyState}>
                  <span>📚</span>
                  <p>No courses data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.quickActionsSection}>
          <h3 style={{ ...styles.sectionTitle, color: darkMode ? "#fff" : "#1e293b" }}>
            ⚡ Quick Actions
          </h3>
          <div style={{ ...styles.actionsGrid, gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)" }}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                style={{
                  ...styles.actionBtn,
                  background: darkMode ? "#1e293b" : "#ffffff",
                  borderColor: action.color,
                }}
              >
                <span style={styles.actionIcon}>{action.icon}</span>
                <span style={styles.actionTitle}>{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div style={{ ...styles.bottomStats, gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)" }}>
          <div style={{ ...styles.bottomStatCard, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <div style={styles.bottomStatIcon}>📈</div>
            <div>
              <div style={styles.bottomStatValue}>+45%</div>
              <div style={styles.bottomStatLabel}>Platform Growth</div>
            </div>
          </div>
          <div style={{ ...styles.bottomStatCard, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <div style={styles.bottomStatIcon}>⭐</div>
            <div>
              <div style={styles.bottomStatValue}>4.8</div>
              <div style={styles.bottomStatLabel}>Average Rating</div>
            </div>
          </div>
          <div style={{ ...styles.bottomStatCard, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <div style={styles.bottomStatIcon}>🎯</div>
            <div>
              <div style={styles.bottomStatValue}>92%</div>
              <div style={styles.bottomStatLabel}>Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    transition: "all 0.3s ease",
  },

  bgPattern: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.05) 0%, transparent 50%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  welcomeSection: {
    marginBottom: "32px",
    position: "relative",
    zIndex: 1,
  },

  welcomeContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  },

  welcomeTitle: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  welcomeSubtitle: {
    fontSize: "14px",
  },

  dateBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 20px",
    borderRadius: "16px",
    background: "rgba(79, 70, 229, 0.1)",
    backdropFilter: "blur(10px)",
  },

  dateIcon: {
    fontSize: "24px",
  },

  dateText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#4f46e5",
  },

  dateSubtext: {
    fontSize: "11px",
    color: "#94a3b8",
  },

  statsGrid: {
    display: "grid",
    gap: "20px",
    marginBottom: "28px",
    position: "relative",
    zIndex: 1,
  },

  statCard: {
    padding: "20px",
    borderRadius: "20px",
    transition: "all 0.3s ease",
    animation: "fadeInUp 0.5s ease forwards",
    opacity: 0,
    transform: "translateY(20px)",
  },

  statHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },

  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  statIconText: {
    fontSize: "24px",
  },

  trendBadge: {
    padding: "4px 10px",
    borderRadius: "20px",
    background: "rgba(16, 185, 129, 0.1)",
    color: "#10b981",
    fontSize: "12px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  statValue: {
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "8px",
    color: "#fff",
  },

  statTitle: {
    fontSize: "13px",
    marginBottom: "12px",
  },

  progressBar: {
    height: "4px",
    background: "rgba(0,0,0,0.1)",
    borderRadius: "2px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: "2px",
    transition: "width 1s ease",
  },

  chartsGrid: {
    display: "grid",
    gap: "24px",
    marginBottom: "32px",
    position: "relative",
    zIndex: 1,
  },

  activityCard: {
    borderRadius: "20px",
    padding: "24px",
    transition: "all 0.3s ease",
  },

  coursesCard: {
    borderRadius: "20px",
    padding: "24px",
    transition: "all 0.3s ease",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: 0,
  },

  viewAllBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(79, 70, 229, 0.1)",
    color: "#4f46e5",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "12px",
    transition: "all 0.2s ease",
  },

  activityIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "rgba(79, 70, 229, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  activityContent: {
    flex: 1,
  },

  activityText: {
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "4px",
  },

  activityTime: {
    fontSize: "10px",
    color: "#94a3b8",
  },

  coursesList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  courseItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  courseRank: {
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    background: "rgba(79, 70, 229, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    color: "#4f46e5",
  },

  courseInfo: {
    flex: 1,
  },

  courseName: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "4px",
  },

  courseStats: {
    display: "flex",
    gap: "12px",
    fontSize: "10px",
    color: "#94a3b8",
  },

  courseProgress: {
    width: "80px",
    height: "4px",
    background: "rgba(0,0,0,0.1)",
    borderRadius: "2px",
    overflow: "hidden",
  },

  courseProgressFill: {
    height: "100%",
    background: "#4f46e5",
    borderRadius: "2px",
  },

  quickActionsSection: {
    marginBottom: "32px",
    position: "relative",
    zIndex: 1,
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "16px",
  },

  actionsGrid: {
    display: "grid",
    gap: "12px",
  },

  actionBtn: {
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease",
  },

  actionIcon: {
    fontSize: "20px",
  },

  actionTitle: {
    fontSize: "13px",
    fontWeight: "500",
  },

  bottomStats: {
    display: "grid",
    gap: "16px",
    position: "relative",
    zIndex: 1,
  },

  bottomStatCard: {
    padding: "16px 20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    transition: "all 0.3s ease",
  },

  bottomStatIcon: {
    fontSize: "32px",
  },

  bottomStatValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#4f46e5",
  },

  bottomStatLabel: {
    fontSize: "11px",
    color: "#94a3b8",
  },

  loadingState: {
    textAlign: "center",
    padding: "40px",
    color: "#94a3b8",
  },

  spinner: {
    width: "30px",
    height: "30px",
    border: "3px solid rgba(79, 70, 229, 0.1)",
    borderTopColor: "#4f46e5",
    borderRadius: "50%",
    margin: "0 auto 12px",
    animation: "spin 0.8s linear infinite",
  },

  emptyState: {
    textAlign: "center",
    padding: "40px",
    color: "#94a3b8",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
  }
  
  .activity-item:hover {
    background: rgba(79, 70, 229, 0.05);
  }
  
  .action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;
document.head.appendChild(styleSheet);