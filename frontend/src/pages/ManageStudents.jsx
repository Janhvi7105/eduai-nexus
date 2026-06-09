import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/admin/AdminLayout";

function ManageStudents() {
  const darkMode = localStorage.getItem("adminDarkMode") === "true";
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data.students);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchStudents();
      } catch (error) {
        console.log(error);
        alert("Failed to delete student");
      }
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = (student?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || 
      (filterStatus === "active" && student.status !== "inactive") ||
      (filterStatus === "inactive" && student.status === "inactive");
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: students.length,
    active: students.filter(s => s.status !== "inactive").length,
    inactive: students.filter(s => s.status === "inactive").length,
  };

  return (
    <AdminLayout>
      <div style={styles.page}>
        {/* Background Pattern */}
        <div style={styles.bgPattern}></div>

        {/* Header Section */}
        <div style={styles.header}>
          <div>
            <h1 style={{ ...styles.heading, color: darkMode ? "#fff" : "#1e293b" }}>
              👨‍🎓 Manage Students
            </h1>
            <p style={{ ...styles.subtitle, color: darkMode ? "#94a3b8" : "#64748b" }}>
              View and manage all enrolled students
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ ...styles.statsGrid, gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)" }}>
          <div style={{ ...styles.statCard, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <div style={styles.statIcon}>👥</div>
            <div>
              <div style={styles.statValue}>{stats.total}</div>
              <div style={styles.statLabel}>Total Students</div>
            </div>
          </div>
          <div style={{ ...styles.statCard, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <div style={styles.statIcon}>✅</div>
            <div>
              <div style={styles.statValue}>{stats.active}</div>
              <div style={styles.statLabel}>Active</div>
            </div>
          </div>
          <div style={{ ...styles.statCard, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <div style={styles.statIcon}>⏸️</div>
            <div>
              <div style={styles.statValue}>{stats.inactive}</div>
              <div style={styles.statLabel}>Inactive</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div style={styles.searchContainer}>
          <div style={{ ...styles.searchWrapper, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search students by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...styles.searchInput, color: darkMode ? "#fff" : "#1e293b" }}
            />
            {search && (
              <button style={styles.clearBtn} onClick={() => setSearch("")}>✕</button>
            )}
          </div>
          
          <div style={styles.filterGroup}>
            <button
              onClick={() => setFilterStatus("all")}
              style={{ ...styles.filterBtn, ...(filterStatus === "all" ? styles.activeFilter : {}), background: filterStatus === "all" ? "#4f46e5" : "transparent", color: filterStatus === "all" ? "#fff" : darkMode ? "#94a3b8" : "#64748b" }}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              style={{ ...styles.filterBtn, ...(filterStatus === "active" ? styles.activeFilter : {}), background: filterStatus === "active" ? "#10b981" : "transparent", color: filterStatus === "active" ? "#fff" : darkMode ? "#94a3b8" : "#64748b" }}
            >
              Active
            </button>
            <button
              onClick={() => setFilterStatus("inactive")}
              style={{ ...styles.filterBtn, ...(filterStatus === "inactive" ? styles.activeFilter : {}), background: filterStatus === "inactive" ? "#ef4444" : "transparent", color: filterStatus === "inactive" ? "#fff" : darkMode ? "#94a3b8" : "#64748b" }}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p>Loading students...</p>
          </div>
        )}

        {/* Student Grid */}
        {!loading && (
          <div style={{ ...styles.studentGrid, gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))" }}>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student._id}
                  style={{ ...styles.studentCard, background: darkMode ? "#1e293b" : "#ffffff" }}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.avatar}>
                      {student.name?.charAt(0)?.toUpperCase() || "S"}
                    </div>
                    <div style={styles.statusBadge}>
                      <span style={{ ...styles.statusDot, background: student.status === "inactive" ? "#ef4444" : "#10b981" }}></span>
                      <span>{student.status === "inactive" ? "Inactive" : "Active"}</span>
                    </div>
                  </div>
                  
                  <h3 style={{ ...styles.studentName, color: darkMode ? "#fff" : "#1e293b" }}>
                    {student.name || "Unknown Student"}
                  </h3>
                  
                  <p style={{ ...styles.studentEmail, color: darkMode ? "#94a3b8" : "#64748b" }}>
                    📧 {student.email || "No email provided"}
                  </p>
                  
                  <div style={styles.studentStats}>
                    <div style={styles.statItem}>
                      <span style={styles.statItemIcon}>📚</span>
                      <div>
                        <div style={styles.statItemValue}>{student.enrolledCourses?.length || 0}</div>
                        <div style={styles.statItemLabel}>Courses</div>
                      </div>
                    </div>
                    <div style={styles.statItem}>
                      <span style={styles.statItemIcon}>📅</span>
                      <div>
                        <div style={styles.statItemValue}>
                          {student.joinedDate ? new Date(student.joinedDate).toLocaleDateString() : "N/A"}
                        </div>
                        <div style={styles.statItemLabel}>Joined</div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={styles.buttonRow}>
                    <button
                      style={styles.viewBtn}
                      onClick={() => handleViewDetails(student)}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      👁️ View Details
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(student._id)}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>👨‍🎓</span>
                <h3>No students found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Student Details Modal */}
        {showModal && selectedStudent && (
          <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
            <div style={{ ...styles.modal, background: darkMode ? "#1e293b" : "#ffffff" }} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h2>Student Details</h2>
                <button style={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
              </div>
              <div style={styles.modalBody}>
                <div style={styles.modalAvatar}>
                  {selectedStudent.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div style={styles.modalInfo}>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Name:</span>
                    <span style={styles.infoValue}>{selectedStudent.name || "N/A"}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Email:</span>
                    <span style={styles.infoValue}>{selectedStudent.email || "N/A"}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Status:</span>
                    <span style={{ ...styles.infoValue, color: selectedStudent.status === "inactive" ? "#ef4444" : "#10b981" }}>
                      {selectedStudent.status === "inactive" ? "Inactive" : "Active"}
                    </span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Enrolled Courses:</span>
                    <span style={styles.infoValue}>
                      {selectedStudent.enrolledCourses?.map(c => c.title).join(", ") || "No courses"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default ManageStudents;

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    padding: "24px",
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

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
    position: "relative",
    zIndex: 1,
  },

  heading: {
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  subtitle: {
    fontSize: "14px",
  },

  statsGrid: {
    display: "grid",
    gap: "16px",
    marginBottom: "32px",
    position: "relative",
    zIndex: 1,
  },

  statCard: {
    padding: "20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },

  statIcon: {
    fontSize: "32px",
  },

  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#4f46e5",
  },

  statLabel: {
    fontSize: "13px",
    color: "#94a3b8",
  },

  searchContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "32px",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 1,
  },

  searchWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "16px",
    transition: "all 0.2s ease",
  },

  searchIcon: {
    fontSize: "18px",
    opacity: 0.6,
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
  },

  clearBtn: {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "14px",
    opacity: 0.6,
  },

  filterGroup: {
    display: "flex",
    gap: "8px",
  },

  filterBtn: {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "13px",
    transition: "all 0.2s ease",
  },

  activeFilter: {
    border: "none",
  },

  studentGrid: {
    display: "grid",
    gap: "24px",
    position: "relative",
    zIndex: 1,
  },

  studentCard: {
    padding: "24px",
    borderRadius: "20px",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    animation: "fadeInUp 0.5s ease forwards",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  },

  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
  },

  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "20px",
    background: "rgba(0,0,0,0.05)",
    fontSize: "12px",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "4px",
  },

  studentName: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  studentEmail: {
    fontSize: "13px",
    marginBottom: "16px",
    wordBreak: "break-word",
  },

  studentStats: {
    display: "flex",
    gap: "16px",
    marginBottom: "20px",
    padding: "12px",
    background: "rgba(0,0,0,0.03)",
    borderRadius: "12px",
  },

  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
  },

  statItemIcon: {
    fontSize: "20px",
  },

  statItemValue: {
    fontSize: "14px",
    fontWeight: "600",
  },

  statItemLabel: {
    fontSize: "10px",
    color: "#94a3b8",
  },

  buttonRow: {
    display: "flex",
    gap: "12px",
  },

  viewBtn: {
    flex: 1,
    padding: "10px 16px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },

  deleteBtn: {
    flex: 1,
    padding: "10px 16px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },

  loadingContainer: {
    textAlign: "center",
    padding: "60px",
    position: "relative",
    zIndex: 1,
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid rgba(79, 70, 229, 0.1)",
    borderTopColor: "#4f46e5",
    borderRadius: "50%",
    margin: "0 auto 16px",
    animation: "spin 0.8s linear infinite",
  },

  emptyState: {
    textAlign: "center",
    padding: "60px",
    position: "relative",
    zIndex: 1,
  },

  emptyIcon: {
    fontSize: "64px",
    display: "block",
    marginBottom: "16px",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
    backdropFilter: "blur(4px)",
  },

  modal: {
    width: "90%",
    maxWidth: "500px",
    borderRadius: "24px",
    overflow: "hidden",
    animation: "slideUp 0.3s ease",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #e2e8f0",
  },

  closeBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(0,0,0,0.05)",
    cursor: "pointer",
    fontSize: "16px",
  },

  modalBody: {
    padding: "24px",
  },

  modalAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "24px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "bold",
    color: "#fff",
    margin: "0 auto 20px",
  },

  modalInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  infoRow: {
    display: "flex",
    padding: "8px 0",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
  },

  infoLabel: {
    width: "120px",
    fontWeight: "600",
    fontSize: "13px",
  },

  infoValue: {
    flex: 1,
    fontSize: "13px",
    wordBreak: "break-word",
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
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  .student-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
`;
document.head.appendChild(styleSheet);