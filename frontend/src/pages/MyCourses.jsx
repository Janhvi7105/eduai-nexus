import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import { 
  BookOpen, 
  Clock, 
  Award, 
  PlayCircle,
  Settings,
  TrendingUp,
  Users,
  Star
} from "lucide-react";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    averageProgress: 0
  });
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isTeacher = user?.role === "teacher";

  // Course image mapping
  const getCourseImage = (title) => {
    const lower = title?.toLowerCase() || "";
    
    if (lower.includes("java")) {
      return "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop";
    }
    if (lower.includes("react")) {
      return "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop";
    }
    if (lower.includes("python")) {
      return "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200&auto=format&fit=crop";
    }
    if (lower.includes("database") || lower.includes("sql") || lower.includes("mongodb")) {
      return "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop";
    }
    if (lower.includes("array") || lower.includes("dsa") || lower.includes("algorithm")) {
      return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop";
    }
    if (lower.includes("html") || lower.includes("css") || lower.includes("javascript")) {
      return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";
    }
    if (lower.includes("ai") || lower.includes("machine learning")) {
      return "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop";
  };

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          alert("Please login first ❗");
          navigate("/login", { replace: true });
          return;
        }

        const res = await axios.get("/api/courses/my-courses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCourses(res.data.courses || []);
        
        // Calculate stats
        const enrolledCourses = res.data.courses || [];
        setStats({
          totalCourses: enrolledCourses.length,
          completedCourses: enrolledCourses.filter(c => c.progress === 100).length,
          totalHours: enrolledCourses.reduce((acc, c) => acc + (c.duration || 20), 0),
          averageProgress: enrolledCourses.length > 0 
            ? Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length)
            : 0
        });
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          alert("Session expired ❌ Please login again");
          localStorage.clear();
          navigate("/login", { replace: true });
        } else {
          alert("Failed to load courses ❌");
        }
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  // Loading skeleton
  if (loading) {
    return (
      <Layout>
        <div style={styles.loadingContainer}>
          <div style={styles.loader}></div>
          <p style={styles.loadingText}>Loading your courses...</p>
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
            <div style={styles.heroBadge}>
              {isTeacher ? "👨‍🏫 Instructor Portal" : "🎓 Student Dashboard"}
            </div>
            <h1 style={styles.heroTitle}>
              {isTeacher ? "My Teaching Courses" : "My Learning Journey"}
            </h1>
            <p style={styles.heroSubtitle}>
              {isTeacher 
                ? "Manage your courses, track student progress, and create engaging content"
                : "Continue where you left off and track your learning progress"}
            </p>
          </div>
        </div>

        {/* Stats Section (Student Only) */}
        {!isTeacher && courses.length > 0 && (
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#3b82f6" }}>
                <BookOpen size={24} color="white" />
              </div>
              <div>
                <h3 style={styles.statValue}>{stats.totalCourses}</h3>
                <p style={styles.statLabel}>Enrolled Courses</p>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#10b981" }}>
                <Award size={24} color="white" />
              </div>
              <div>
                <h3 style={styles.statValue}>{stats.completedCourses}</h3>
                <p style={styles.statLabel}>Completed</p>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#8b5cf6" }}>
                <Clock size={24} color="white" />
              </div>
              <div>
                <h3 style={styles.statValue}>{stats.totalHours}+</h3>
                <p style={styles.statLabel}>Learning Hours</p>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#f59e0b" }}>
                <TrendingUp size={24} color="white" />
              </div>
              <div>
                <h3 style={styles.statValue}>{stats.averageProgress}%</h3>
                <p style={styles.statLabel}>Avg Progress</p>
              </div>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📚</div>
            <h2 style={styles.emptyTitle}>No Courses Yet</h2>
            <p style={styles.emptyText}>
              {isTeacher 
                ? "You haven't created any courses yet. Start teaching today!"
                : "You haven't enrolled in any courses yet. Explore our catalog and start learning!"}
            </p>
            <button 
              style={styles.browseBtn}
              onClick={() => navigate("/courses")}
            >
              {isTeacher ? "Create Course →" : "Browse Courses →"}
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {courses.map((course, index) => (
              <div 
                key={course._id || index} 
                style={{
                  ...styles.card,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Course Image */}
                <div style={styles.imageContainer}>
                  <img
                    src={getCourseImage(course.title)}
                    alt={course.title}
                    style={styles.courseImage}
                  />
                  <div style={styles.imageOverlay}>
                    <span style={styles.categoryBadge}>
                      {isTeacher ? "Instructor" : "Enrolled"}
                    </span>
                    {!isTeacher && course.progress > 0 && (
                      <span style={styles.progressBadge}>
                        {course.progress}% Complete
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Content */}
                <div style={styles.courseContent}>
                  <h3 style={styles.courseTitle}>{course.title || "Untitled Course"}</h3>
                  <p style={styles.courseDescription}>
                    {course.description || "No description available"}
                  </p>

                  {/* Course Meta */}
                  <div style={styles.courseMeta}>
                    <div style={styles.metaItem}>
                      <Users size={14} />
                      <span>{course.enrolledCount || 0} Students</span>
                    </div>
                    <div style={styles.metaItem}>
                      <Clock size={14} />
                      <span>{course.duration || 20} Hours</span>
                    </div>
                    {!isTeacher && course.rating && (
                      <div style={styles.metaItem}>
                        <Star size={14} />
                        <span>{course.rating} (4.8)</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar (Student Only) */}
                  {!isTeacher && course.progress !== undefined && (
                    <div style={styles.progressSection}>
                      <div style={styles.progressBar}>
                        <div 
                          style={{ 
                            ...styles.progressFill, 
                            width: `${course.progress || 0}%` 
                          }} 
                        />
                      </div>
                      <span style={styles.progressText}>
                        {course.progress || 0}% Complete
                      </span>
                    </div>
                  )}

                  {/* Price and Button */}
                  <div style={styles.cardFooter}>
                    <div style={styles.priceSection}>
                      <span style={styles.priceLabel}>Course Price</span>
                      <span style={styles.priceValue}>₹ {course.price}</span>
                    </div>
                    
                    <button
                      style={styles.actionBtn}
                      onClick={() => {
                        if (isTeacher) {
                          navigate(`/teacher-course/${course._id}`);
                        } else {
                          navigate(`/course-player/${course._id}`);
                        }
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      {isTeacher ? (
                        <>Manage Course <Settings size={16} /></>
                      ) : (
                        <>Continue Learning <PlayCircle size={16} /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quote Section */}
        {courses.length > 0 && (
          <div style={styles.quoteSection}>
            <div style={styles.quoteContent}>
              <p style={styles.quoteText}>
                {isTeacher 
                  ? "✨ The art of teaching is the art of assisting discovery."
                  : "✨ The beautiful thing about learning is that no one can take it away from you."}
              </p>
              <p style={styles.quoteAuthor}>
                {isTeacher ? "- Mark Van Doren" : "- B.B. King"}
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyCourses;

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
    padding: "60px 40px",
    marginBottom: "40px",
  },

  heroContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  heroBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.1)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#a78bfa",
    marginBottom: "16px",
  },

  heroTitle: {
    fontSize: "42px",
    fontWeight: "800",
    color: "white",
    marginBottom: "12px",
  },

  heroSubtitle: {
    fontSize: "16px",
    color: "#94a3b8",
    maxWidth: "600px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto 40px",
    padding: "0 20px",
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
  },

  statLabel: {
    fontSize: "13px",
    color: "#64748b",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto 40px",
    padding: "0 20px",
  },

  card: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
    transition: "all 0.3s ease",
    animation: "fadeInUp 0.6s ease-out forwards",
    opacity: 0,
    transform: "translateY(20px)",
  },

  imageContainer: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
  },

  courseImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },

  imageOverlay: {
    position: "absolute",
    top: "16px",
    left: "16px",
    right: "16px",
    display: "flex",
    justifyContent: "space-between",
  },

  categoryBadge: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  progressBadge: {
    background: "rgba(16, 185, 129, 0.95)",
    color: "white",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  courseContent: {
    padding: "24px",
  },

  courseTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
  },

  courseDescription: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "16px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  courseMeta: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },

  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#64748b",
  },

  progressSection: {
    marginBottom: "20px",
  },

  progressBar: {
    height: "6px",
    background: "#e2e8f0",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "8px",
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },

  progressText: {
    fontSize: "12px",
    color: "#64748b",
  },

  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "16px",
    borderTop: "1px solid #e2e8f0",
  },

  priceSection: {
    display: "flex",
    flexDirection: "column",
  },

  priceLabel: {
    fontSize: "11px",
    color: "#94a3b8",
  },

  priceValue: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#3b82f6",
  },

  actionBtn: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },

  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
    maxWidth: "500px",
    margin: "0 auto",
  },

  emptyIcon: {
    fontSize: "80px",
    marginBottom: "20px",
  },

  emptyTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "12px",
  },

  emptyText: {
    fontSize: "16px",
    color: "#64748b",
    marginBottom: "24px",
  },

  browseBtn: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "14px 32px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  quoteSection: {
    maxWidth: "1200px",
    margin: "40px auto 0",
    padding: "30px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
    borderRadius: "20px",
  },

  quoteContent: {
    maxWidth: "600px",
    margin: "0 auto",
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
  
  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
  
  .card:hover img {
    transform: scale(1.05);
  }
`;
document.head.appendChild(styleSheet);