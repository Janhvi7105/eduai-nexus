import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("content");

  const [lecture, setLecture] = useState({
    title: "",
    videoUrl: "",
    duration: "",
  });

  const [sectionTitle, setSectionTitle] = useState("");
  const [editingLecture, setEditingLecture] = useState(null);
  const [editingLectureIndex, setEditingLectureIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editVideoUrl, setEditVideoUrl] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [editSectionTitle, setEditSectionTitle] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  const token = localStorage.getItem("token");
  const theme = localStorage.getItem("theme") || "dark";

  // ================= HANDLE DONE =================
  const handleDone = async () => {
    await Swal.fire({
      icon: "success",
      title: "Course Published Successfully! 🎉",
      text: "Your course is now live and available to students.",
      confirmButtonText: "Go to My Courses",
      background: "#1e293b",
      color: "#fff",
      confirmButtonColor: "#4f46e5",
    });
    navigate("/my-courses");
  };

  // ================= VALIDATE YOUTUBE =================
  const isValidYouTube = (url) => {
    return url.includes("youtube.com/watch?v=") || url.includes("youtu.be/");
  };

  // ================= CONVERT EMBED =================
  const convertToEmbed = (url) => {
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  // ================= FETCH COURSE =================
  const fetchCourse = useCallback(async () => {
    try {
      const res = await axios.get(`/api/courses/${id}`);
      const courseData = res.data.course;

      if (!courseData.sections || courseData.sections.length === 0) {
        courseData.sections = [{ title: "Module 1", lectures: [] }];
      }

      setCourse(courseData);

      const first = courseData.sections?.[0]?.lectures?.[0];
      if (first) setSelectedVideo(first.videoUrl);

      // Initialize expanded sections
      const initialExpanded = {};
      courseData.sections?.forEach((_, idx) => {
        initialExpanded[idx] = true;
      });
      setExpandedSections(initialExpanded);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load course", "error");
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  // ================= ADD MODULE =================
  const handleAddSection = async () => {
    if (!sectionTitle.trim()) {
      Swal.fire("Warning", "Please enter module name", "warning");
      return;
    }

    try {
      await axios.post(
        "/api/courses/add-section",
        { courseId: id, title: sectionTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSectionTitle("");
      fetchCourse();
      Swal.fire("Success", "Module added successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add module", "error");
    }
  };

  // ================= DELETE MODULE =================
  const handleDeleteSection = async (index) => {
    const result = await Swal.fire({
      title: "Delete Module?",
      text: "This will delete all lectures in this module!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
      background: "#1e293b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete("/api/courses/delete-section", {
          data: { courseId: id, sectionIndex: index },
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCourse();
        Swal.fire("Deleted!", "Module has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  // ================= UPDATE SECTION =================
  const handleUpdateSection = async () => {
    try {
      await axios.put(
        "/api/courses/edit-section",
        { courseId: id, sectionIndex: editingSectionIndex, title: editSectionTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingSectionIndex(null);
      fetchCourse();
      Swal.fire("Success", "Module updated successfully", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Update failed", "error");
    }
  };

  // ================= ADD LECTURE =================
  const handleAddLecture = async () => {
    const cleanUrl = lecture.videoUrl.trim();

    if (!lecture.title.trim() || !cleanUrl) {
      Swal.fire("Warning", "Please fill all fields", "warning");
      return;
    }

    if (!cleanUrl.startsWith("https://")) {
      Swal.fire("Warning", "Please paste full YouTube link", "warning");
      return;
    }

    if (!isValidYouTube(cleanUrl)) {
      Swal.fire("Warning", "Please enter a valid YouTube link", "warning");
      return;
    }

    try {
      await axios.post(
        "/api/courses/add-lecture",
        {
          courseId: id,
          sectionIndex: selectedSectionIndex,
          title: lecture.title.trim(),
          videoUrl: convertToEmbed(cleanUrl),
          duration: lecture.duration || "10:00",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Lecture added successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setLecture({ title: "", videoUrl: "", duration: "" });
      fetchCourse();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add lecture", "error");
    }
  };

  // ================= EDIT LECTURE =================
  const handleEditLecture = (lecture, lectureIndex) => {
    setEditingLecture(lecture);
    setEditingLectureIndex(lectureIndex);
    setEditTitle(lecture.title);
    setEditVideoUrl(lecture.videoUrl);
    setEditDuration(lecture.duration || "10:00");
  };

  // ================= DELETE LECTURE =================
  const handleDeleteLecture = async (i) => {
    const result = await Swal.fire({
      title: "Delete Lecture?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
      background: "#1e293b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete("/api/courses/delete-lecture", {
          data: { courseId: id, sectionIndex: selectedSectionIndex, lectureIndex: i },
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCourse();
        Swal.fire("Deleted!", "Lecture has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  // ================= UPDATE LECTURE =================
  const handleUpdateLecture = async () => {
    try {
      await axios.put(
        "/api/courses/edit-lecture",
        {
          courseId: id,
          sectionIndex: selectedSectionIndex,
          lectureIndex: editingLectureIndex,
          title: editTitle,
          videoUrl: editVideoUrl,
          duration: editDuration,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success", "Lecture updated successfully", "success");
      setEditingLecture(null);
      fetchCourse();
    } catch (err) {
      console.log("FULL ERROR:", err);
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const toggleSection = (index) => {
    setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (!course) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}></div>
        <p>Loading course content...</p>
      </div>
    );
  }

  const totalLectures = course.sections?.reduce((acc, sec) => acc + sec.lectures.length, 0) || 0;

  return (
    <div style={{ ...styles.container, background: theme === "dark" ? "#0f172a" : "#f8fafc" }}>
      {/* Sidebar Toggle */}
      <button
        style={{
          ...styles.toggleBtn,
          left: sidebarOpen ? "310px" : "20px",
          background: theme === "dark" ? "#1e293b" : "#ffffff",
          color: theme === "dark" ? "#fff" : "#1e293b",
        }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "◀" : "▶"}
      </button>

      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          width: sidebarOpen ? "320px" : "0",
          padding: sidebarOpen ? "25px" : "0",
          background: theme === "dark" ? "#1e293b" : "#ffffff",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div style={styles.sidebarContent}>
          {/* Back Button */}
          <button onClick={() => navigate("/teacher-dashboard")} style={styles.backBtn}>
            ← Back to Dashboard
          </button>

          {/* Course Title */}
          <h2 style={{ ...styles.sidebarTitle, color: theme === "dark" ? "#fff" : "#1e293b" }}>
            {course.title}
          </h2>

          {/* Stats */}
          <div style={styles.statsBox}>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{course.sections?.length || 0}</span>
              <span style={styles.statLabel}>Modules</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{totalLectures}</span>
              <span style={styles.statLabel}>Lectures</span>
            </div>
          </div>

          {/* Add Module Section */}
          <div style={styles.addModuleSection}>
            <input
              placeholder="New module name..."
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              style={{ ...styles.input, background: theme === "dark" ? "#0f172a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#1e293b" }}
            />
            <button onClick={handleAddSection} style={styles.addModuleBtn}>
              + Add Module
            </button>
          </div>

          {/* Modules List */}
          <div style={styles.modulesList}>
            {course.sections?.map((sec, sIndex) => (
              <div key={sIndex} style={styles.moduleItem}>
                <div style={styles.moduleHeader}>
                  <button
                    style={styles.expandBtn}
                    onClick={() => toggleSection(sIndex)}
                  >
                    {expandedSections[sIndex] ? "▼" : "▶"}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSectionIndex(sIndex);
                      setEditingSectionIndex(sIndex);
                      setEditSectionTitle(sec.title);
                    }}
                    style={{
                      ...styles.moduleTitleBtn,
                      color: selectedSectionIndex === sIndex ? "#4f46e5" : theme === "dark" ? "#cbd5e1" : "#475569",
                      fontWeight: selectedSectionIndex === sIndex ? "bold" : "normal",
                    }}
                  >
                    {sec.title}
                  </button>
                  <div style={styles.moduleActions}>
                    <button
                      onClick={() => {
                        setEditingSectionIndex(sIndex);
                        setEditSectionTitle(sec.title);
                      }}
                      style={styles.editBtn}
                    >
                      ✏️
                    </button>
                    <button onClick={() => handleDeleteSection(sIndex)} style={styles.deleteBtn}>
                      🗑️
                    </button>
                  </div>
                </div>

                {expandedSections[sIndex] && selectedSectionIndex === sIndex && (
                  <div style={styles.lecturesList}>
                    {sec.lectures?.length === 0 ? (
                      <p style={styles.emptyLectures}>No lectures yet. Add your first lecture!</p>
                    ) : (
                      sec.lectures?.map((lec, i) => (
                        <div key={i} style={{ ...styles.lectureItem, background: selectedVideo === lec.videoUrl ? "rgba(79, 70, 229, 0.1)" : "transparent" }}>
                          <div
                            onClick={() => setSelectedVideo(lec.videoUrl)}
                            style={styles.lectureInfo}
                          >
                            <span style={styles.lectureIcon}>▶</span>
                            <span style={styles.lectureTitle}>{lec.title}</span>
                            <span style={styles.lectureDuration}>{lec.duration || "10:00"}</span>
                          </div>
                          <div style={styles.lectureActions}>
                            <button onClick={() => handleEditLecture(lec, i)} style={styles.editBtnSmall}>
                              ✏️
                            </button>
                            <button onClick={() => handleDeleteLecture(i)} style={styles.deleteBtnSmall}>
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ ...styles.content, marginLeft: sidebarOpen ? "320px" : "0" }}>
        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab("content")}
            style={{ ...styles.tab, ...(activeTab === "content" ? styles.activeTab : {}), color: activeTab === "content" ? "#4f46e5" : theme === "dark" ? "#94a3b8" : "#64748b" }}
          >
            📹 Video Content
          </button>
          <button
            onClick={() => setActiveTab("add")}
            style={{ ...styles.tab, ...(activeTab === "add" ? styles.activeTab : {}), color: activeTab === "add" ? "#4f46e5" : theme === "dark" ? "#94a3b8" : "#64748b" }}
          >
            ➕ Add Lecture
          </button>
        </div>

        {/* Video Player */}
        {activeTab === "content" && (
          <div style={styles.videoContainer}>
            {selectedVideo ? (
              <>
                <iframe
                  width="100%"
                  height="500"
                  src={selectedVideo}
                  title="Course Video"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  style={styles.videoPlayer}
                />
                <div style={styles.currentLectureInfo}>
                  <h3 style={{ color: theme === "dark" ? "#fff" : "#1e293b" }}>
                    Currently Playing: Module {selectedSectionIndex + 1}
                  </h3>
                </div>
              </>
            ) : (
              <div style={styles.noVideo}>
                <span style={styles.noVideoIcon}>🎬</span>
                <p>Select a lecture from the sidebar to preview</p>
              </div>
            )}
          </div>
        )}

        {/* Add Lecture Form */}
        {activeTab === "add" && (
          <div style={{ ...styles.addLectureCard, background: theme === "dark" ? "#1e293b" : "#ffffff" }}>
            <h3 style={{ ...styles.formTitle, color: theme === "dark" ? "#fff" : "#1e293b" }}>
              Add New Lecture to Module {selectedSectionIndex + 1}: {course.sections[selectedSectionIndex]?.title}
            </h3>
            
            <div style={styles.formGroup}>
              <input
                style={{ ...styles.inputLarge, background: theme === "dark" ? "#0f172a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#1e293b" }}
                placeholder="Lecture Title"
                value={lecture.title}
                onChange={(e) => setLecture({ ...lecture, title: e.target.value })}
              />
              
              <input
                style={{ ...styles.inputLarge, background: theme === "dark" ? "#0f172a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#1e293b" }}
                placeholder="YouTube URL (e.g., https://youtu.be/... or https://youtube.com/watch?v=...)"
                value={lecture.videoUrl}
                onChange={(e) => setLecture({ ...lecture, videoUrl: e.target.value })}
              />
              
              <input
                style={{ ...styles.inputMedium, background: theme === "dark" ? "#0f172a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#1e293b" }}
                placeholder="Duration (e.g., 15:30)"
                value={lecture.duration}
                onChange={(e) => setLecture({ ...lecture, duration: e.target.value })}
              />
              
              <button onClick={handleAddLecture} style={styles.addLectureBtn}>
                + Add Lecture
              </button>
            </div>

            <div style={styles.tipsBox}>
              <h4>💡 Tips for adding lectures:</h4>
              <ul>
                <li>Use YouTube links for reliable video hosting</li>
                <li>Keep lecture titles clear and descriptive</li>
                <li>Add duration to help students plan their time</li>
                <li>Preview your lecture after adding</li>
              </ul>
            </div>
          </div>
        )}

        {/* Publish Button */}
        <div style={styles.publishContainer}>
          <button onClick={handleDone} style={styles.publishBtn}>
            🚀 Publish Course
          </button>
        </div>
      </div>

      {/* Edit Lecture Modal */}
      {editingLecture && (
        <div style={styles.modalOverlay} onClick={() => setEditingLecture(null)}>
          <div style={{ ...styles.modal, background: theme === "dark" ? "#1e293b" : "#ffffff" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: theme === "dark" ? "#fff" : "#1e293b" }}>✏️ Edit Lecture</h2>
            <input
              placeholder="Lecture Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              style={{ ...styles.modalInput, background: theme === "dark" ? "#0f172a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#1e293b" }}
            />
            <input
              placeholder="YouTube URL"
              value={editVideoUrl}
              onChange={(e) => setEditVideoUrl(e.target.value)}
              style={{ ...styles.modalInput, background: theme === "dark" ? "#0f172a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#1e293b" }}
            />
            <input
              placeholder="Duration"
              value={editDuration}
              onChange={(e) => setEditDuration(e.target.value)}
              style={{ ...styles.modalInput, background: theme === "dark" ? "#0f172a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#1e293b" }}
            />
            <div style={styles.modalButtons}>
              <button onClick={handleUpdateLecture} style={styles.saveModalBtn}>Save Changes</button>
              <button onClick={() => setEditingLecture(null)} style={styles.cancelModalBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Module Modal */}
      {editingSectionIndex !== null && (
        <div style={styles.modalOverlay} onClick={() => setEditingSectionIndex(null)}>
          <div style={{ ...styles.modal, background: theme === "dark" ? "#1e293b" : "#ffffff" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: theme === "dark" ? "#fff" : "#1e293b" }}>✏️ Edit Module</h2>
            <input
              value={editSectionTitle}
              onChange={(e) => setEditSectionTitle(e.target.value)}
              style={{ ...styles.modalInput, background: theme === "dark" ? "#0f172a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#1e293b" }}
            />
            <div style={styles.modalButtons}>
              <button onClick={handleUpdateSection} style={styles.saveModalBtn}>Save</button>
              <button onClick={() => setEditingSectionIndex(null)} style={styles.cancelModalBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCourse;

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    position: "relative",
  },

  toggleBtn: {
    position: "fixed",
    top: "20px",
    zIndex: 100,
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  sidebar: {
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    overflowY: "auto",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 99,
    boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
  },

  sidebarContent: {
    opacity: 1,
    transition: "opacity 0.2s ease",
  },

  backBtn: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },

  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  statsBox: {
    display: "flex",
    gap: "16px",
    padding: "16px",
    background: "rgba(79, 70, 229, 0.1)",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  statItem: {
    flex: 1,
    textAlign: "center",
  },

  statValue: {
    display: "block",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#4f46e5",
  },

  statLabel: {
    fontSize: "11px",
    color: "#94a3b8",
  },

  addModuleSection: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #334155",
    marginBottom: "10px",
    fontSize: "13px",
    outline: "none",
  },

  addModuleBtn: {
    width: "100%",
    padding: "10px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },

  modulesList: {
    marginTop: "10px",
  },

  moduleItem: {
    marginBottom: "16px",
  },

  moduleHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.05)",
  },

  expandBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "10px",
    color: "#4f46e5",
  },

  moduleTitleBtn: {
    flex: 1,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "14px",
    padding: "4px 0",
  },

  moduleActions: {
    display: "flex",
    gap: "6px",
  },

  editBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    padding: "4px",
  },

  deleteBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    padding: "4px",
  },

  lecturesList: {
    marginLeft: "28px",
    marginTop: "8px",
  },

  lectureItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  lectureInfo: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },

  lectureIcon: {
    fontSize: "12px",
    color: "#4f46e5",
  },

  lectureTitle: {
    flex: 1,
    fontSize: "13px",
  },

  lectureDuration: {
    fontSize: "11px",
    color: "#94a3b8",
  },

  lectureActions: {
    display: "flex",
    gap: "6px",
  },

  editBtnSmall: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "11px",
  },

  deleteBtnSmall: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "11px",
  },

  emptyLectures: {
    fontSize: "12px",
    color: "#94a3b8",
    textAlign: "center",
    padding: "12px",
  },

  content: {
    flex: 1,
    padding: "25px 40px",
    overflowY: "auto",
    transition: "margin-left 0.3s ease",
  },

  tabs: {
    display: "flex",
    gap: "12px",
    marginBottom: "30px",
    borderBottom: "1px solid #334155",
  },

  tab: {
    padding: "12px 24px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },

  activeTab: {
    borderBottom: "2px solid #4f46e5",
  },

  videoContainer: {
    marginBottom: "30px",
  },

  videoPlayer: {
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },

  currentLectureInfo: {
    marginTop: "16px",
    padding: "16px",
    background: "rgba(79, 70, 229, 0.1)",
    borderRadius: "12px",
  },

  noVideo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "20px",
    textAlign: "center",
  },

  noVideoIcon: {
    fontSize: "64px",
    marginBottom: "16px",
  },

  addLectureCard: {
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "30px",
  },

  formTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  inputLarge: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #334155",
    fontSize: "14px",
    outline: "none",
  },

  inputMedium: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #334155",
    fontSize: "14px",
    outline: "none",
  },

  addLectureBtn: {
    padding: "14px",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },

  tipsBox: {
    marginTop: "24px",
    padding: "16px",
    background: "rgba(79, 70, 229, 0.08)",
    borderRadius: "12px",
  },

  publishContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #334155",
  },

  publishBtn: {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.2s ease",
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
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },

  modal: {
    width: "90%",
    maxWidth: "500px",
    padding: "30px",
    borderRadius: "20px",
    animation: "slideUp 0.3s ease",
  },

  modalInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #334155",
    marginBottom: "12px",
    fontSize: "14px",
    outline: "none",
  },

  modalButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
  },

  saveModalBtn: {
    flex: 1,
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
  },

  cancelModalBtn: {
    flex: 1,
    padding: "12px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
  },

  loadingContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
    color: "#fff",
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "3px solid rgba(79, 70, 229, 0.2)",
    borderTop: "3px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
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
  
  .lecture-item:hover {
    background: rgba(79, 70, 229, 0.1);
    transform: translateX(4px);
  }
  
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.05);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(79, 70, 229, 0.3);
    border-radius: 10px;
  }
`;
document.head.appendChild(styleSheet);