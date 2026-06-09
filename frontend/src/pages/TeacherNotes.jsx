import { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import axios from "axios";

function TeacherNotes() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/courses/my-courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data.courses);
    };

    fetchCourses();
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSelected = async () => {
    if (!selectedNote) {
      alert("Select a note first");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("courseId", courseId);
      if (file) formData.append("file", file);

      await axios.put(`/api/notes/${selectedNote}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Notes updated successfully ✅");
      fetchNotes();
      setFile(null);
      const fileInput = document.getElementById("file-upload");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.log(error);
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedNote) {
      alert("Please select a note");
      return;
    }

    const confirmDelete = window.confirm("Delete this note?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/notes/${selectedNote}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Notes deleted successfully ✅");
      fetchNotes();
      setSelectedNote("");
      setTitle("");
      setCourseId("");
    } catch (error) {
      console.log(error);
      alert("Delete failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file || !courseId) {
      alert("Please fill all fields and select a file");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);
      formData.append("courseId", courseId);

      await axios.post("/api/notes/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Notes uploaded successfully ✅");
      setTitle("");
      setFile(null);
      setCourseId("");
      fetchNotes();
      const fileInput = document.getElementById("file-upload");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleNoteSelect = (noteId) => {
    setSelectedNote(noteId);
    const note = notes.find((n) => n._id === noteId);
    if (note) {
      setTitle(note.title);
      setCourseId(note.courseId);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>📚</div>
          <h1 style={styles.title}>Notes Management</h1>
          <p style={styles.subtitle}>Upload, edit, and manage your course materials</p>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          <button
            onClick={() => { setActiveTab("upload"); setSelectedNote(""); setTitle(""); setCourseId(""); setFile(null); }}
            style={{ ...styles.tab, ...(activeTab === "upload" ? styles.activeTab : {}) }}
          >
            📤 Upload New Notes
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            style={{ ...styles.tab, ...(activeTab === "manage" ? styles.activeTab : {}) }}
          >
            ✏️ Manage Existing Notes
          </button>
        </div>

        <div style={styles.mainGrid}>
          {/* Main Form Card */}
          <div style={styles.formCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                {activeTab === "upload" ? "Upload New Notes" : "Edit Notes"}
              </h2>
              <p style={styles.cardSubtitle}>
                {activeTab === "upload" ? "Add new PDF notes to your course" : "Modify existing notes content"}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Course Selection */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Select Course <span style={styles.required}>*</span>
                </label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  style={styles.select}
                >
                  <option value="">-- Select a course --</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title Input */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Notes Title <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., React Hooks Complete Guide"
                  style={styles.input}
                />
              </div>

              {/* File Upload */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  PDF File {activeTab === "upload" && <span style={styles.required}>*</span>}
                </label>
                <div style={styles.fileUploadArea}>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="file-upload" style={styles.fileUploadLabel}>
                    <div style={styles.fileUploadContent}>
                      <span style={styles.uploadIcon}>📄</span>
                      <span>{file ? file.name : "Click or drag to upload PDF"}</span>
                      <span style={styles.uploadIcon}>📤</span>
                    </div>
                  </label>
                </div>
                {file && (
                  <div style={styles.fileSelected}>
                    ✅ File selected: {file.name}
                  </div>
                )}
              </div>

              {/* Existing Note Selection (only for manage tab) */}
              {activeTab === "manage" && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Select Existing Note</label>
                  <select
                    value={selectedNote}
                    onChange={(e) => handleNoteSelect(e.target.value)}
                    style={styles.select}
                  >
                    <option value="">-- Select a note to edit --</option>
                    {notes.map((note) => (
                      <option key={note._id} value={note._id}>
                        {note.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Action Buttons */}
              <div style={styles.buttonGroup}>
                {activeTab === "upload" ? (
                  <button type="submit" disabled={loading} style={styles.uploadButton}>
                    {loading ? "⏳ Uploading..." : "📤 Upload Notes"}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleEditSelected}
                      disabled={loading || !selectedNote}
                      style={styles.editButton}
                    >
                      {loading ? "⏳ Updating..." : "✏️ Update Notes"}
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteSelected}
                      disabled={loading || !selectedNote}
                      style={styles.deleteButton}
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>

          {/* Notes List Sidebar */}
          <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <div style={styles.sidebarTitle}>
                <span style={styles.sidebarIcon}>📋</span>
                <h3 style={styles.sidebarHeading}>Your Notes</h3>
              </div>
              <span style={styles.badge}>{notes.length} notes</span>
            </div>

            <div style={styles.notesList}>
              {notes.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📭</div>
                  <p>No notes uploaded yet</p>
                </div>
              ) : (
                notes.map((note) => (
                  <button
                    key={note._id}
                    onClick={() => {
                      handleNoteSelect(note._id);
                      setActiveTab("manage");
                    }}
                    style={{
                      ...styles.noteItem,
                      ...(selectedNote === note._id ? styles.noteItemActive : {}),
                    }}
                  >
                    <div style={styles.noteIcon}>📄</div>
                    <div style={styles.noteContent}>
                      <div style={{ ...styles.noteTitle, ...(selectedNote === note._id ? styles.noteTitleActive : {}) }}>
                        {note.title}
                      </div>
                      <div style={styles.noteCourse}>
                        {note.courseId?.title || "Unknown Course"}
                      </div>
                    </div>
                    {selectedNote === note._id && (
                      <div style={styles.checkIcon}>✓</div>
                    )}
                  </button>
                ))
              )}
            </div>

            {activeTab === "manage" && selectedNote && (
              <div style={styles.editingIndicator}>
                <span>✏️ Editing: {notes.find(n => n._id === selectedNote)?.title}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <span style={styles.statNumber}>{courses.length}</span>
              <span style={styles.statIcon}>📚</span>
            </div>
            <p style={styles.statLabel}>Total Courses</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <span style={styles.statNumber}>{notes.length}</span>
              <span style={styles.statIcon}>📄</span>
            </div>
            <p style={styles.statLabel}>Total Notes</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  headerIcon: {
    fontSize: "60px",
    marginBottom: "16px",
    display: "inline-block",
    animation: "bounce 2s infinite",
  },
  title: {
    fontSize: "42px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #fff, #e0d4ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "12px",
  },
  subtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.9)",
  },
  tabContainer: {
    display: "flex",
    gap: "12px",
    marginBottom: "32px",
    background: "rgba(255,255,255,0.1)",
    padding: "8px",
    borderRadius: "60px",
    backdropFilter: "blur(10px)",
  },
  tab: {
    flex: 1,
    padding: "14px 24px",
    border: "none",
    borderRadius: "50px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "transparent",
    color: "white",
  },
  activeTab: {
    background: "white",
    color: "#667eea",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 360px",
    gap: "24px",
    marginBottom: "32px",
  },
  formCard: {
    background: "white",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
  cardHeader: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "24px 28px",
    color: "white",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "6px",
  },
  cardSubtitle: {
    fontSize: "14px",
    opacity: 0.9,
  },
  form: {
    padding: "28px",
  },
  formGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  required: {
    color: "#ef4444",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "14px",
    transition: "all 0.3s ease",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "14px",
    transition: "all 0.3s ease",
    outline: "none",
    background: "white",
    cursor: "pointer",
  },
  fileUploadArea: {
    marginTop: "8px",
  },
  fileUploadLabel: {
    display: "block",
    cursor: "pointer",
  },
  fileUploadContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    border: "2px dashed #cbd5e1",
    borderRadius: "12px",
    background: "#f8fafc",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  uploadIcon: {
    fontSize: "20px",
  },
  fileSelected: {
    marginTop: "8px",
    padding: "8px 12px",
    background: "#dcfce7",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#166534",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  uploadButton: {
    flex: 1,
    padding: "14px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  editButton: {
    flex: 1,
    padding: "14px 24px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  deleteButton: {
    flex: 1,
    padding: "14px 24px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  sidebar: {
    background: "white",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    height: "fit-content",
    position: "sticky",
    top: "20px",
  },
  sidebarHeader: {
    background: "#f8fafc",
    padding: "20px 20px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sidebarTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sidebarIcon: {
    fontSize: "20px",
  },
  sidebarHeading: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    margin: 0,
  },
  badge: {
    background: "#e0e7ff",
    color: "#4f46e5",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  notesList: {
    maxHeight: "500px",
    overflowY: "auto",
  },
  noteItem: {
    width: "100%",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "none",
    background: "white",
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderBottom: "1px solid #f0f0f0",
    textAlign: "left",
  },
  noteItemActive: {
    background: "#f0f4ff",
    borderLeft: "4px solid #667eea",
  },
  noteIcon: {
    fontSize: "18px",
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "4px",
  },
  noteTitleActive: {
    color: "#667eea",
  },
  noteCourse: {
    fontSize: "11px",
    color: "#94a3b8",
  },
  checkIcon: {
    color: "#10b981",
    fontWeight: "bold",
    fontSize: "16px",
  },
  emptyState: {
    textAlign: "center",
    padding: "48px 20px",
    color: "#94a3b8",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "12px",
  },
  editingIndicator: {
    padding: "12px 20px",
    background: "#fef3c7",
    borderTop: "1px solid #fde68a",
    fontSize: "13px",
    color: "#92400e",
    textAlign: "center",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
  },
  statCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px 24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  statContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  statNumber: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#667eea",
  },
  statIcon: {
    fontSize: "32px",
  },
  statLabel: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
};

// Add hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }
  button:active {
    transform: translateY(0);
  }
  input:hover, select:hover {
    border-color: #667eea;
  }
  input:focus, select:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  .file-upload-content:hover {
    border-color: #667eea;
    background: #f1f5f9;
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;
document.head.appendChild(styleSheet);

export default TeacherNotes;