import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import { 
  Clock, 
  HelpCircle, 
  TrendingUp, 
  Award,
  ChevronRight,
  Target,
  Calendar,
  BarChart3,
  BookOpen
} from "lucide-react";

function StudentMockTests() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTests: 0,
    completedTests: 0,
    averageScore: 0,
    totalQuestions: 0
  });

  // ================= FETCH MOCK TESTS =================
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const res = await API.get("/mocktest/all");
        setTests(res.data.tests || []);
        
        // Calculate stats
        const totalQuestions = (res.data.tests || []).reduce(
          (acc, test) => acc + (test.questions?.length || 0),
          0
        );
        setStats({
          totalTests: (res.data.tests || []).length,
          completedTests: (res.data.tests || []).filter(t => t.completed).length,
          averageScore: 78,
          totalQuestions: totalQuestions
        });
        
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Available Now";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get difficulty color
  const getDifficultyColor = (questionsCount) => {
    if (questionsCount <= 10) return "#10b981";
    if (questionsCount <= 20) return "#f59e0b";
    return "#ef4444";
  };

  // Get difficulty text
  const getDifficultyText = (questionsCount) => {
    if (questionsCount <= 10) return "Easy";
    if (questionsCount <= 20) return "Medium";
    return "Hard";
  };

  // Loading skeleton
  if (loading) {
    return (
      <Layout>
        <div style={styles.loadingContainer}>
          <div style={styles.loader}></div>
          <p style={styles.loadingText}>Loading mock tests...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={styles.page}>
        
        {/* Header Section */}
        <div style={styles.headerSection}>
          <div style={styles.headerContent}>
            <div style={styles.headerBadge}>
              <BookOpen size={18} />
              <span>Mock Test</span>
            </div>
            <h1 style={styles.headerTitle}>Static Notation Mock Test</h1>
            <p style={styles.headerSubtitle}>
              Test your knowledge and track your progress
            </p>
          </div>
        </div>

        {/* Stats Section */}
        {tests.length > 0 && (
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#3b82f6" }}>
                <HelpCircle size={22} color="white" />
              </div>
              <div>
                <h3 style={styles.statValue}>{stats.totalTests}</h3>
                <p style={styles.statLabel}>Total Tests</p>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#10b981" }}>
                <TrendingUp size={22} color="white" />
              </div>
              <div>
                <h3 style={styles.statValue}>{stats.averageScore}%</h3>
                <p style={styles.statLabel}>Avg Score</p>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#8b5cf6" }}>
                <Award size={22} color="white" />
              </div>
              <div>
                <h3 style={styles.statValue}>{stats.completedTests}</h3>
                <p style={styles.statLabel}>Completed</p>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#f59e0b" }}>
                <BarChart3 size={22} color="white" />
              </div>
              <div>
                <h3 style={styles.statValue}>{stats.totalQuestions}</h3>
                <p style={styles.statLabel}>Total Qs</p>
              </div>
            </div>
          </div>
        )}

        {/* Tests Grid */}
        {tests.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📭</div>
            <h2 style={styles.emptyTitle}>No Mock Tests Available</h2>
            <p style={styles.emptyText}>
              There are no mock tests available at the moment. Check back later for new practice tests!
            </p>
          </div>
        ) : (
          <div style={styles.testsGrid}>
            {tests.map((test, index) => (
              <div 
                key={test._id} 
                style={{
                  ...styles.testCard,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Question Counter */}
                <div style={styles.questionCounter}>
                  <span>Question 1 of {test.questions?.length || 0}</span>
                </div>

                {/* Question Preview */}
                <div style={styles.questionPreview}>
                  <h3 style={styles.questionTitle}>Question 1</h3>
                  <p style={styles.questionText}>
                    {test.questions?.[0]?.question || "What is the time complexity of Binary Search?"}
                  </p>
                  
                  {/* Options Preview */}
                  <div style={styles.optionsPreview}>
                    {test.questions?.[0]?.options?.map((option, idx) => (
                      <div key={idx} style={styles.optionItem}>
                        <span style={styles.optionLetter}>
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span style={styles.optionText}>{option || `Option ${idx + 1}`}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  style={styles.startBtn}
                  onClick={() => navigate(`/attempt-test/${test._id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {test.completed ? "Retake Test" : "Start Test"}
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tips Section */}
        {tests.length > 0 && (
          <div style={styles.tipsSection}>
            <div style={styles.tipsContent}>
              <div style={styles.tipsIcon}>💡</div>
              <div>
                <h4 style={styles.tipsTitle}>Pro Tips for Success</h4>
                <ul style={styles.tipsList}>
                  <li>Read each question carefully before answering</li>
                  <li>Manage your time wisely - don't spend too long on one question</li>
                  <li>Review your answers before submitting</li>
                  <li>Practice regularly to improve your scores</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default StudentMockTests;

// ================= PROFESSIONAL STYLES =================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "3px solid #e2e8f0",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    marginTop: "16px",
    color: "#64748b",
    fontSize: "14px",
  },

  headerSection: {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    padding: "50px 40px",
    marginBottom: "30px",
  },

  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  headerBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.1)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#a78bfa",
    marginBottom: "16px",
  },

  headerTitle: {
    fontSize: "36px",
    fontWeight: "800",
    color: "white",
    marginBottom: "12px",
  },

  headerSubtitle: {
    fontSize: "16px",
    color: "#94a3b8",
    maxWidth: "600px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto 30px",
    padding: "0 20px",
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
  },

  statLabel: {
    fontSize: "13px",
    color: "#64748b",
  },

  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
    maxWidth: "500px",
    margin: "0 auto",
  },

  emptyIcon: {
    fontSize: "80px",
    marginBottom: "20px",
  },

  emptyTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "12px",
  },

  emptyText: {
    fontSize: "16px",
    color: "#64748b",
  },

  testsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px 40px",
  },

  testCard: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    transition: "all 0.3s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    animation: "fadeInUp 0.5s ease-out forwards",
    opacity: 0,
    transform: "translateY(20px)",
  },

  questionCounter: {
    padding: "8px 16px",
    background: "#f1f5f9",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "20px",
    display: "inline-block",
  },

  questionPreview: {
    marginBottom: "20px",
  },

  questionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "12px",
  },

  questionText: {
    fontSize: "15px",
    color: "#334155",
    marginBottom: "16px",
    lineHeight: "1.6",
  },

  optionsPreview: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "12px",
    background: "#f8fafc",
    borderRadius: "12px",
  },

  optionItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#475569",
  },

  optionLetter: {
    fontWeight: "600",
    color: "#64748b",
    minWidth: "24px",
  },

  optionText: {
    color: "#475569",
  },

  startBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },

  tipsSection: {
    maxWidth: "1200px",
    margin: "0 auto 40px",
    padding: "0 20px",
  },

  tipsContent: {
    background: "linear-gradient(135deg, #eff6ff, #f0f9ff)",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    gap: "16px",
    border: "1px solid #bfdbfe",
  },

  tipsIcon: {
    fontSize: "32px",
  },

  tipsTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e40af",
    marginBottom: "12px",
  },

  tipsList: {
    margin: 0,
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
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .test-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;
document.head.appendChild(styleSheet);