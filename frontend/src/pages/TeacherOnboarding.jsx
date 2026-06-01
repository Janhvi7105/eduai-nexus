import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherOnboarding() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState({
    teaching: "",
    video: "",
    audience: "",
  });

  const token = localStorage.getItem("token");

  // ================= SELECT =================
  const handleSelect = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ================= NEXT =================
  const nextStep = () => {
    if (step === 1 && !answers.teaching) {
      alert("Please select an option ❗");
      return;
    }

    if (step === 2 && !answers.video) {
      alert("Please select an option ❗");
      return;
    }

    setStep((prev) => prev + 1);
  };

  // ================= PREVIOUS =================
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  // ================= FINISH =================
  const handleFinish = async () => {
    if (!answers.audience) {
      alert("Please select an option ❗");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        teaching: answers.teaching,
        video: answers.video,
        audience: answers.audience,
      };

      console.log("🚀 SENDING:", payload);

      const res = await axios.post(
        "/api/user/onboarding",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ RESPONSE:", res.data);

      // ✅ Show waiting for approval message
      alert("Application submitted successfully.\nPlease wait for admin approval.");

      // ✅ LOG OUT teacher while waiting for approval
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // ✅ Redirect to home page
      navigate("/");

    } catch (err) {
      console.error("❌ ERROR:", err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server error ❌");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <p style={styles.step}>Step {step} of 3</p>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
            <h2>Share your knowledge</h2>
            <p>What kind of teaching have you done before?</p>

            {[
              "In person, informally",
              "In person, professionally",
              "Online",
              "Other",
            ].map((item) => (
              <div
                key={item}
                onClick={() => handleSelect("teaching", item)}
                style={{
                  ...styles.option,
                  border:
                    answers.teaching === item
                      ? "2px solid #10b981"
                      : "1px solid #ccc",
                }}
              >
                <input
                  type="radio"
                  checked={answers.teaching === item}
                  readOnly
                />
                {item}
              </div>
            ))}
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            <h2>Create a course</h2>
            <p>How much of a video "pro" are you?</p>

            {[
              "I'm a beginner",
              "I have some knowledge",
              "I'm experienced",
              "I have videos ready",
            ].map((item) => (
              <div
                key={item}
                onClick={() => handleSelect("video", item)}
                style={{
                  ...styles.option,
                  border:
                    answers.video === item
                      ? "2px solid #10b981"
                      : "1px solid #ccc",
                }}
              >
                <input
                  type="radio"
                  checked={answers.video === item}
                  readOnly
                />
                {item}
              </div>
            ))}
          </>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <>
            <h2>Expand your reach</h2>
            <p>Do you have an audience?</p>

            {[
              "Not at the moment",
              "Small following",
              "Large audience",
            ].map((item) => (
              <div
                key={item}
                onClick={() => handleSelect("audience", item)}
                style={{
                  ...styles.option,
                  border:
                    answers.audience === item
                      ? "2px solid #10b981"
                      : "1px solid #ccc",
                }}
              >
                <input
                  type="radio"
                  checked={answers.audience === item}
                  readOnly
                />
                {item}
              </div>
            ))}
          </>
        )}

        {/* ================= NAVIGATION ================= */}
        <div style={styles.nav}>
          {step > 1 ? (
            <button style={styles.prev} onClick={prevStep}>
              ← Previous
            </button>
          ) : <div />}

          {step < 3 ? (
            <button style={styles.next} onClick={nextStep}>
              Next →
            </button>
          ) : (
            <button
              style={styles.finish}
              onClick={handleFinish}
              disabled={loading}
            >
              {loading ? "Saving..." : "Finish 🚀"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default TeacherOnboarding;


// ================= STYLES =================
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9fafb",
  },
  card: {
    width: "600px",
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  step: {
    color: "#6b7280",
    marginBottom: "10px",
  },
  option: {
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  nav: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
  },
  prev: {
    padding: "10px",
    background: "#e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
  },
  next: {
    padding: "10px",
    background: "#6366f1",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
  },
  finish: {
    padding: "10px",
    background: "#10b981",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
  },
};