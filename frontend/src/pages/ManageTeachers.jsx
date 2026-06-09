import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/admin/AdminLayout";

function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filterSubject, setFilterSubject] = useState("all");
  const [loading, setLoading] = useState(true);
  const darkMode = localStorage.getItem("adminDarkMode") === "true";

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/teachers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(res.data.teachers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchTeachers();
      } catch (error) {
        console.log(error);
        alert("Failed to delete teacher");
      }
    }
  };

  // Extract unique subjects from teachers
  const allSubjects = ["all", ...new Set(teachers.flatMap(t => 
    t.skills?.split(",").map(s => s.trim()) || []
  ))];

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch = (teacher?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    
    const matchesSubject = filterSubject === "all" || 
      teacher.skills?.toLowerCase().includes(filterSubject.toLowerCase());
    
    return matchesSearch && matchesSubject;
  });

  const stats = {
    total: teachers.length,
    active: teachers.filter(t => t.status !== "inactive").length,
    subjects: allSubjects.length - 1,
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
              👨‍🏫 Manage Teachers
            </h1>
            <p style={{ ...styles.subtitle, color: darkMode ? "#94a3b8" : "#64748b" }}>
              Manage instructors on EduAI Nexus
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ ...styles.statsGrid, gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)" }}>
          <div style={{ ...styles.statCard, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <div style={styles.statIcon}>👨‍🏫</div>
            <div>
              <div style={styles.statValue}>{stats.total}</div>
              <div style={styles.statLabel}>Total Teachers</div>
            </div>
          </div>
          <div style={{ ...styles.statCard, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <div style={styles.statIcon}>✅</div>
            <div>
              <div style={styles.statValue}>{stats.active}</div>
              <div style={styles.statLabel}>Active Teachers</div>
            </div>
          </div>
          <div style={{ ...styles.statCard, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <div style={styles.statIcon}>📚</div>
            <div>
              <div style={styles.statValue}>{stats.subjects}</div>
              <div style={styles.statLabel}>Subjects</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div style={styles.searchContainer}>
          <div style={{ ...styles.searchWrapper, background: darkMode ? "#1e293b" : "#ffffff" }}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search teachers by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...styles.searchInput, color: darkMode ? "#fff" : "#1e293b" }}
            />
            {search && (
              <button style={styles.clearBtn} onClick={() => setSearch("")}>✕</button>
            )}
          </div>
          
          <div style={styles.subjectFilter}>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              style={{ ...styles.subjectSelect, background: darkMode ? "#1e293b" : "#ffffff", color: darkMode ? "#fff" : "#1e293b" }}
            >
              {allSubjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === "all" ? "All Subjects" : subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p>Loading teachers...</p>
          </div>
        )}

        {/* Teacher Grid */}
        {!loading && (
          <div style={{ ...styles.teacherGrid, gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(360px, 1fr))" }}>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <div
                  key={teacher._id}
                  style={{ ...styles.teacherCard, background: darkMode ? "#1e293b" : "#ffffff" }}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.avatar}>
                      {teacher.name?.charAt(0)?.toUpperCase() || "T"}
                    </div>
                    <div style={styles.statusBadge}>
                      <span style={{ ...styles.statusDot, background: teacher.status === "inactive" ? "#ef4444" : "#10b981" }}></span>
                      <span>{teacher.status === "inactive" ? "Inactive" : "Active"}</span>
                    </div>
                  </div>
                  
                  <h3 style={{ ...styles.teacherName, color: darkMode ? "#fff" : "#1e293b" }}>
                    {teacher.name || "Unknown Teacher"}
                  </h3>
                  
                  <p style={{ ...styles.teacherEmail, color: darkMode ? "#94a3b8" : "#64748b" }}>
                    📧 {teacher.email || "No email provided"}
                  </p>
                  
                  {teacher.phone && (
                    <p style={{ ...styles.teacherPhone, color: darkMode ? "#94a3b8" : "#64748b" }}>
                      📞 {teacher.phone}
                    </p>
                  )}
                  
                  {teacher.skills && (
                    <div style={styles.skillsContainer}>
                      {teacher.skills.split(",").slice(0, 3).map((skill, idx) => (
                        <span key={idx} style={styles.skillTag}>{skill.trim()}</span>
                      ))}
                      {teacher.skills.split(",").length > 3 && (
                        <span style={styles.skillTag}>+{teacher.skills.split(",").length - 3}</span>
                      )}
                    </div>
                  )}
                  
                  {teacher.experience && (
                    <div style={styles.experienceBadge}>
                      <span>⭐</span> {teacher.experience} experience
                    </div>
                  )}
                  
                  <div style={styles.buttonRow}>
                    <button
                      style={styles.viewBtn}
                      onClick={() => setSelectedTeacher(teacher)}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      👁️ View Details
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(teacher._id)}
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
                <span style={styles.emptyIcon}>👨‍🏫</span>
                <h3>No teachers found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Teacher Details Modal */}
        {selectedTeacher && (
          <div style={styles.modalOverlay} onClick={() => setSelectedTeacher(null)}>
            <div style={{ ...styles.modal, background: darkMode ? "#1e293b" : "#ffffff" }} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h2 style={{ color: darkMode ? "#fff" : "#1e293b" }}>👨‍🏫 Teacher Profile</h2>
                <button style={styles.closeBtn} onClick={() => setSelectedTeacher(null)}>✕</button>
              </div>
              <div style={styles.modalBody}>
                <div style={styles.modalAvatar}>
                  {selectedTeacher.name?.charAt(0)?.toUpperCase() || "T"}
                </div>
                <div style={styles.modalInfo}>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Name:</span>
                    <span style={styles.infoValue}>{selectedTeacher.name || "N/A"}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Email:</span>
                    <span style={styles.infoValue}>{selectedTeacher.email || "N/A"}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Phone:</span>
                    <span style={styles.infoValue}>{selectedTeacher.phone || "N/A"}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Skills:</span>
                    <span style={styles.infoValue}>
                      <div style={styles.modalSkills}>
                        {selectedTeacher.skills?.split(",").map((skill, idx) => (
                          <span key={idx} style={styles.modalSkillTag}>{skill.trim()}</span>
                        )) || "N/A"}
                      </div>
                    </span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Experience:</span>
                    <span style={styles.infoValue}>{selectedTeacher.experience || "N/A"}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Bio:</span>
                    <span style={styles.infoValue}>{selectedTeacher.bio || "No bio provided"}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Status:</span>
                    <span style={{ ...styles.infoValue, color: selectedTeacher.status === "inactive" ? "#ef4444" : "#10b981" }}>
                      {selectedTeacher.status === "inactive" ? "Inactive" : "Active"}
                    </span>
                  </div>
                </div>
              </div>
              <div style={styles.modalFooter}>
                <button style={styles.modalCloseBtn} onClick={() => setSelectedTeacher(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default ManageTeachers;

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
    flex: 2,
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

  subjectFilter: {
    flex: 1,
  },

  subjectSelect: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "16px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    cursor: "pointer",
  },

  teacherGrid: {
    display: "grid",
    gap: "24px",
    position: "relative",
    zIndex: 1,
  },

  teacherCard: {
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

  teacherName: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  teacherEmail: {
    fontSize: "13px",
    marginBottom: "4px",
    wordBreak: "break-word",
  },

  teacherPhone: {
    fontSize: "13px",
    marginBottom: "12px",
  },

  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "12px",
    marginBottom: "12px",
  },

  skillTag: {
    padding: "4px 10px",
    background: "rgba(79, 70, 229, 0.1)",
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: "500",
    color: "#4f46e5",
  },

  experienceBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 12px",
    background: "rgba(16, 185, 129, 0.1)",
    borderRadius: "10px",
    fontSize: "12px",
    color: "#10b981",
    marginTop: "8px",
    marginBottom: "16px",
  },

  buttonRow: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
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
    gridColumn: "1 / -1",
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
    maxWidth: "550px",
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
    width: "100px",
    fontWeight: "600",
    fontSize: "13px",
  },

  infoValue: {
    flex: 1,
    fontSize: "13px",
    wordBreak: "break-word",
  },

  modalSkills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  modalSkillTag: {
    padding: "3px 8px",
    background: "rgba(79, 70, 229, 0.1)",
    borderRadius: "6px",
    fontSize: "11px",
    color: "#4f46e5",
  },

  modalFooter: {
    padding: "16px 24px",
    borderTop: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "flex-end",
  },

  modalCloseBtn: {
    padding: "10px 20px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
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
  
  .teacher-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
`;
document.head.appendChild(styleSheet);