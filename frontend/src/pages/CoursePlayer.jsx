import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [activeLecture, setActiveLecture] = useState("");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  const token = localStorage.getItem("token");
  const theme = localStorage.getItem("theme") || "light";

  // ================= FETCH COURSE =================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/course-content/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(res.data.course);
        
        // Initialize expanded sections (all true)
        const initialExpanded = {};
        res.data.course?.sections?.forEach((_, idx) => {
          initialExpanded[idx] = true;
        });
        setExpandedSections(initialExpanded);

        const firstLecture = res.data.course?.sections?.[0]?.lectures?.[0];
        if (firstLecture) {
          setCurrentVideo(firstLecture);
          setActiveLecture(firstLecture.title);
          setCurrentSectionIndex(0);
          setCurrentLectureIndex(0);
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 403 || err.response?.status === 404) {
          alert("Please enroll in this course first ❗");
          navigate("/courses");
        }
      }
    };
    fetchCourse();
  }, [id, token, navigate]);

  // ================= TOTAL LECTURES =================
  const totalLectures = course?.sections?.reduce(
    (acc, section) => acc + section.lectures.length, 0
  ) || 0;

  // ================= CURRENT POSITION =================
  const currentPosition = (() => {
    if (!course) return 0;
    let count = 0;
    for (let i = 0; i < currentSectionIndex; i++) {
      count += course.sections[i].lectures.length;
    }
    count += currentLectureIndex + 1;
    return count;
  })();

  // ================= PROGRESS =================
  const progress = totalLectures > 0 ? Math.round((currentPosition / totalLectures) * 100) : 0;
  const isCompleted = progress === 100;

  // ================= SAVE PROGRESS =================
  const saveProgress = async (lectureIndex) => {
    try {
      await axios.post("/api/progress/save-progress", {
        courseId: id,
        lectureIndex,
        watchedTime: 10,
      }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error("Progress save error:", err);
    }
  };

  // ================= SELECT LECTURE =================
  const selectLecture = (lecture, sIndex, lIndex) => {
    setCurrentVideo(lecture);
    setActiveLecture(lecture.title);
    setCurrentSectionIndex(sIndex);
    setCurrentLectureIndex(lIndex);
    saveProgress(lIndex);
  };

  // ================= NEXT VIDEO =================
  const nextLecture = () => {
    if (!course) return;
    let sIndex = currentSectionIndex;
    let lIndex = currentLectureIndex + 1;
    if (course.sections[sIndex]?.lectures[lIndex]) {
      selectLecture(course.sections[sIndex].lectures[lIndex], sIndex, lIndex);
      return;
    }
    if (course.sections[sIndex + 1]) {
      selectLecture(course.sections[sIndex + 1].lectures[0], sIndex + 1, 0);
    }
  };

  // ================= PREVIOUS VIDEO =================
  const prevLecture = () => {
    if (!course) return;
    let sIndex = currentSectionIndex;
    let lIndex = currentLectureIndex - 1;
    if (lIndex >= 0) {
      selectLecture(course.sections[sIndex].lectures[lIndex], sIndex, lIndex);
      return;
    }
    if (course.sections[sIndex - 1]) {
      const prevSection = course.sections[sIndex - 1];
      const lastLectureIndex = prevSection.lectures.length - 1;
      selectLecture(prevSection.lectures[lastLectureIndex], sIndex - 1, lastLectureIndex);
    }
  };

  const toggleSection = (index) => {
    setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (!course) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loader} />
        <h2 style={styles.loadingText}>Loading Course...</h2>
        <p style={styles.loadingSubtext}>Preparing your learning experience</p>
      </div>
    );
  }

  return (
    <div style={{ ...styles.container, background: theme === "dark" ? "#0f172a" : "#f8fafc" }}>
      {/* Sidebar Toggle Button */}
      <button
        style={{
          ...styles.sidebarToggle,
          left: sidebarOpen ? "330px" : "20px",
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
          width: sidebarOpen ? "380px" : "0",
          padding: sidebarOpen ? "25px" : "0",
          background: theme === "dark" ? "#1e293b" : "#ffffff",
          borderRight: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div style={styles.sidebarContent}>
          {/* Back Button */}
          <button
            style={{ ...styles.backBtn, color: theme === "dark" ? "#f8fafc" : "#1e293b" }}
            onClick={() => navigate("/my-courses")}
          >
            ← Back to My Courses
          </button>

          {/* Course Title */}
          <h1 style={{ ...styles.courseTitle, color: theme === "dark" ? "#fff" : "#1e293b" }}>
            {course.title}
          </h1>

          {/* Progress Section */}
          <div style={styles.progressWrapper}>
            <div style={styles.progressHeader}>
              <span style={{ color: theme === "dark" ? "#cbd5e1" : "#64748b" }}>
                📊 Course Progress
              </span>
              <span style={styles.progressPercent}>{progress}%</span>
            </div>
            <div style={styles.progressContainer}>
              <div style={{ ...styles.progressBar, width: `${progress}%` }} />
            </div>
            <div style={styles.progressStats}>
              <span>✅ {currentPosition} of {totalLectures} lectures completed</span>
            </div>
          </div>

          {/* Certificate Section */}
          {isCompleted && (
            <div style={styles.certificateBox}>
              <div style={styles.certificateIcon}>🏆</div>
              <h3 style={styles.certificateTitle}>Course Completed!</h3>
              <p style={styles.certificateText}>You've mastered this course. Your certificate is ready!</p>
              <button
                style={styles.certificateBtn}
                onClick={() => navigate(`/certificate/${course._id}`)}
              >
                🎓 Download Certificate
              </button>
            </div>
          )}

          {/* Modules Section */}
          <div style={styles.modulesSection}>
            <h3 style={styles.modulesHeader}>📚 Course Content</h3>
            {course.sections.map((section, sIndex) => (
              <div key={sIndex} style={styles.moduleContainer}>
                <button
                  style={styles.moduleHeader}
                  onClick={() => toggleSection(sIndex)}
                >
                  <span style={styles.moduleIcon}>{expandedSections[sIndex] ? "▼" : "▶"}</span>
                  <span style={{ ...styles.moduleTitle, color: theme === "dark" ? "#fff" : "#1e293b" }}>
                    {section.title}
                  </span>
                  <span style={styles.lectureCount}>{section.lectures.length} lectures</span>
                </button>
                
                {expandedSections[sIndex] && (
                  <div style={styles.lecturesList}>
                    {section.lectures.map((lec, lIndex) => {
                      const isActive = activeLecture === lec.title;
                      const isWatched = false; // You can add watched tracking
                      return (
                        <div
                          key={lIndex}
                          style={{
                            ...styles.lecture,
                            background: isActive
                              ? "linear-gradient(135deg, #4f46e5, #6366f1)"
                              : theme === "dark"
                              ? "#0f172a"
                              : "#f8fafc",
                            color: isActive ? "#fff" : theme === "dark" ? "#cbd5e1" : "#475569",
                            borderLeft: isActive ? "4px solid #a5b4fc" : "4px solid transparent",
                          }}
                          onClick={() => selectLecture(lec, sIndex, lIndex)}
                        >
                          <span style={styles.lectureIcon}>{isActive ? "▶" : (isWatched ? "✓" : "○")}</span>
                          <span style={styles.lectureTitle}>{lec.title}</span>
                          <span style={styles.lectureDuration}>{lec.duration || "10:00"}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ ...styles.content, marginLeft: sidebarOpen ? "380px" : "0" }}>
        {/* Top Navigation */}
        <div style={styles.topBar}>
          <button
            style={{ ...styles.navBtn, background: theme === "dark" ? "#1e293b" : "#e2e8f0", color: theme === "dark" ? "#fff" : "#1e293b" }}
            onClick={prevLecture}
          >
            ← Previous Lecture
          </button>
          <div style={styles.lectureCounter}>
            Lecture {currentPosition} of {totalLectures}
          </div>
          <button
            style={{ ...styles.navBtn, background: "#4f46e5", color: "#fff" }}
            onClick={nextLecture}
          >
            Next Lecture →
          </button>
        </div>

        {/* Video Player */}
        <div style={styles.videoWrapper}>
          {currentVideo ? (
            <>
              <iframe
                src={`${currentVideo.videoUrl}?modestbranding=1&rel=0&autoplay=1`}
                title={currentVideo.title}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={styles.video}
              />
              <div style={styles.videoOverlay}>
                <div style={styles.videoBadge}>Now Playing</div>
              </div>
            </>
          ) : (
            <div style={styles.noVideo}>
              <span style={styles.noVideoIcon}>🎬</span>
              <p>Select a lecture to start learning</p>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div style={{ ...styles.videoInfo, background: theme === "dark" ? "#1e293b" : "#ffffff" }}>
          <div style={styles.videoInfoHeader}>
            <h2 style={{ ...styles.videoTitle, color: theme === "dark" ? "#fff" : "#1e293b" }}>
              {currentVideo?.title || "Welcome to the Course"}
            </h2>
            {currentVideo && (
              <div style={styles.videoActions}>
                <button style={styles.actionBtn}>📌 Save for Later</button>
                <button style={styles.actionBtn}>📝 Take Notes</button>
              </div>
            )}
          </div>
          <p style={{ ...styles.videoDesc, color: theme === "dark" ? "#94a3b8" : "#64748b" }}>
            {currentVideo?.description || "Start your learning journey by selecting a lecture from the sidebar. Track your progress and earn a certificate upon completion!"}
          </p>
          <div style={styles.tags}>
            <span style={styles.tag}>📖 Course</span>
            <span style={styles.tag}>🎓 Learning</span>
            <span style={styles.tag}>📹 Video Lecture</span>
          </div>
        </div>

        {/* Next Up Section */}
        {currentVideo && !isCompleted && (
          <div style={{ ...styles.nextUp, background: theme === "dark" ? "#1e293b" : "#ffffff" }}>
            <h4 style={styles.nextUpTitle}>⏩ Next Up</h4>
            <div style={styles.nextUpContent}>
              <div style={styles.nextUpInfo}>
                <p style={styles.nextUpLecture}>
                  {(() => {
                    let nextIndex = currentLectureIndex + 1;
                    if (course.sections[currentSectionIndex]?.lectures[nextIndex]) {
                      return course.sections[currentSectionIndex].lectures[nextIndex].title;
                    } else if (course.sections[currentSectionIndex + 1]) {
                      return course.sections[currentSectionIndex + 1].lectures[0].title;
                    }
                    return "Course completed!";
                  })()}
                </p>
                <button style={styles.nextUpBtn} onClick={nextLecture}>Watch Next →</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePlayer;

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    position: "relative",
  },

  sidebarToggle: {
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
    background: "transparent",
    border: "none",
    marginBottom: "25px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    padding: "8px 0",
    transition: "all 0.2s ease",
  },

  courseTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    lineHeight: "1.3",
  },

  progressWrapper: {
    marginBottom: "35px",
    padding: "20px",
    background: "rgba(79, 70, 229, 0.05)",
    borderRadius: "16px",
  },

  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "13px",
    fontWeight: "600",
  },

  progressPercent: {
    color: "#4f46e5",
    fontWeight: "bold",
  },

  progressContainer: {
    width: "100%",
    height: "8px",
    background: "#334155",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    background: "linear-gradient(135deg, #4f46e5, #a78bfa)",
    transition: "width 0.4s ease",
    borderRadius: "10px",
  },

  progressStats: {
    marginTop: "10px",
    fontSize: "11px",
    color: "#94a3b8",
  },

  certificateBox: {
    background: "linear-gradient(135deg, #f59e0b, #f97316)",
    padding: "24px",
    borderRadius: "20px",
    marginBottom: "30px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(249, 115, 22, 0.35)",
    animation: "pulse 2s infinite",
  },

  certificateIcon: {
    fontSize: "48px",
    marginBottom: "12px",
  },

  certificateTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#fff",
  },

  certificateText: {
    fontSize: "13px",
    marginBottom: "16px",
    color: "rgba(255,255,255,0.9)",
  },

  certificateBtn: {
    background: "#fff",
    color: "#ea580c",
    border: "none",
    padding: "10px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },

  modulesSection: {
    marginTop: "10px",
  },

  modulesHeader: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#4f46e5",
  },

  moduleContainer: {
    marginBottom: "16px",
  },

  moduleHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 0",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },

  moduleIcon: {
    fontSize: "10px",
    color: "#4f46e5",
  },

  moduleTitle: {
    flex: 1,
    textAlign: "left",
  },

  lectureCount: {
    fontSize: "11px",
    color: "#94a3b8",
  },

  lecturesList: {
    marginLeft: "20px",
    marginTop: "8px",
  },

  lecture: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "13px",
  },

  lectureIcon: {
    fontSize: "12px",
  },

  lectureTitle: {
    flex: 1,
  },

  lectureDuration: {
    fontSize: "10px",
    opacity: 0.6,
  },

  content: {
    flex: 1,
    padding: "25px 40px",
    overflowY: "auto",
    transition: "margin-left 0.3s ease",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  navBtn: {
    padding: "10px 20px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },

  lectureCounter: {
    fontSize: "13px",
    color: "#94a3b8",
  },

  videoWrapper: {
    position: "relative",
    width: "100%",
    borderRadius: "24px",
    overflow: "hidden",
    background: "#000",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },

  video: {
    width: "100%",
    height: "65vh",
    border: "none",
  },

  videoOverlay: {
    position: "absolute",
    top: "16px",
    left: "16px",
  },

  videoBadge: {
    padding: "6px 12px",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)",
    borderRadius: "8px",
    fontSize: "11px",
    color: "#fff",
  },

  noVideo: {
    width: "100%",
    height: "65vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    color: "#fff",
  },

  noVideoIcon: {
    fontSize: "64px",
    marginBottom: "16px",
  },

  videoInfo: {
    marginTop: "25px",
    padding: "25px",
    borderRadius: "20px",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  videoInfoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "16px",
  },

  videoTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: 0,
  },

  videoActions: {
    display: "flex",
    gap: "12px",
  },

  actionBtn: {
    padding: "8px 16px",
    background: "rgba(79, 70, 229, 0.1)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    color: "#4f46e5",
    transition: "all 0.2s ease",
  },

  videoDesc: {
    lineHeight: "1.6",
    marginBottom: "20px",
  },

  tags: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  tag: {
    padding: "4px 12px",
    background: "rgba(79, 70, 229, 0.08)",
    borderRadius: "8px",
    fontSize: "11px",
    color: "#4f46e5",
  },

  nextUp: {
    marginTop: "25px",
    padding: "20px",
    borderRadius: "20px",
    transition: "all 0.3s ease",
  },

  nextUpTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#4f46e5",
  },

  nextUpContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nextUpInfo: {
    flex: 1,
  },

  nextUpLecture: {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "8px",
  },

  nextUpBtn: {
    padding: "8px 20px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },

  loadingPage: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
  },

  loader: {
    width: "60px",
    height: "60px",
    border: "3px solid rgba(79, 70, 229, 0.2)",
    borderTop: "3px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    color: "#fff",
    marginTop: "20px",
    fontSize: "24px",
  },

  loadingSubtext: {
    color: "#94a3b8",
    marginTop: "8px",
    fontSize: "14px",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  .lecture:hover {
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
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(79, 70, 229, 0.5);
  }
`;
document.head.appendChild(styleSheet);