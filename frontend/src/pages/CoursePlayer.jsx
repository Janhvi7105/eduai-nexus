import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

function CoursePlayer() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] =
    useState(null);

  const [currentVideo, setCurrentVideo] =
    useState(null);

  const [activeLecture, setActiveLecture] =
    useState("");

  const [
    currentSectionIndex,
    setCurrentSectionIndex,
  ] = useState(0);

  const [
    currentLectureIndex,
    setCurrentLectureIndex,
  ] = useState(0);

  const token =
    localStorage.getItem("token");

  const theme =
    localStorage.getItem("theme") ||
    "light";


  // ================= FETCH COURSE =================
  useEffect(() => {

    const fetchCourse = async () => {

      try {

        const res = await axios.get(
          `/api/courses/${id}`
        );

        setCourse(
          res.data.course
        );

        const firstLecture =
          res.data.course?.sections?.[0]
            ?.lectures?.[0];

        if (firstLecture) {

          setCurrentVideo(
            firstLecture
          );

          setActiveLecture(
            firstLecture.title
          );

          setCurrentSectionIndex(0);

          setCurrentLectureIndex(0);
        }

      } catch (err) {

        console.error(err);
      }
    };

    fetchCourse();

  }, [id]);


  // ================= TOTAL LECTURES =================
  const totalLectures =
    course?.sections?.reduce(
      (acc, section) =>
        acc +
        section.lectures.length,
      0
    ) || 0;


  // ================= CURRENT POSITION =================
  const currentPosition =
    (() => {

      if (!course) return 0;

      let count = 0;

      for (
        let i = 0;
        i < currentSectionIndex;
        i++
      ) {

        count +=
          course.sections[i]
            .lectures.length;
      }

      count +=
        currentLectureIndex + 1;

      return count;

    })();


  // ================= PROGRESS =================
  const progress =
    totalLectures > 0
      ? Math.round(
          (currentPosition /
            totalLectures) *
            100
        )
      : 0;


  // ================= COURSE COMPLETED =================
  const isCompleted =
    progress === 100;


  // ================= SAVE PROGRESS =================
  const saveProgress =
    async (lectureIndex) => {

      try {

        await axios.post(
          "/api/progress/save-progress",
          {
            courseId: id,
            lectureIndex,
            watchedTime: 10,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      } catch (err) {

        console.error(
          "Progress save error:",
          err
        );
      }
    };


  // ================= SELECT LECTURE =================
  const selectLecture = (
    lecture,
    sIndex,
    lIndex
  ) => {

    setCurrentVideo(lecture);

    setActiveLecture(
      lecture.title
    );

    setCurrentSectionIndex(
      sIndex
    );

    setCurrentLectureIndex(
      lIndex
    );

    saveProgress(lIndex);
  };


  // ================= NEXT VIDEO =================
  const nextLecture = () => {

    if (!course) return;

    let sIndex =
      currentSectionIndex;

    let lIndex =
      currentLectureIndex + 1;

    // NEXT IN SAME MODULE
    if (
      course.sections[sIndex]
        .lectures[lIndex]
    ) {

      selectLecture(
        course.sections[sIndex]
          .lectures[lIndex],
        sIndex,
        lIndex
      );

      return;
    }

    // NEXT MODULE
    if (
      course.sections[sIndex + 1]
    ) {

      selectLecture(
        course.sections[sIndex + 1]
          .lectures[0],
        sIndex + 1,
        0
      );
    }
  };


  // ================= PREVIOUS VIDEO =================
  const prevLecture = () => {

    if (!course) return;

    let sIndex =
      currentSectionIndex;

    let lIndex =
      currentLectureIndex - 1;

    // SAME MODULE
    if (lIndex >= 0) {

      selectLecture(
        course.sections[sIndex]
          .lectures[lIndex],
        sIndex,
        lIndex
      );

      return;
    }

    // PREVIOUS MODULE
    if (
      course.sections[sIndex - 1]
    ) {

      const prevSection =
        course.sections[sIndex - 1];

      const lastLectureIndex =
        prevSection.lectures
          .length - 1;

      selectLecture(
        prevSection.lectures[
          lastLectureIndex
        ],
        sIndex - 1,
        lastLectureIndex
      );
    }
  };


  // ================= LOADING =================
  if (!course) {

    return (

      <div style={styles.loadingPage}>

        <div style={styles.loader} />

        <h2 style={styles.loadingText}>
          Loading Course...
        </h2>

      </div>
    );
  }


  return (

    <div
      style={{
        ...styles.container,

        background:
          theme === "dark"
            ? "#0f172a"
            : "#f8fafc",
      }}
    >


      {/* ================= SIDEBAR ================= */}
      <div
        style={{
          ...styles.sidebar,

          background:
            theme === "dark"
              ? "#111827"
              : "#ffffff",

          borderRight:
            theme === "dark"
              ? "1px solid #1e293b"
              : "1px solid #e5e7eb",
        }}
      >

        {/* BACK */}
        <button
          style={{
            ...styles.backBtn,

            color:
              theme === "dark"
                ? "#f8fafc"
                : "#111827",
          }}

          onClick={() =>
            navigate("/my-courses")
          }
        >
          ← Back to courses
        </button>


        {/* COURSE TITLE */}
        <h1
          style={{
            ...styles.courseTitle,

            color:
              theme === "dark"
                ? "#f8fafc"
                : "#111827",
          }}
        >
          {course.title}
        </h1>


        {/* ================= PROGRESS ================= */}
        <div style={styles.progressWrapper}>

          <div style={styles.progressHeader}>

            <span
              style={{
                color:
                  theme === "dark"
                    ? "#f8fafc"
                    : "#111827",
              }}
            >
              Course Progress
            </span>

            <span
              style={
                styles.progressPercent
              }
            >
              {progress}%
            </span>

          </div>


          <div
            style={
              styles.progressContainer
            }
          >

            <div
              style={{
                ...styles.progressBar,

                width:
                  `${progress}%`,
              }}
            />

          </div>

        </div>


        {/* ================= CERTIFICATE ================= */}
        {isCompleted && (

          <div
            style={
              styles.certificateBox
            }
          >

            <h3
              style={
                styles.certificateTitle
              }
            >
              🎉 Course Completed!
            </h3>

            <p
              style={
                styles.certificateText
              }
            >
              Your certificate is ready 🚀
            </p>

            <button
              style={
                styles.certificateBtn
              }

              onClick={() =>
                navigate(
                  `/certificate/${course._id}`
                )
              }
            >
              📜 Download Certificate
            </button>

          </div>
        )}


        {/* ================= MODULES ================= */}
        {course.sections.map(
          (
            section,
            sIndex
          ) => (

            <div key={sIndex}>

              <h3
                style={
                  styles.moduleTitle
                }
              >
                {section.title}
              </h3>

              {section.lectures.map(
                (
                  lec,
                  lIndex
                ) => (

                  <div
                    key={lIndex}

                    style={
                      activeLecture ===
                      lec.title
                        ? styles.activeLecture
                        : {
                            ...styles.lecture,

                            background:
                              theme ===
                              "dark"
                                ? "#0f172a"
                                : "#f8fafc",

                            color:
                              theme ===
                              "dark"
                                ? "#f8fafc"
                                : "#111827",
                          }
                    }

                    onClick={() =>
                      selectLecture(
                        lec,
                        sIndex,
                        lIndex
                      )
                    }
                  >

                    ▶ {lec.title}

                  </div>
                )
              )}

            </div>
          )
        )}

      </div>


      {/* ================= CONTENT ================= */}
      <div style={styles.content}>


        {/* ================= TOP BAR ================= */}
        <div style={styles.topBar}>


          <button
            style={styles.navBtn}
            onClick={prevLecture}
          >
            ‹ Previous
          </button>


          <button
            style={styles.navBtn}
            onClick={nextLecture}
          >
            Next ›
          </button>

        </div>


        {/* ================= VIDEO ================= */}
        <div style={styles.videoWrapper}>

          {currentVideo ? (

            <iframe
              src={`${currentVideo.videoUrl}?modestbranding=1&rel=0`}
              title="Course Video"
              allowFullScreen
              style={styles.video}
            />

          ) : (

            <p>No video selected</p>
          )}

        </div>


        {/* ================= VIDEO INFO ================= */}
        <div
          style={{
            ...styles.videoInfo,

            background:
              theme === "dark"
                ? "#111827"
                : "#ffffff",
          }}
        >

          <h2
            style={{
              ...styles.videoTitle,

              color:
                theme === "dark"
                  ? "#f8fafc"
                  : "#111827",
            }}
          >
            {currentVideo?.title}
          </h2>

          <p style={styles.videoDesc}>
            Continue learning and complete your course progress 🚀
          </p>

        </div>

      </div>

    </div>
  );
}

export default CoursePlayer;


// ================= STYLES =================
const styles = {

  container: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },

  sidebar: {
    width: "360px",
    padding: "25px",
    overflowY: "auto",
    transition: "0.3s",
  },

  backBtn: {
    background: "transparent",
    border: "none",
    marginBottom: "25px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },

  courseTitle: {
    fontSize: "34px",
    fontWeight: "bold",
    marginBottom: "30px",
    lineHeight: "1.3",
  },

  progressWrapper: {
    marginBottom: "35px",
  },

  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontWeight: "600",
  },

  progressPercent: {
    color: "#6366f1",
    fontWeight: "bold",
  },

  progressContainer: {
    width: "100%",
    height: "10px",
    background: "#334155",
    borderRadius: "20px",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    background:
      "linear-gradient(135deg,#6366f1,#8b5cf6)",
    transition: "0.4s",
  },

  // ================= CERTIFICATE =================
  certificateBox: {
    background:
      "linear-gradient(135deg,#f59e0b,#f97316)",

    padding: "22px",

    borderRadius: "18px",

    marginBottom: "30px",

    color: "#fff",

    textAlign: "center",

    boxShadow:
      "0 10px 30px rgba(249,115,22,0.35)",
  },

  certificateTitle: {
    fontSize: "24px",
    marginBottom: "10px",
  },

  certificateText: {
    marginBottom: "18px",
    lineHeight: "1.6",
  },

  certificateBtn: {
    background: "#ffffff",
    color: "#ea580c",
    border: "none",
    padding: "14px 20px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
  },

  moduleTitle: {
    marginBottom: "15px",
    marginTop: "25px",
    color: "#94a3b8",
    fontSize: "18px",
    fontWeight: "bold",
  },

  lecture: {
    padding: "15px",
    borderRadius: "14px",
    marginBottom: "12px",
    cursor: "pointer",
    transition: "0.3s",
    border:
      "1px solid rgba(255,255,255,0.08)",
    fontWeight: "500",
  },

  activeLecture: {
    padding: "15px",
    borderRadius: "14px",
    marginBottom: "12px",
    cursor: "pointer",
    background:
      "linear-gradient(135deg,#4f46e5,#6366f1)",
    color: "#fff",
    borderLeft: "5px solid #a5b4fc",
    transition: "0.3s",
    fontWeight: "600",
    boxShadow:
      "0 8px 20px rgba(99,102,241,0.3)",
  },

  content: {
    flex: 1,
    padding: "25px",
    overflowY: "auto",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  navBtn: {
    background:
      "linear-gradient(135deg,#111827,#1e293b)",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },

  videoWrapper: {
    width: "100%",
    borderRadius: "22px",
    overflow: "hidden",
    background: "#000",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.25)",
  },

  video: {
    width: "100%",
    height: "78vh",
    border: "none",
  },

  videoInfo: {
    marginTop: "20px",
    padding: "25px",
    borderRadius: "22px",
    transition: "0.3s",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.15)",
  },

  videoTitle: {
    fontSize: "34px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  videoDesc: {
    color: "#94a3b8",
    lineHeight: "1.7",
  },

  loadingPage: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },

  loader: {
    width: "60px",
    height: "60px",
    border: "5px solid #334155",
    borderTop: "5px solid #6366f1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    color: "#fff",
    marginTop: "20px",
    fontSize: "24px",
  },
};