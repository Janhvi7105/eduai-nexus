import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ================= FETCH COURSES =================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        setCourses(res.data.courses);
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
    
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setOtp("");
    setShowOtpInput(false);
  };

  // ================= SEND OTP =================
  const sendOTP = async () => {
    if (!name) {
      alert("Please enter name ❗");
      return;
    }
    
    if (!email) {
      alert("Please enter email ❗");
      return;
    }
    
    if (!phone) {
      alert("Please enter phone number ❗");
      return;
    }

    try {
      setSendingOtp(true);
      await axios.post("/api/auth/send-otp", { email });
      alert("OTP sent ✅");
      setShowOtpInput(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to send OTP ❌");
    } finally {
      setSendingOtp(false);
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
      setVerifyingOtp(true);

      // ✅ NOW SENDING NAME, EMAIL, PHONE, AND OTP
      const res = await axios.post("/api/auth/verify-otp", {
        name,
        email,
        phone,
        otp,
      });

      // 🔥 SAVE LOGIN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("OTP Verified ✅");

      setShowModal(false);

      // 👉 MOVE TO PAYMENT WITH ALL USER DETAILS
      navigate("/payment", {
        state: {
          course: selectedCourse,
          name,
          email,
          phone,
        },
      });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "OTP verification failed ❌");
    } finally {
      setVerifyingOtp(false);
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
            <h3>Complete Registration</h3>
            
            {!showOtpInput ? (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                />
                
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={styles.input}
                />
                
                <button
                  onClick={sendOTP}
                  disabled={sendingOtp}
                  style={styles.btn}
                >
                  {sendingOtp ? "Sending..." : "Send OTP"}
                </button>
                
                <button 
                  onClick={() => setShowModal(false)} 
                  style={{...styles.btn, background: "#666", marginTop: "10px"}}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p style={{marginBottom: "10px"}}>
                  OTP sent to: <strong>{email}</strong>
                </p>
                
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={styles.input}
                />
                
                <button
                  onClick={verifyOTP}
                  disabled={verifyingOtp}
                  style={styles.btn}
                >
                  {verifyingOtp ? "Verifying..." : "Verify & Continue"}
                </button>
                
                <button 
                  onClick={() => {
                    setShowOtpInput(false);
                    setOtp("");
                  }} 
                  style={{...styles.btn, background: "#666", marginTop: "10px"}}
                >
                  Back
                </button>
              </>
            )}
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
    width: "100%",
  },

  input: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
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
    zIndex: 1000,
  },

  box: {
    background: "#fff",
    padding: 25,
    borderRadius: 10,
    width: "350px",
    maxWidth: "90%",
  },
};