import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/common/Layout";

function AttemptMockTest() {
  const { testId } = useParams();

  // ================= STATES =================
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showReview, setShowReview] = useState(false);

  // ================= FETCH MOCK TEST =================
  useEffect(() => {
    const fetchMockTest = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/mocktest/${testId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTest(res.data.test);
        // Set timer if test has duration (in minutes)
        if (res.data.test.duration) {
          setTimeLeft(res.data.test.duration * 60);
        }
      } catch (error) {
        console.error("FETCH TEST ERROR:", error);
      }
    };
    fetchMockTest();
  }, [testId]);

  // ================= SUBMIT TEST =================
  const handleSubmit = useCallback(() => {
    if (!test) return;
    
    let totalMarks = 0;
    const reviewData = [];
    
    test.questions.forEach((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      if (isCorrect) {
        totalMarks++;
      }
      reviewData.push({
        question: question.question,
        userAnswer: answers[index],
        correctAnswer: question.correctAnswer,
        isCorrect,
        options: question.options
      });
    });
    
    setScore(totalMarks);
    localStorage.setItem(`test_${testId}_review`, JSON.stringify(reviewData));
  }, [test, answers, testId]);

  // ================= TIMER =================
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && score === null) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && score === null) {
      handleSubmit();
    }
  }, [timeLeft, score, handleSubmit]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ================= SELECT ANSWER =================
  const handleAnswer = (optionIndex) => {
    if (score !== null) return;
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  // ================= NEXT QUESTION =================
  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // ================= PREVIOUS QUESTION =================
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const percentage = score !== null ? (score / test?.questions?.length * 100).toFixed(1) : 0;
  const isPassed = percentage >= 40;

  if (!test) {
    return (
      <Layout>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Loading Mock Test...</p>
        </div>
      </Layout>
    );
  }

  const question = test.questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== undefined;

  return (
    <Layout>
      <div style={styles.page}>
        {/* Background Pattern */}
        <div style={styles.bgPattern}></div>

        {/* Header Section */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>📝 {test.title}</h1>
            <p style={styles.subtext}>Test your knowledge and track your progress</p>
          </div>
          {timeLeft !== null && score === null && (
            <div style={{ ...styles.timerBox, background: timeLeft < 60 ? "#ef4444" : "#4f46e5" }}>
              <span style={styles.timerIcon}>⏱️</span>
              <div>
                <div style={styles.timerLabel}>Time Left</div>
                <div style={styles.timerValue}>{formatTime(timeLeft)}</div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {score === null && (
          <div style={styles.progressContainer}>
            <div style={styles.progressInfo}>
              <span>Question {currentQuestion + 1} of {test.questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / test.questions.length) * 100)}% Complete</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${((currentQuestion + 1) / test.questions.length) * 100}%` }}></div>
            </div>
          </div>
        )}

        {/* Result Box */}
        {score !== null && (
          <div style={{ ...styles.resultBox, background: isPassed ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #ef4444, #dc2626)" }}>
            <div style={styles.resultIcon}>{isPassed ? "🎉" : "💪"}</div>
            <h2 style={styles.resultTitle}>
              {isPassed ? "Congratulations! Test Completed" : "Test Completed"}
            </h2>
            <div style={styles.scoreCircle}>
              <div style={styles.scoreValue}>{score}</div>
              <div style={styles.scoreTotal}>/{test.questions.length}</div>
            </div>
            <p style={styles.scorePercentage}>Score: {percentage}%</p>
            <p style={styles.resultMessage}>
              {isPassed 
                ? "Great job! You've passed the test." 
                : "Keep practicing! You'll do better next time."}
            </p>
            <button style={styles.reviewBtn} onClick={() => setShowReview(!showReview)}>
              {showReview ? "Hide Review" : "View Detailed Review"}
            </button>
          </div>
        )}

        {/* Review Section */}
        {showReview && score !== null && (
          <div style={styles.reviewContainer}>
            <h3 style={styles.reviewTitle}>📊 Detailed Review</h3>
            {test.questions.map((q, idx) => {
              const isCorrect = answers[idx] === q.correctAnswer;
              return (
                <div key={idx} style={{ ...styles.reviewCard, borderLeftColor: isCorrect ? "#10b981" : "#ef4444" }}>
                  <div style={styles.reviewHeader}>
                    <span style={styles.reviewQuestion}>Q{idx + 1}. {q.question}</span>
                    <span style={{ ...styles.reviewStatus, color: isCorrect ? "#10b981" : "#ef4444" }}>
                      {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </span>
                  </div>
                  <div style={styles.reviewDetails}>
                    <p><strong>Your Answer:</strong> {answers[idx] !== undefined ? q.options[answers[idx]] : "Not answered"}</p>
                    <p><strong>Correct Answer:</strong> {q.options[q.correctAnswer]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Question Card */}
        {score === null && (
          <div style={styles.questionCard}>
            <div style={styles.questionHeader}>
              <span style={styles.questionNumber}>Question {currentQuestion + 1}</span>
              {isAnswered && <span style={styles.answeredBadge}>✓ Answered</span>}
            </div>
            
            <h2 style={styles.question}>{question.question}</h2>
            
            <div style={styles.optionsGrid}>
              {question.options.map((option, oIndex) => {
                const isSelected = answers[currentQuestion] === oIndex;
                return (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswer(oIndex)}
                    style={{
                      ...styles.option,
                      background: isSelected ? "#4f46e5" : "rgba(255,255,255,0.05)",
                      border: isSelected ? "2px solid #4f46e5" : "1px solid rgba(255,255,255,0.1)",
                      transform: isSelected ? "scale(1.02)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <span style={styles.optionLetter}>{String.fromCharCode(65 + oIndex)}</span>
                    <span style={styles.optionText}>{option}</span>
                    {isSelected && <span style={styles.checkMark}>✓</span>}
                  </button>
                );
              })}
            </div>

            <div style={styles.navigationButtons}>
              <button
                style={{ ...styles.navBtn, ...styles.prevNavBtn, opacity: currentQuestion === 0 ? 0.5 : 1 }}
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>
              
              <div style={styles.questionIndicator}>
                {test.questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestion(idx)}
                    style={{
                      ...styles.indicatorDot,
                      background: answers[idx] !== undefined ? "#4f46e5" : "rgba(255,255,255,0.2)",
                      border: currentQuestion === idx ? "2px solid #4f46e5" : "none",
                      transform: currentQuestion === idx ? "scale(1.2)" : "scale(1)",
                    }}
                  />
                ))}
              </div>

              {currentQuestion < test.questions.length - 1 ? (
                <button style={{ ...styles.navBtn, ...styles.nextNavBtn }} onClick={handleNext}>
                  Next →
                </button>
              ) : (
                <button 
                  style={{ ...styles.submitBtn }} 
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length !== test.questions.length}
                >
                  📝 Submit Test
                </button>
              )}
            </div>

            {Object.keys(answers).length !== test.questions.length && (
              <div style={styles.warningMsg}>
                ⚠️ You have {test.questions.length - Object.keys(answers).length} unanswered question(s)
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AttemptMockTest;

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    padding: "40px",
    color: "#fff",
  },

  bgPattern: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  loadingContainer: {
    textAlign: "center",
    padding: "80px",
    color: "#fff",
  },

  spinner: {
    width: "50px",
    height: "50px",
    border: "3px solid rgba(79, 70, 229, 0.2)",
    borderTopColor: "#4f46e5",
    borderRadius: "50%",
    margin: "0 auto 20px",
    animation: "spin 0.8s linear infinite",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "20px",
    position: "relative",
    zIndex: 1,
  },

  heading: {
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "12px",
    background: "linear-gradient(135deg, #fff, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtext: {
    fontSize: "16px",
    color: "#94a3b8",
  },

  timerBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 24px",
    borderRadius: "16px",
    background: "#4f46e5",
    boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)",
  },

  timerIcon: {
    fontSize: "28px",
  },

  timerLabel: {
    fontSize: "11px",
    opacity: 0.8,
  },

  timerValue: {
    fontSize: "24px",
    fontWeight: "700",
    fontFamily: "monospace",
  },

  progressContainer: {
    marginBottom: "30px",
    position: "relative",
    zIndex: 1,
  },

  progressInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "13px",
    color: "#94a3b8",
  },

  progressBar: {
    height: "6px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "3px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #4f46e5, #a78bfa)",
    borderRadius: "3px",
    transition: "width 0.3s ease",
  },

  resultBox: {
    textAlign: "center",
    padding: "40px",
    borderRadius: "24px",
    marginBottom: "30px",
    position: "relative",
    zIndex: 1,
    animation: "slideUp 0.5s ease",
  },

  resultIcon: {
    fontSize: "64px",
    marginBottom: "16px",
  },

  resultTitle: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  scoreCircle: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "16px",
  },

  scoreValue: {
    fontSize: "64px",
    fontWeight: "800",
  },

  scoreTotal: {
    fontSize: "24px",
    opacity: 0.8,
  },

  scorePercentage: {
    fontSize: "18px",
    marginBottom: "12px",
  },

  resultMessage: {
    fontSize: "14px",
    opacity: 0.9,
    marginBottom: "20px",
  },

  reviewBtn: {
    padding: "10px 24px",
    background: "rgba(255,255,255,0.2)",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },

  reviewContainer: {
    marginBottom: "30px",
    position: "relative",
    zIndex: 1,
  },

  reviewTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
  },

  reviewCard: {
    padding: "16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    marginBottom: "12px",
    borderLeft: "4px solid",
  },

  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    flexWrap: "wrap",
    gap: "8px",
  },

  reviewQuestion: {
    fontSize: "14px",
    fontWeight: "500",
  },

  reviewStatus: {
    fontSize: "12px",
    fontWeight: "600",
  },

  reviewDetails: {
    fontSize: "13px",
    color: "#94a3b8",
  },

  questionCard: {
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(10px)",
    borderRadius: "28px",
    padding: "40px",
    border: "1px solid rgba(255,255,255,0.1)",
    position: "relative",
    zIndex: 1,
  },

  questionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },

  questionNumber: {
    fontSize: "14px",
    color: "#94a3b8",
  },

  answeredBadge: {
    padding: "4px 12px",
    background: "#4f46e5",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
  },

  question: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "32px",
    lineHeight: "1.4",
  },

  optionsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "32px",
  },

  option: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px 20px",
    borderRadius: "16px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "left",
    transition: "all 0.2s ease",
    position: "relative",
  },

  optionLetter: {
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px",
  },

  optionText: {
    flex: 1,
  },

  checkMark: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  },

  navBtn: {
    padding: "12px 28px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },

  prevNavBtn: {
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
  },

  nextNavBtn: {
    background: "#4f46e5",
    color: "#fff",
  },

  submitBtn: {
    padding: "12px 28px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },

  questionIndicator: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  indicatorDot: {
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  warningMsg: {
    marginTop: "20px",
    padding: "12px",
    background: "rgba(245, 158, 11, 0.1)",
    borderRadius: "10px",
    fontSize: "13px",
    color: "#f59e0b",
    textAlign: "center",
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
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  .option:hover {
    transform: translateX(8px);
  }
`;
document.head.appendChild(styleSheet);