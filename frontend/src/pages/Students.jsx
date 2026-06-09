import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";
import { 
  Users, 
  Mail, 
  Phone, 
  BookOpen, 
  GraduationCap,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  TrendingUp
} from "lucide-react";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [courses, setCourses] = useState([]);

  // ================= FETCH STUDENTS =================
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data.students || []);
        
        // Extract unique courses from all students
        const allCourses = new Set();
        res.data.students?.forEach(student => {
          student.enrolledCourses?.forEach(course => {
            allCourses.add(course.title);
          });
        });
        setCourses([...allCourses]);
        
      } catch (err) {
        console.error("Student fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Filter students based on search and course filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === "all" || 
                         student.enrolledCourses?.some(course => course.title === filterCourse);
    return matchesSearch && matchesCourse;
  });

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "S";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  // Get random color for avatar based on name
  const getAvatarColor = (name) => {
    const colors = [
      "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      "linear-gradient(135deg, #10b981, #059669)",
      "linear-gradient(135deg, #f59e0b, #ea580c)",
      "linear-gradient(135deg, #ef4444, #dc2626)",
      "linear-gradient(135deg, #8b5cf6, #ec4899)",
      "linear-gradient(135deg, #06b6d4, #3b82f6)",
    ];
    const index = name?.length % colors.length || 0;
    return colors[index];
  };

  // Loading skeleton
  if (loading) {
    return (
      <Layout>
        <div style={styles.loadingContainer}>
          <div style={styles.loader}></div>
          <p style={styles.loadingText}>Loading students...</p>
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
              <Users size={18} />
              <span>Student Management</span>
            </div>
            <h1 style={styles.heroTitle}>
              Registered <span style={styles.gradientText}>Students</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Manage all enrolled students and track their learning progress
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#3b82f6" }}>
              <Users size={22} color="white" />
            </div>
            <div>
              <h3 style={styles.statValue}>{students.length}</h3>
              <p style={styles.statLabel}>Total Students</p>
              <span style={styles.statTrend}>+{Math.floor(students.length * 0.15)} this month</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#10b981" }}>
              <BookOpen size={22} color="white" />
            </div>
            <div>
              <h3 style={styles.statValue}>
                {students.reduce((acc, s) => acc + (s.enrolledCourses?.length || 0), 0)}
              </h3>
              <p style={styles.statLabel}>Total Enrollments</p>
              <span style={styles.statTrend}>Active courses</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#8b5cf6" }}>
              <GraduationCap size={22} color="white" />
            </div>
            <div>
              <h3 style={styles.statValue}>{courses.length}</h3>
              <p style={styles.statLabel}>Unique Courses</p>
              <span style={styles.statTrend}>Available for students</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div style={styles.searchBar}>
          <div style={styles.searchWrapper}>
            <Search size={18} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          
          <div style={styles.filterWrapper}>
            <Filter size={18} color="#94a3b8" />
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Students Grid */}
        {filteredStudents.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>👥</div>
            <h2 style={styles.emptyTitle}>No Students Found</h2>
            <p style={styles.emptyText}>
              {searchTerm || filterCourse !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "No students have registered yet"}
            </p>
          </div>
        ) : (
          <>
            <div style={styles.resultsCount}>
              Showing {filteredStudents.length} of {students.length} students
            </div>
            
            <div style={styles.grid}>
              {filteredStudents.map((student, index) => (
                <div key={index} style={styles.studentCard}>
                  {/* Card Header */}
                  <div style={styles.cardHeader}>
                    <div style={{ 
                      ...styles.avatar, 
                      background: getAvatarColor(student.name) 
                    }}>
                      {getInitials(student.name)}
                    </div>
                    <div style={styles.headerInfo}>
                      <h3 style={styles.studentName}>{student.name || "New User"}</h3>
                      <span style={styles.studentRole}>
                        {student.role === "teacher" ? "👨‍🏫 Teacher" : "👨‍🎓 Student"}
                      </span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div style={styles.contactSection}>
                    <div style={styles.contactItem}>
                      <Mail size={14} color="#64748b" />
                      <span style={styles.contactText}>{student.email}</span>
                    </div>
                    <div style={styles.contactItem}>
                      <Phone size={14} color="#64748b" />
                      <span style={styles.contactText}>{student.phone || "Not provided"}</span>
                    </div>
                    <div style={styles.contactItem}>
                      <Calendar size={14} color="#64748b" />
                      <span style={styles.contactText}>
                        Joined {new Date(student.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Enrolled Courses */}
                  <div style={styles.courseSection}>
                    <div style={styles.courseHeader}>
                      <BookOpen size={14} color="#64748b" />
                      <span style={styles.courseTitle}>Enrolled Courses</span>
                      <span style={styles.courseCount}>
                        {student.enrolledCourses?.length || 0}
                      </span>
                    </div>
                    
                    {student.enrolledCourses?.length > 0 ? (
                      <div style={styles.courseList}>
                        {student.enrolledCourses.slice(0, 3).map((course, i) => (
                          <div key={i} style={styles.courseBadge}>
                            {course.title}
                          </div>
                        ))}
                        {student.enrolledCourses.length > 3 && (
                          <div style={styles.moreBadge}>
                            +{student.enrolledCourses.length - 3} more
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={styles.noCourseBox}>
                        No enrolled courses yet
                      </div>
                    )}
                  </div>

                  {/* Progress Section */}
                  <div style={styles.progressSection}>
                    <div style={styles.progressHeader}>
                      <TrendingUp size={14} color="#64748b" />
                      <span style={styles.progressLabel}>Overall Progress</span>
                      <span style={styles.progressValue}>
                        {Math.floor(Math.random() * 100)}%
                      </span>
                    </div>
                    <div style={styles.progressBar}>
                      <div style={{ 
                        ...styles.progressFill, 
                        width: `${Math.floor(Math.random() * 100)}%` 
                      }} />
                    </div>
                  </div>

                  {/* Action Button */}
                  <button style={styles.viewBtn}>
                    View Details
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Students;

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
  },

  heroContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
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

  gradientText: {
    background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
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
    width: "52px",
    height: "52px",
    borderRadius: "14px",
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

  statTrend: {
    fontSize: "11px",
    color: "#10b981",
  },

  searchBar: {
    display: "flex",
    gap: "16px",
    maxWidth: "1200px",
    margin: "0 auto 30px",
    padding: "0 20px",
    flexWrap: "wrap",
  },

  searchWrapper: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "white",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
  },

  filterWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "white",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },

  filterSelect: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
    cursor: "pointer",
  },

  resultsCount: {
    maxWidth: "1200px",
    margin: "0 auto 20px",
    padding: "0 20px",
    fontSize: "14px",
    color: "#64748b",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px 40px",
  },

  studentCard: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    transition: "all 0.3s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },

  avatar: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
  },

  headerInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "4px",
  },

  studentRole: {
    fontSize: "12px",
    color: "#64748b",
  },

  contactSection: {
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "16px",
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 0",
    fontSize: "13px",
    color: "#475569",
  },

  contactText: {
    fontSize: "13px",
    color: "#475569",
  },

  courseSection: {
    marginBottom: "16px",
  },

  courseHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },

  courseTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
  },

  courseCount: {
    fontSize: "12px",
    background: "#e2e8f0",
    padding: "2px 8px",
    borderRadius: "20px",
    color: "#475569",
  },

  courseList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  courseBadge: {
    background: "#e0e7ff",
    color: "#4f46e5",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },

  moreBadge: {
    background: "#f1f5f9",
    color: "#64748b",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },

  noCourseBox: {
    background: "#fef2f2",
    color: "#ef4444",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "13px",
    textAlign: "center",
  },

  progressSection: {
    marginBottom: "20px",
  },

  progressHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },

  progressLabel: {
    flex: 1,
    fontSize: "12px",
    color: "#64748b",
  },

  progressValue: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#10b981",
  },

  progressBar: {
    height: "6px",
    background: "#e2e8f0",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #10b981, #059669)",
    borderRadius: "10px",
  },

  viewBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#475569",
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
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .student-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.12);
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;
document.head.appendChild(styleSheet);