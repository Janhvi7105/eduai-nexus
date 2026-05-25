import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

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

  const token = localStorage.getItem("token");

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

      setLecture({ title: "", videoUrl: "", duration: "" });
      fetchCourse();

    } catch (err) {
      console.error(err);
      alert("Add lecture failed ❌");
    }
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
              <h4
                onClick={() => setSelectedSectionIndex(sIndex)}
                style={{
                  cursor: "pointer",
                  color: selectedSectionIndex === sIndex ? "#00ffcc" : "#aaa",
                }}
              >
                {sec.title}
              </h4>

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

                  <button onClick={() => handleDeleteLecture(i)}>🗑️</button>
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

        {selectedVideo && (
          <iframe
            width="800"
            height="400"
            src={selectedVideo}
            title="video"
            allowFullScreen
          />
        )}

        <h2>Add Lecture (Module {selectedSectionIndex + 1})</h2>

        <input
          placeholder="Title"
          value={lecture.title}
          onChange={(e) =>
            setLecture({ ...lecture, title: e.target.value })
          }
        />

        <input
          placeholder="YouTube URL"
          value={lecture.videoUrl}
          onChange={(e) =>
            setLecture({ ...lecture, videoUrl: e.target.value })
          }
        />

        <button onClick={handleAddLecture}>Add Lecture</button>
      </div>
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
  },

  lectureItem: {
    display: "flex",
    gap: "6px",
    padding: "8px",
  },

  content: {
    flex: 1,
    padding: 20,
  },
};