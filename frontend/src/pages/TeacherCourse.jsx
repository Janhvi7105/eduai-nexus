import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/common/Layout";
import Swal from "sweetalert2";
import { 
  Users, 
  Video, 
  DollarSign, 
  Star,
  Edit,
  Upload,
  FileText,
  Save,
  TrendingUp,
  Award,
  Calendar,
  Clock
} from "lucide-react";

function TeacherCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // ================= HANDLE UPLOAD COURSE =================
  const handleUploadCourse = async () => {
    await Swal.fire({
      icon: "success",
      title: "Course Published! 🎉",
      html: "Your course is now visible to students.<br/>Start promoting it to get enrollments.",
      confirmButtonColor: "#10b981",
      confirmButtonText: "Great!",
    });
    navigate("/courses");
  };

  // ================= FETCH COURSE =================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch course
        const courseRes = await axios.get(`/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(courseRes.data.course);
        
        // Fetch students
        try {
          const studentRes = await axios.get(`/api/course/${id}/students`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStudents(studentRes.data.students || []);
        } catch (err) {
          console.log("Student fetch skipped");
        }
      } catch (err) {
        console.error("COURSE ERROR:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // ================= SAVE COURSE =================
  const handleSaveCourse = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      
      await axios.put(
        `/api/courses/${course._id}`,
        {
          title: course.title,
          description: course.description,
          price: course.price,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      await Swal.fire({
        icon: "success",
        title: "Course Updated!",
        text: "Your changes have been saved successfully.",
        confirmButtonColor: "#10b981",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update course. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setSaving(false);
    }
  };

  // Calculate total lectures
  const totalLectures = course?.sections?.reduce(
    (acc, sec) => acc + (sec.lectures?.length || 0), 0
  ) || 0;

  // Calculate total duration
  const totalDuration = totalLectures * 15; // Approximate 15 min per lecture

  // Loading skeleton
  if (loading) {
    return (
      <Layout>
        <div style={styles.loadingContainer}>
          <div style={styles.loader}></div>
          <p style={styles.loadingText}>Loading course details...</p>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>❌</div>
          <h2 style={styles.errorTitle}>Course Not Found</h2>
          <p style={styles.errorText}>The course you're looking for doesn't exist.</p>
          <button style={styles.backBtn} onClick={() => navigate("/my-courses")}>
            Back to Courses
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={styles.page}>
        
        {/* Header Section */}
        <div style={styles.header}>
          <div>
            <div style={styles.headerBadge}>Course Management</div>
            <h1 style={styles.title}>👨‍🏫 {course.title}</h1>
            <p style={styles.subtitle}>Manage your course content, track performance, and engage with students</p>
          </div>
          
          <div style={styles.headerBtns}>
            <button 
              style={styles.editBtn}
              onClick={() => navigate(`/edit-course/${course._id}`)}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <Edit size={18} />
              Edit Content
            </button>
            <button 
              style={styles.uploadBtn}
              onClick={handleUploadCourse}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <Upload size={18} />
              Publish Course
            </button>
            <button 
              style={styles.mockBtn}
              onClick={() => navigate(`/mock-test/${course._id}`)}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <FileText size={18} />
              Create Mock Test
            </button>
          </div>
        </div>

        {/* Course Banner */}
        <div style={styles.banner}>
          <div style={styles.bannerContent}>
            <div style={styles.bannerLeft}>
              <label style={styles.bannerLabel}>Course Title</label>
              <input
                type="text"
                value={course.title}
                onChange={(e) => setCourse({ ...course, title: e.target.value })}
                style={styles.courseInput}
                placeholder="Course Title"
              />
              
              <label style={styles.bannerLabel}>Course Description</label>
              <textarea
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                style={styles.descInput}
                placeholder="Describe what students will learn..."
                rows="3"
              />
            </div>
            
            <div style={styles.bannerRight}>
              <label style={styles.bannerLabel}>Course Price (₹)</label>
              <input
                type="number"
                value={course.price}
                onChange={(e) => setCourse({ ...course, price: e.target.value })}
                style={styles.priceInput}
              />
              <button 
                style={styles.saveCourseBtn} 
                onClick={handleSaveCourse}
                disabled={saving}
              >
                {saving ? (
                  <span style={styles.btnLoader}></span>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#3b82f6" }}>
              <Users size={24} color="white" />
            </div>
            <div>
              <h3 style={styles.statValue}>{students.length}</h3>
              <p style={styles.statLabel}>Enrolled Students</p>
              <span style={styles.statTrend}>+12 this week</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#8b5cf6" }}>
              <Video size={24} color="white" />
            </div>
            <div>
              <h3 style={styles.statValue}>{totalLectures}</h3>
              <p style={styles.statLabel}>Total Lectures</p>
              <span style={styles.statTrend}>{course?.sections?.length || 0} sections</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#10b981" }}>
              <DollarSign size={24} color="white" />
            </div>
            <div>
              <h3 style={styles.statValue}>₹{students.length * Number(course.price)}</h3>
              <p style={styles.statLabel}>Total Revenue</p>
              <span style={styles.statTrend}>Projected earnings</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#f59e0b" }}>
              <Star size={24} color="white" />
            </div>
            <div>
              <h3 style={styles.statValue}>4.9</h3>
              <p style={styles.statLabel}>Instructor Rating</p>
              <span style={styles.statTrend}>From 128 reviews</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button 
            style={{ ...styles.tab, ...(activeTab === "overview" && styles.activeTab) }}
            onClick={() => setActiveTab("overview")}
          >
            Course Overview
          </button>
          <button 
            style={{ ...styles.tab, ...(activeTab === "students" && styles.activeTab) }}
            onClick={() => setActiveTab("students")}
          >
            Students ({students.length})
          </button>
          <button 
            style={{ ...styles.tab, ...(activeTab === "analytics" && styles.activeTab) }}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
        </div>

        {/* Tab Content */}
        <div style={styles.tabContent}>
          {activeTab === "overview" && (
            <div style={styles.overviewTab}>
              <div style={styles.infoCard}>
                <h3 style={styles.infoTitle}>📋 Course Information</h3>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <Clock size={16} />
                    <span>Total Duration: ~{totalDuration} minutes</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Calendar size={16} />
                    <span>Last Updated: {new Date(course.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <TrendingUp size={16} />
                    <span>Status: {course.isPublished ? "Published" : "Draft"}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Award size={16} />
                    <span>Certificate: Included</span>
                  </div>
                </div>
              </div>

              <div style={styles.sectionsCard}>
                <h3 style={styles.infoTitle}>📚 Course Curriculum</h3>
                {course?.sections?.length > 0 ? (
                  course.sections.map((section, idx) => (
                    <div key={idx} style={styles.sectionItem}>
                      <div style={styles.sectionHeader}>
                        <h4 style={styles.sectionTitle}>{section.title}</h4>
                        <span style={styles.sectionCount}>{section.lectures?.length || 0} lectures</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={styles.emptyText}>No sections added yet. Edit your course to add content.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div style={styles.studentsTab}>
              {students.length > 0 ? (
                students.map((student, idx) => (
                  <div key={idx} style={styles.studentItem}>
                    <div style={styles.studentAvatar}>
                      {student.name?.charAt(0) || "S"}
                    </div>
                    <div style={styles.studentInfo}>
                      <h4 style={styles.studentName}>{student.name || "Student"}</h4>
                      <p style={styles.studentEmail}>{student.email || "No email provided"}</p>
                    </div>
                    <div style={styles.studentProgress}>
                      <span style={styles.progressText}>{student.progress || 0}% Complete</span>
                      <div style={styles.progressBar}>
                        <div style={{ ...styles.progressFill, width: `${student.progress || 0}%` }} />
                      </div>
                    </div>
                    <button style={styles.messageBtn}>Message</button>
                  </div>
                ))
              ) : (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>👥</div>
                  <h3 style={styles.emptyTitle}>No Students Yet</h3>
                  <p style={styles.emptyText}>Students who enroll in this course will appear here.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "analytics" && (
            <div style={styles.analyticsTab}>
              <div style={styles.analyticsCard}>
                <h3 style={styles.infoTitle}>📊 Course Performance</h3>
                <div style={styles.analyticsGrid}>
                  <div style={styles.analyticsItem}>
                    <div style={styles.analyticsValue}>{students.length}</div>
                    <div style={styles.analyticsLabel}>Total Enrollments</div>
                  </div>
                  <div style={styles.analyticsItem}>
                    <div style={styles.analyticsValue}>78%</div>
                    <div style={styles.analyticsLabel}>Completion Rate</div>
                  </div>
                  <div style={styles.analyticsItem}>
                    <div style={styles.analyticsValue}>4.9</div>
                    <div style={styles.analyticsLabel}>Average Rating</div>
                  </div>
                  <div style={styles.analyticsItem}>
                    <div style={styles.analyticsValue}>45</div>
                    <div style={styles.analyticsLabel}>Active Students</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default TeacherCourse;

// ================= PROFESSIONAL STYLES =================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    paddingBottom: "40px",
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

  errorContainer: {
    textAlign: "center",
    padding: "80px 20px",
  },

  errorIcon: {
    fontSize: "64px",
    marginBottom: "20px",
  },

  errorTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "12px",
  },

  errorText: {
    fontSize: "16px",
    color: "#64748b",
    marginBottom: "24px",
  },

  backBtn: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  header: {
    background: "white",
    padding: "30px",
    borderRadius: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  headerBadge: {
    display: "inline-block",
    background: "#e0e7ff",
    color: "#4f46e5",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "12px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "14px",
  },

  headerBtns: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  editBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  uploadBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  mockBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #f59e0b, #ea580c)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  banner: {
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    borderRadius: "24px",
    padding: "30px",
    marginBottom: "30px",
  },

  bannerContent: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "30px",
    flexWrap: "wrap",
  },

  bannerLeft: {
    flex: 1,
  },

  bannerRight: {
    width: "250px",
    textAlign: "center",
  },

  bannerLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: "13px",
    marginBottom: "8px",
  },

  courseInput: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
    outline: "none",
  },

  descInput: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
  },

  priceInput: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "white",
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "16px",
    outline: "none",
  },

  saveCourseBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  btnLoader: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    display: "inline-block",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
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

  tabs: {
    display: "flex",
    gap: "8px",
    marginBottom: "24px",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "8px",
  },

  tab: {
    background: "transparent",
    border: "none",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#64748b",
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderRadius: "10px",
  },

  activeTab: {
    background: "#3b82f6",
    color: "white",
  },

  tabContent: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  overviewTab: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  infoCard: {
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "16px",
  },

  infoTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "16px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },

  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#475569",
  },

  sectionsCard: {
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "16px",
  },

  sectionItem: {
    padding: "12px",
    background: "white",
    borderRadius: "12px",
    marginBottom: "12px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1e293b",
  },

  sectionCount: {
    fontSize: "12px",
    color: "#64748b",
  },

  studentsTab: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  studentItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    background: "#f8fafc",
    borderRadius: "16px",
    transition: "all 0.3s ease",
  },

  studentAvatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "4px",
  },

  studentEmail: {
    fontSize: "13px",
    color: "#64748b",
  },

  studentProgress: {
    minWidth: "120px",
  },

  progressText: {
    fontSize: "12px",
    color: "#64748b",
    display: "block",
    marginBottom: "4px",
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

  messageBtn: {
    background: "#e2e8f0",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    color: "#475569",
  },

  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },

  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
  },

  emptyTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "8px",
  },

  emptyText: {
    fontSize: "14px",
    color: "#64748b",
  },

  analyticsTab: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  analyticsCard: {
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "16px",
  },

  analyticsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
  },

  analyticsItem: {
    textAlign: "center",
    padding: "16px",
    background: "white",
    borderRadius: "12px",
  },

  analyticsValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#3b82f6",
  },

  analyticsLabel: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "4px",
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
  
  .student-item:hover {
    background: #f1f5f9;
    transform: translateX(4px);
  }
  
  input:focus, textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;
document.head.appendChild(styleSheet);