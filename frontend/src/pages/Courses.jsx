import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ================= FETCH COURSES =================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        setCourses(res.data.courses); // ✅ FIXED
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  // ================= ENROLL =================
  const handleEnroll = (course) => {
    // 🔥 IF USER ALREADY LOGGED IN → DIRECT PLAYER
    if (token) {
      navigate(`/course-player/${course._id}`);
      return;
    }

    // 🔐 OTHERWISE OTP FLOW
    setSelectedCourse(course);
    setShowModal(true);

    setEmail("");
    setOtp("");
  };

  // ================= SEND OTP =================
  const sendOTP = async () => {
    if (!email) {
      alert("Please enter email ❗");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/auth/send-otp", { email });

      alert("OTP sent ✅");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to send OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOTP = async () => {
    if (!otp) {
      alert("Please enter OTP ❗");
      return;
    }

    if (!selectedCourse?._id) {
      alert("Course not selected ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/verify-otp", {
        email,
        otp,
      });

      // 🔥 SAVE LOGIN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("OTP Verified ✅");

      setShowModal(false);

      // 👉 MOVE TO PAYMENT
      navigate("/payment", {
        state: {
          course: selectedCourse,
          email,
        },
      });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "OTP verification failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📚 Explore Courses</h1>

      <div style={styles.grid}>
        {courses.map((course) => (
          <div key={course._id} style={styles.card}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>₹{course.price}</p>

            <button
              style={styles.btn}
              onClick={() => handleEnroll(course)}
            >
              {token ? "Watch Now 🎬" : "Enroll 🚀"}
            </button>
          </div>
        ))}
      </div>

      {/* ================= OTP MODAL ================= */}
      {showModal && (
        <div style={modal.overlay}>
          <div style={modal.box}>
            <h3>Email Verification</h3>

            <input
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <button onClick={sendOTP} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />

            <button onClick={verifyOTP} disabled={loading}>
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>

            <button onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;


// ================= STYLES =================
const styles = {
  page: { padding: 20 },

  title: {
    textAlign: "center",
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: 20,
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  btn: {
    marginTop: 10,
    padding: 10,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
  },

  input: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
  },
};

const modal = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "300px",
  },
};