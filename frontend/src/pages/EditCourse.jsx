import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ NEW

  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

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

  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [editSectionTitle, setEditSectionTitle] = useState("");

  const token = localStorage.getItem("token");

  // ================= HANDLE DONE =================
  const handleDone = async () => {
    await Swal.fire({
      icon: "success",
      title: "Course Created Successfully 🎉",
      text: "Your course is now available.",
      confirmButtonText: "Go To My Courses",
    });

    navigate("/my-courses");
  };

  // ================= VALIDATE YOUTUBE =================
  const isValidYouTube = (url) => {
    return (
      url.includes("youtube.com/watch?v=") ||
      url.includes("youtu.be/")
    );
  };

  // ================= CONVERT EMBED =================
  const convertToEmbed = (url) => {
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
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

    } catch (err) {
      console.error(err);
      alert("Failed to load course ❌");
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  // ================= ADD MODULE =================
  const handleAddSection = async () => {
    if (!sectionTitle.trim()) return alert("Enter module name ❗");

    try {
      await axios.post(
        "/api/courses/add-section",
        { courseId: id, title: sectionTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSectionTitle("");
      fetchCourse();

    } catch (err) {
      console.error(err);
      alert("Failed to add module ❌");
    }
  };

  // ================= DELETE MODULE =================
  const handleDeleteSection = async (index) => {
    try {
      await axios.delete("/api/courses/delete-section", {
        data: { courseId: id, sectionIndex: index },
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCourse();

    } catch (err) {
      console.error(err);
      alert("Delete module failed ❌");
    }
  };

  // ================= UPDATE SECTION =================
  const handleUpdateSection = async () => {
    try {
      await axios.put(
        "/api/courses/edit-section",
        {
          courseId: id,
          sectionIndex: editingSectionIndex,
          title: editSectionTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingSectionIndex(null);
      fetchCourse();
    } catch (err) {
      console.log(err);
      alert("Update Failed ❌");
    }
  };

  // ================= ADD LECTURE =================
  const handleAddLecture = async () => {
    const cleanUrl = lecture.videoUrl.trim();

    if (!lecture.title.trim() || !cleanUrl) {
      return alert("Fill all fields ❗");
    }

    if (!cleanUrl.startsWith("https://")) {
      return alert("Paste full YouTube link ❗");
    }

    if (!isValidYouTube(cleanUrl)) {
      return alert("Enter valid YouTube link ❗");
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Lecture uploaded successfully ✅",
      });

      setLecture({ title: "", videoUrl: "", duration: "" });
      fetchCourse();

    } catch (err) {
      console.error(err);
      alert("Add lecture failed ❌");
    }
  };

  // ================= EDIT LECTURE =================
  const handleEditLecture = (
    lecture,
    lectureIndex
  ) => {

    setEditingLecture(
      lecture
    );

    setEditingLectureIndex(
      lectureIndex
    );

    setEditTitle(
      lecture.title
    );

    setEditVideoUrl(
      lecture.videoUrl
    );
  };

  // ================= DELETE LECTURE =================
  const handleDeleteLecture = async (i) => {
    try {
      await axios.delete("/api/courses/delete-lecture", {
        data: {
          courseId: id,
          sectionIndex: selectedSectionIndex,
          lectureIndex: i,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCourse();

    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Lecture Updated ✅");
      setEditingLecture(null);
      fetchCourse();
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("SERVER ERROR:", err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  if (!course) return <h2>Loading...</h2>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>

        {/* 🔙 BACK BUTTON */}
        <button
          onClick={() => navigate("/teacher-dashboard")}
          style={styles.backBtn}
        >
          ← Back to Dashboard
        </button>

        <h3>Modules</h3>

        {course.sections?.map((sec, sIndex) => (
          <div key={sIndex}>

            <div style={styles.moduleHeader}>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <h4
                  onClick={() => setSelectedSectionIndex(sIndex)}
                  style={{
                    cursor: "pointer",
                    color: selectedSectionIndex === sIndex ? "#00ffcc" : "#aaa",
                  }}
                >
                  {sec.title}
                </h4>

                <button
                  onClick={() => {
                    setEditingSectionIndex(sIndex);
                    setEditSectionTitle(sec.title);
                  }}
                >
                  ✏️
                </button>
              </div>

              <button onClick={() => handleDeleteSection(sIndex)}>🗑️</button>
            </div>

            {selectedSectionIndex === sIndex &&
              (sec.lectures || []).map((lec, i) => (
                <div key={i} style={styles.lectureItem}>

                  <div
                    onClick={() => setSelectedVideo(lec.videoUrl)}
                    style={{
                      cursor: "pointer",
                      flex: 1,
                      padding: "6px",
                      borderRadius: "6px",
                      background:
                        selectedVideo === lec.videoUrl ? "#1f2937" : "transparent",
                    }}
                  >
                    <span
                      style={{
                        color:
                          selectedVideo === lec.videoUrl ? "#00ffcc" : "#ddd",
                      }}
                    >
                      ▶ {lec.title}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                    }}
                  >

                    <button
                      onClick={() =>
                        handleEditLecture(lec, i)
                      }
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteLecture(i)
                      }
                    >
                      🗑️
                    </button>

                  </div>
                </div>
              ))}
          </div>
        ))}

        <input
          placeholder="New Module"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
        />
        <button onClick={handleAddSection}>➕ Add Module</button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>

        {/* Video Player */}
        {selectedVideo && (
          <div style={styles.videoContainer}>
            <iframe
              width="100%"
              height="400"
              src={selectedVideo}
              title="video"
              allowFullScreen
              style={styles.videoPlayer}
            />
          </div>
        )}

        {/* Add Lecture Form */}
        <h2>Add Lecture (Module {selectedSectionIndex + 1})</h2>

        <div style={styles.formGroup}>
          <input
            style={styles.input}
            placeholder="Title"
            value={lecture.title}
            onChange={(e) =>
              setLecture({ ...lecture, title: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="YouTube URL"
            value={lecture.videoUrl}
            onChange={(e) =>
              setLecture({ ...lecture, videoUrl: e.target.value })
            }
          />

          <button onClick={handleAddLecture} style={styles.addLectureBtn}>
            Add Lecture
          </button>
        </div>

        {/* Done Button */}
        <div style={styles.doneContainer}>
          <button onClick={handleDone} style={styles.doneBtn}>
            ✅ Done
          </button>
        </div>

      </div>

      {/* EDIT LECTURE POPUP */}
      {editingLecture && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 999,
            width: "400px",
          }}
        >
          <h2>Edit Lecture</h2>

          <input
            placeholder="Lecture Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
          />

          <input
            placeholder="YouTube URL"
            value={editVideoUrl}
            onChange={(e) => setEditVideoUrl(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
          />

          <button onClick={handleUpdateLecture}>
            Save Changes
          </button>

          <button
            onClick={() => setEditingLecture(null)}
            style={{
              marginLeft: "10px",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* EDIT MODULE POPUP */}
      {editingSectionIndex !== null && (
        <div style={styles.modal}>
          <div style={styles.modalBox}>
            <h2>Edit Module</h2>
            <input
              value={editSectionTitle}
              onChange={(e) => setEditSectionTitle(e.target.value)}
            />
            <button onClick={handleUpdateSection}>
              Save
            </button>
            <button onClick={() => setEditingSectionIndex(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCourse;

const styles = {
  sidebar: {
    width: "300px",
    background: "#111",
    color: "#fff",
    padding: 15,
    overflowY: "auto",
  },

  backBtn: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  moduleHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  lectureItem: {
    display: "flex",
    gap: "6px",
    padding: "8px",
  },

  content: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
  },

  videoContainer: {
    marginBottom: "30px",
  },

  videoPlayer: {
    borderRadius: "10px",
  },

  formGroup: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
  },

  addLectureBtn: {
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  doneContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },

  doneBtn: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },

  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

  modalBox: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    textAlign: "center",
  },
};