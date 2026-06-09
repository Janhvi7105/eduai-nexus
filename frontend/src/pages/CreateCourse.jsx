import { useState } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  AlignLeft, 
  DollarSign, 
  Plus,
  Rocket,
  Zap,
  Award,
  Users
} from "lucide-react";

function CreateCourse() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  // Create course
  const handleCreateCourse = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!courseData.title || !courseData.description || !courseData.price) {
        alert("Please fill all fields ❗");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        "/api/courses/create",
        {
          title: courseData.title,
          description: courseData.description,
          price: Number(courseData.price),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const createdCourse = res.data.course;
      alert("🎉 Course Created Successfully!");
      navigate(`/edit-course/${createdCourse._id}`);

      setCourseData({ title: "", description: "", price: "" });
    } catch (err) {
      console.error("❌ Create Course Error:", err);
      alert(err.response?.data?.message || "Error creating course ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={styles.page}>
        
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <div style={styles.heroBadge}>
            <Zap size={14} />
            <span>Instructor Dashboard</span>
          </div>
          <h1 style={styles.heroTitle}>
            Create New <span style={styles.gradientText}>Course</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Share your knowledge with the world and inspire thousands of students
          </p>
          
          {/* Stats Preview */}
          <div style={styles.statsPreview}>
            <div style={styles.statPreviewItem}>
              <Users size={18} color="#8b5cf6" />
              <span>Reach 10k+ students</span>
            </div>
            <div style={styles.statPreviewItem}>
              <Award size={18} color="#8b5cf6" />
              <span>Earn certification</span>
            </div>
            <div style={styles.statPreviewItem}>
              <Rocket size={18} color="#8b5cf6" />
              <span>Global recognition</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Course Information</h2>
              <p style={styles.formSubtitle}>Fill in the details to create your course</p>
            </div>

            {/* Course Title */}
            <div style={styles.field}>
              <label style={styles.label}>
                <FileText size={16} />
                Course Title
              </label>
              <input
                name="title"
                type="text"
                placeholder="e.g., Master React.js from Scratch"
                value={courseData.title}
                onChange={handleChange}
                onFocus={() => setFocused("title")}
                onBlur={() => setFocused(null)}
                style={{
                  ...styles.input,
                  borderColor: focused === "title" ? "#8b5cf6" : "#e2e8f0",
                  boxShadow: focused === "title" ? "0 0 0 3px rgba(139, 92, 246, 0.1)" : "none",
                }}
              />
              <p style={styles.hint}>A compelling title attracts more students</p>
            </div>

            {/* Course Description */}
            <div style={styles.field}>
              <label style={styles.label}>
                <AlignLeft size={16} />
                Course Description
              </label>
              <textarea
                name="description"
                placeholder="Describe what students will learn, course structure, and key takeaways..."
                value={courseData.description}
                onChange={handleChange}
                onFocus={() => setFocused("description")}
                onBlur={() => setFocused(null)}
                style={{
                  ...styles.textarea,
                  borderColor: focused === "description" ? "#8b5cf6" : "#e2e8f0",
                  boxShadow: focused === "description" ? "0 0 0 3px rgba(139, 92, 246, 0.1)" : "none",
                }}
                rows="5"
              />
              <p style={styles.hint}>Detailed descriptions improve course visibility</p>
            </div>

            {/* Course Price */}
            <div style={styles.field}>
              <label style={styles.label}>
                <DollarSign size={16} />
                Course Price (₹)
              </label>
              <div style={styles.priceWrapper}>
                <span style={styles.pricePrefix}>₹</span>
                <input
                  name="price"
                  type="number"
                  placeholder="0"
                  value={courseData.price}
                  onChange={handleChange}
                  onFocus={() => setFocused("price")}
                  onBlur={() => setFocused(null)}
                  style={{
                    ...styles.priceInput,
                    borderColor: focused === "price" ? "#8b5cf6" : "#e2e8f0",
                    boxShadow: focused === "price" ? "0 0 0 3px rgba(139, 92, 246, 0.1)" : "none",
                  }}
                />
              </div>
              <p style={styles.hint}>Set a fair price for your valuable content</p>
            </div>

            {/* Preview Card */}
            <div style={styles.previewCard}>
              <div style={styles.previewHeader}>
                <span>📋</span>
                <span style={styles.previewTitle}>Course Preview</span>
              </div>
              <div style={styles.previewContent}>
                <h4 style={styles.previewCourseTitle}>
                  {courseData.title || "Your Course Title"}
                </h4>
                <p style={styles.previewDescription}>
                  {courseData.description || "Your course description will appear here..."}
                </p>
                <div style={styles.previewFooter}>
                  <span style={styles.previewPrice}>
                    {courseData.price ? `₹${courseData.price}` : "Free"}
                  </span>
                  <span style={styles.previewBadge}>Draft</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.buttonGroup}>
              <button
                style={styles.cancelBtn}
                onClick={() => navigate("/teacher-dashboard")}
              >
                Cancel
              </button>
              <button
                style={styles.createBtn}
                onClick={handleCreateCourse}
                disabled={loading}
              >
                {loading ? (
                  <span style={styles.loader}></span>
                ) : (
                  <>
                    <Plus size={18} />
                    Create Course
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tips Sidebar */}
          <div style={styles.tipsSidebar}>
            <div style={styles.tipsCard}>
              <h3 style={styles.tipsTitle}>✨ Pro Tips</h3>
              <ul style={styles.tipsList}>
                <li>Use a clear, descriptive title</li>
                <li>Outline learning objectives in description</li>
                <li>Add high-quality course image later</li>
                <li>Price your course competitively</li>
                <li>You can edit all details after creation</li>
              </ul>
            </div>
            <div style={styles.supportCard}>
              <h3 style={styles.supportTitle}>Need Help?</h3>
              <p style={styles.supportText}>
                Our support team is here to help you create amazing courses.
              </p>
              <button style={styles.supportBtn}>Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCourse;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  heroSection: {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    padding: "60px 40px",
    textAlign: "center",
  },

  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.1)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#a78bfa",
    marginBottom: "20px",
  },

  heroTitle: {
    fontSize: "48px",
    fontWeight: "800",
    color: "white",
    marginBottom: "16px",
  },

  gradientText: {
    background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroSubtitle: {
    fontSize: "16px",
    color: "#94a3b8",
    maxWidth: "500px",
    margin: "0 auto 30px",
  },

  statsPreview: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },

  statPreviewItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#cbd5e1",
  },

  formContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: "30px",
    maxWidth: "1200px",
    margin: "-40px auto 0",
    padding: "0 20px 60px",
  },

  formCard: {
    background: "white",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
  },

  formHeader: {
    marginBottom: "28px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e2e8f0",
  },

  formTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "4px",
  },

  formSubtitle: {
    fontSize: "14px",
    color: "#64748b",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "24px",
  },

  label: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    padding: "14px 16px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    transition: "all 0.2s",
    outline: "none",
    fontFamily: "inherit",
  },

  textarea: {
    padding: "14px 16px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    transition: "all 0.2s",
    outline: "none",
    fontFamily: "inherit",
    resize: "vertical",
  },

  hint: {
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "4px",
  },

  priceWrapper: {
    position: "relative",
  },

  pricePrefix: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "16px",
    fontWeight: "600",
    color: "#64748b",
  },

  priceInput: {
    width: "100%",
    padding: "14px 16px 14px 36px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    transition: "all 0.2s",
    outline: "none",
    fontFamily: "inherit",
  },

  previewCard: {
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "20px",
    marginTop: "8px",
    marginBottom: "24px",
    border: "1px solid #e2e8f0",
  },

  previewHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
    fontSize: "13px",
    color: "#64748b",
  },

  previewTitle: {
    fontWeight: "500",
  },

  previewContent: {
    textAlign: "center",
    padding: "20px",
    background: "white",
    borderRadius: "12px",
  },

  previewCourseTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
  },

  previewDescription: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "16px",
    lineHeight: "1.5",
  },

  previewFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "12px",
    borderTop: "1px solid #e2e8f0",
  },

  previewPrice: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#10b981",
  },

  previewBadge: {
    fontSize: "12px",
    padding: "4px 10px",
    background: "#f1f5f9",
    borderRadius: "20px",
    color: "#64748b",
  },

  buttonGroup: {
    display: "flex",
    gap: "16px",
    marginTop: "8px",
  },

  cancelBtn: {
    flex: 1,
    padding: "14px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#475569",
  },

  createBtn: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "white",
  },

  loader: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    display: "inline-block",
  },

  tipsSidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  tipsCard: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.07)",
  },

  tipsTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "16px",
  },

  tipsList: {
    margin: 0,
    paddingLeft: "20px",
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.8",
  },

  supportCard: {
    background: "linear-gradient(135deg, #eff6ff, #f0f9ff)",
    borderRadius: "20px",
    padding: "24px",
    border: "1px solid #bfdbfe",
  },

  supportTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e40af",
    marginBottom: "8px",
  },

  supportText: {
    fontSize: "13px",
    color: "#475569",
    marginBottom: "16px",
    lineHeight: "1.5",
  },

  supportBtn: {
    width: "100%",
    padding: "10px",
    background: "transparent",
    border: "1px solid #3b82f6",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    color: "#3b82f6",
    transition: "all 0.3s ease",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  input:focus, textarea:focus {
    border-color: #8b5cf6;
  }
`;
document.head.appendChild(styleSheet);