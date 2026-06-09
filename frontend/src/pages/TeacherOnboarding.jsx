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

      await axios.post(
        "/api/user/onboarding",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ ONBOARDING COMPLETED");

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

  const stepData = {
    1: {
      title: "Share Your Knowledge",
      subtitle: "Tell us about your teaching experience",
      question: "What kind of teaching have you done before?",
      options: [
        { value: "In person, informally", icon: "🗣️", description: "Casual teaching, tutoring friends or family" },
        { value: "In person, professionally", icon: "🏫", description: "Classroom teaching, workshops, or training" },
        { value: "Online", icon: "💻", description: "YouTube, Zoom classes, or online platforms" },
        { value: "Other", icon: "✨", description: "Other forms of knowledge sharing" },
      ],
      field: "teaching"
    },
    2: {
      title: "Course Creation",
      subtitle: "Let's understand your video skills",
      question: "How much of a video 'pro' are you?",
      options: [
        { value: "I'm a beginner", icon: "🌱", description: "New to video creation, excited to learn" },
        { value: "I have some knowledge", icon: "📹", description: "Basic video editing experience" },
        { value: "I'm experienced", icon: "🎬", description: "Comfortable with professional tools" },
        { value: "I have videos ready", icon: "✅", description: "Content already prepared" },
      ],
      field: "video"
    },
    3: {
      title: "Expand Your Reach",
      subtitle: "Help us understand your audience",
      question: "Do you have an audience?",
      options: [
        { value: "Not at the moment", icon: "🌱", description: "Starting from scratch" },
        { value: "Small following", icon: "👥", description: "Some social media or email list" },
        { value: "Large audience", icon: "🌟", description: "Established community or following" },
      ],
      field: "audience"
    }
  };

  const currentStep = stepData[step];
  const progress = (step / 3) * 100;

  return (
    <div style={styles.container}>
      {/* Background Pattern */}
      <div style={styles.bgPattern}>
        <div style={styles.bgShape1}></div>
        <div style={styles.bgShape2}></div>
        <div style={styles.bgShape3}></div>
      </div>

      <div style={styles.card}>
        {/* Progress Section */}
        <div style={styles.progressSection}>
          <div style={styles.progressHeader}>
            <span style={styles.stepBadge}>Step {step} of 3</span>
            <span style={styles.progressPercent}>{Math.round(progress)}%</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Step Indicator Dots */}
        <div style={styles.stepDots}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                ...styles.stepDot,
                background: step >= s ? "#667eea" : "#e2e8f0",
                transform: step === s ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={styles.content}>
          <div style={styles.iconWrapper}>
            <span style={styles.stepIcon}>
              {step === 1 && "🎓"}
              {step === 2 && "🎬"}
              {step === 3 && "🌍"}
            </span>
          </div>
          
          <h2 style={styles.title}>{currentStep.title}</h2>
          <p style={styles.subtitle}>{currentStep.subtitle}</p>
          
          <div style={styles.questionBox}>
            <span style={styles.questionIcon}>❓</span>
            <p style={styles.question}>{currentStep.question}</p>
          </div>

          <div style={styles.optionsContainer}>
            {currentStep.options.map((option) => {
              const isSelected = answers[currentStep.field] === option.value;
              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(currentStep.field, option.value)}
                  style={{
                    ...styles.option,
                    background: isSelected 
                      ? "linear-gradient(135deg, #667eea15, #764ba215)"
                      : "#fff",
                    border: isSelected
                      ? "2px solid #667eea"
                      : "2px solid #e2e8f0",
                    transform: isSelected ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <div style={styles.optionContent}>
                    <div style={styles.optionIcon}>{option.icon}</div>
                    <div style={styles.optionText}>
                      <div style={styles.optionTitle}>{option.value}</div>
                      <div style={styles.optionDescription}>{option.description}</div>
                    </div>
                    <div style={styles.radioWrapper}>
                      <div
                        style={{
                          ...styles.radio,
                          background: isSelected ? "#667eea" : "#fff",
                          borderColor: isSelected ? "#667eea" : "#cbd5e1",
                        }}
                      >
                        {isSelected && <div style={styles.radioInner}></div>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div style={styles.nav}>
          {step > 1 ? (
            <button style={styles.prevBtn} onClick={prevStep}>
              <span>←</span> Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button style={styles.nextBtn} onClick={nextStep}>
              Next <span>→</span>
            </button>
          ) : (
            <button
              style={styles.finishBtn}
              onClick={handleFinish}
              disabled={loading}
            >
              {loading ? (
                <span style={styles.btnLoader}>
                  <span style={styles.spinner}></span>
                  Submitting...
                </span>
              ) : (
                <>
                  Submit Application <span>🚀</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Trust Badge */}
        <div style={styles.trustBadge}>
          <span>🔒</span>
          <span>Your information is secure</span>
          <span>•</span>
          <span>⏱️ Takes 2 minutes</span>
        </div>
      </div>
    </div>
  );
}

export default TeacherOnboarding;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
  },
  bgPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  bgShape1: {
    position: "absolute",
    top: "-20%",
    right: "-10%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent)",
    animation: "float 8s ease-in-out infinite",
  },
  bgShape2: {
    position: "absolute",
    bottom: "-20%",
    left: "-10%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent)",
    animation: "float 10s ease-in-out infinite reverse",
  },
  bgShape3: {
    position: "absolute",
    top: "50%",
    left: "20%",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.05), transparent)",
    animation: "float 6s ease-in-out infinite",
  },
  card: {
    width: "650px",
    maxWidth: "90%",
    background: "#fff",
    borderRadius: "32px",
    padding: "40px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    position: "relative",
    zIndex: 1,
    animation: "fadeInUp 0.6s ease-out",
  },
  progressSection: {
    marginBottom: "24px",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  stepBadge: {
    padding: "4px 12px",
    background: "#e0e7ff",
    color: "#667eea",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  progressPercent: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#667eea",
  },
  progressBar: {
    height: "6px",
    background: "#e2e8f0",
    borderRadius: "3px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    borderRadius: "3px",
    transition: "width 0.3s ease",
  },
  stepDots: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "32px",
  },
  stepDot: {
    width: "8px",
    height: "8px",
    borderRadius: "4px",
    transition: "all 0.3s ease",
  },
  content: {
    marginBottom: "32px",
  },
  iconWrapper: {
    textAlign: "center",
    marginBottom: "24px",
  },
  stepIcon: {
    fontSize: "48px",
    display: "inline-block",
    animation: "bounce 2s infinite",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    textAlign: "center",
    marginBottom: "32px",
  },
  questionBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    background: "#f8fafc",
    borderRadius: "16px",
    marginBottom: "24px",
  },
  questionIcon: {
    fontSize: "20px",
  },
  question: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
    margin: 0,
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  option: {
    borderRadius: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    overflow: "hidden",
  },
  optionContent: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
  },
  optionIcon: {
    fontSize: "32px",
    width: "48px",
    textAlign: "center",
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "4px",
  },
  optionDescription: {
    fontSize: "11px",
    color: "#94a3b8",
  },
  radioWrapper: {
    display: "flex",
    alignItems: "center",
  },
  radio: {
    width: "20px",
    height: "20px",
    borderRadius: "10px",
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },
  radioInner: {
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    background: "#fff",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
  },
  prevBtn: {
    padding: "12px 24px",
    background: "#f1f5f9",
    color: "#475569",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  nextBtn: {
    padding: "12px 28px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  finishBtn: {
    padding: "12px 28px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  btnLoader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },
  trustBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
    fontSize: "11px",
    color: "#94a3b8",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(-20px) translateX(10px);
    }
    50% {
      transform: translateY(10px) translateX(-10px);
    }
    75% {
      transform: translateY(-10px) translateX(20px);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  .option:hover {
    transform: translateX(4px);
  }
`;
document.head.appendChild(styleSheet);