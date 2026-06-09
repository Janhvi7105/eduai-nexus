import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import { 
  Plus, 
  Save, 
  Trash2, 
  Copy, 
  AlertCircle,
  HelpCircle
} from "lucide-react";

function MockTest() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // ================= STATES =================
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(30);
  const [passingScore, setPassingScore] = useState(70);
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    },
  ]);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // ================= ADD QUESTION =================
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      },
    ]);
  };

  // ================= REMOVE QUESTION =================
  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    } else {
      alert("You need at least one question!");
    }
  };

  // ================= DUPLICATE QUESTION =================
  const duplicateQuestion = (index) => {
    const questionToDuplicate = { ...questions[index] };
    setQuestions([...questions, questionToDuplicate]);
  };

  // ================= QUESTION CHANGE =================
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
    
    // Clear error for this field
    if (errors[`q${index}_${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`q${index}_${field}`];
      setErrors(newErrors);
    }
  };

  // ================= OPTION CHANGE =================
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Test title is required";
    }
    
    if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    
    questions.forEach((q, qIndex) => {
      if (!q.question.trim()) {
        newErrors[`q${qIndex}_question`] = "Question is required";
      }
      
      q.options.forEach((opt, oIndex) => {
        if (!opt.trim()) {
          newErrors[`q${qIndex}_opt${oIndex}`] = `Option ${oIndex + 1} is required`;
        }
      });
      
      if (!q.explanation.trim()) {
        newErrors[`q${qIndex}_explanation`] = "Explanation is required";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SAVE MOCK TEST =================
  const handleSave = async () => {
    if (!validateForm()) {
      alert("Please fix all errors before saving!");
      return;
    }
    
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      
      await axios.post(
        "/api/mocktest/create",
        {
          courseId,
          title,
          description,
          duration,
          passingScore,
          questions,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      alert("✅ Mock Test Created Successfully!");
      navigate(`/course/${courseId}`);
      
    } catch (error) {
      console.error("MOCK TEST ERROR:", error);
      alert(error.response?.data?.message || "❌ Failed to create mock test");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div style={styles.page}>
        
        {/* Header Section */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>📝 Create Mock Test</h1>
            <p style={styles.subtext}>
              Design practice tests to help students assess their knowledge
            </p>
          </div>
          <div style={styles.headerStats}>
            <div style={styles.statBadge}>
              <HelpCircle size={16} />
              <span>{questions.length} Questions</span>
            </div>
          </div>
        </div>

        {/* Test Settings Card */}
        <div style={styles.settingsCard}>
          <h3 style={styles.sectionTitle}>⚙️ Test Settings</h3>
          <div style={styles.settingsGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mock Test Title *</label>
              <input
                type="text"
                placeholder="e.g., JavaScript Fundamentals Quiz"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ ...styles.input, borderColor: errors.title ? "#ef4444" : "#e2e8f0" }}
              />
              {errors.title && <span style={styles.errorText}>{errors.title}</span>}
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                placeholder="Describe what this test covers..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
                rows="3"
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Duration (minutes)</label>
              <input
                type="number"
                min="1"
                max="180"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                style={styles.input}
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Passing Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div style={styles.questionsHeader}>
          <h3 style={styles.sectionTitle}>📋 Test Questions</h3>
          <button style={styles.addQuestionBtn} onClick={addQuestion}>
            <Plus size={18} />
            Add Question
          </button>
        </div>

        {/* Questions List */}
        {questions.map((question, qIndex) => (
          <div key={qIndex} style={styles.questionCard}>
            <div style={styles.questionHeader}>
              <h2 style={styles.questionHeading}>Question {qIndex + 1}</h2>
              <div style={styles.questionActions}>
                <button
                  style={styles.actionIcon}
                  onClick={() => duplicateQuestion(qIndex)}
                  title="Duplicate"
                >
                  <Copy size={18} />
                </button>
                <button
                  style={{ ...styles.actionIcon, color: "#ef4444" }}
                  onClick={() => removeQuestion(qIndex)}
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            {/* Question Text */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Question *</label>
              <textarea
                placeholder="Enter your question here..."
                value={question.question}
                onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
                style={{
                  ...styles.textarea,
                  borderColor: errors[`q${qIndex}_question`] ? "#ef4444" : "#e2e8f0",
                }}
                rows="2"
              />
              {errors[`q${qIndex}_question`] && (
                <span style={styles.errorText}>{errors[`q${qIndex}_question`]}</span>
              )}
            </div>
            
            {/* Options */}
            <label style={styles.label}>Answer Options *</label>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} style={styles.optionWrapper}>
                <span style={styles.optionLetter}>
                  {String.fromCharCode(65 + oIndex)}.
                </span>
                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  style={{
                    ...styles.input,
                    borderColor: errors[`q${qIndex}_opt${oIndex}`] ? "#ef4444" : "#e2e8f0",
                  }}
                />
                {question.correctAnswer === oIndex && (
                  <span style={styles.correctBadge}>✓ Correct</span>
                )}
              </div>
            ))}
            
            {/* Correct Answer Selection */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Correct Answer *</label>
              <select
                value={question.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "correctAnswer", Number(e.target.value))
                }
                style={styles.select}
              >
                <option value={0}>Option 1 is correct</option>
                <option value={1}>Option 2 is correct</option>
                <option value={2}>Option 3 is correct</option>
                <option value={3}>Option 4 is correct</option>
              </select>
            </div>
            
            {/* Explanation */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Explanation *</label>
              <textarea
                placeholder="Explain why this answer is correct..."
                value={question.explanation}
                onChange={(e) => handleQuestionChange(qIndex, "explanation", e.target.value)}
                style={{
                  ...styles.textarea,
                  borderColor: errors[`q${qIndex}_explanation`] ? "#ef4444" : "#e2e8f0",
                }}
                rows="2"
              />
              {errors[`q${qIndex}_explanation`] && (
                <span style={styles.errorText}>{errors[`q${qIndex}_explanation`]}</span>
              )}
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div style={styles.buttonContainer}>
          <button style={styles.addBtn} onClick={addQuestion}>
            <Plus size={18} />
            Add Another Question
          </button>
          
          <button 
            style={styles.saveBtn} 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <span style={styles.loader}></span>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Mock Test
              </>
            )}
          </button>
        </div>
        
        {/* Tips Card */}
        <div style={styles.tipsCard}>
          <AlertCircle size={20} color="#3b82f6" />
          <div>
            <strong style={styles.tipsTitle}>Pro Tips:</strong>
            <ul style={styles.tipsList}>
              <li>Write clear and unambiguous questions</li>
              <li>Provide detailed explanations for better learning</li>
              <li>Set appropriate duration based on question count</li>
              <li>Ensure only one correct answer per question</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MockTest;

// ================= PROFESSIONAL STYLES =================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "30px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "20px",
  },

  heading: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "8px",
  },

  subtext: {
    color: "#64748b",
    fontSize: "16px",
  },

  headerStats: {
    display: "flex",
    gap: "12px",
  },

  statBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#e2e8f0",
    padding: "8px 16px",
    borderRadius: "12px",
    color: "#475569",
    fontSize: "14px",
    fontWeight: "500",
  },

  settingsCard: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "30px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: "20px",
  },

  settingsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#334155",
  },

  input: {
    padding: "12px 14px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    transition: "all 0.2s",
    outline: "none",
    fontFamily: "inherit",
  },

  textarea: {
    padding: "12px 14px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    transition: "all 0.2s",
    outline: "none",
    fontFamily: "inherit",
    resize: "vertical",
  },

  select: {
    padding: "12px 14px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
    background: "white",
    cursor: "pointer",
  },

  errorText: {
    fontSize: "12px",
    color: "#ef4444",
    marginTop: "4px",
  },

  questionsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  addQuestionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  questionCard: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  questionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  questionHeading: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
  },

  questionActions: {
    display: "flex",
    gap: "8px",
  },

  actionIcon: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    color: "#64748b",
  },

  optionWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },

  optionLetter: {
    fontWeight: "600",
    color: "#64748b",
    minWidth: "30px",
  },

  correctBadge: {
    background: "#d1fae5",
    color: "#059669",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  buttonContainer: {
    display: "flex",
    gap: "16px",
    justifyContent: "flex-end",
    marginTop: "30px",
  },

  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#f1f5f9",
    color: "#475569",
    border: "1px solid #e2e8f0",
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  saveBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    border: "none",
    padding: "12px 32px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  loader: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    display: "inline-block",
  },

  tipsCard: {
    background: "linear-gradient(135deg, #eff6ff, #f0f9ff)",
    borderRadius: "16px",
    padding: "20px",
    marginTop: "30px",
    display: "flex",
    gap: "16px",
    border: "1px solid #bfdbfe",
  },

  tipsTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e40af",
    marginBottom: "8px",
    display: "block",
  },

  tipsList: {
    margin: "0",
    paddingLeft: "20px",
    fontSize: "13px",
    color: "#475569",
    lineHeight: "1.6",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  input:focus, textarea:focus, select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  button:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);