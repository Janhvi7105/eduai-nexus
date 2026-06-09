import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";

function TeacherProfile() {
  // ================= REFS =================
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // ================= THEME =================
  const [theme] = useState(localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  // ================= PROFILE =================
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    experience: "",
    linkedin: "",
    github: "",
    password: "",
    profileImage: "https://api.dicebear.com/7.x/adventurer/svg?seed=teacher",
  });

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile((prev) => ({
          ...prev,
          ...res.data.user,
          profileImage: res.data.user.profileImage || "https://api.dicebear.com/7.x/adventurer/svg?seed=teacher",
        }));
      } catch (err) {
        console.error("PROFILE ERROR:", err);
      }
    };
    fetchProfile();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ================= IMAGE CHANGE =================
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoading(true);
    const imageURL = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, profileImage: imageURL }));
    
    // Simulate upload delay
    setTimeout(() => setImageLoading(false), 500);
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/user/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Profile Updated Successfully");
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const sections = {
    personal: {
      title: "👤 Personal Information",
      icon: "👤",
      fields: ["name", "email", "phone", "bio"]
    },
    professional: {
      title: "💼 Professional Details",
      icon: "💼",
      fields: ["skills", "experience"]
    },
    social: {
      title: "🔗 Social Links",
      icon: "🔗",
      fields: ["linkedin", "github"]
    },
    security: {
      title: "🔒 Security",
      icon: "🔒",
      fields: ["password"]
    }
  };

  const fieldLabels = {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    bio: "Professional Bio",
    skills: "Skills & Expertise",
    experience: "Years of Experience",
    linkedin: "LinkedIn Profile URL",
    github: "GitHub Profile URL",
    password: "New Password"
  };

  const fieldPlaceholders = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 234 567 8900",
    bio: "Experienced educator passionate about teaching computer science...",
    skills: "React, Python, Machine Learning, Web Development",
    experience: "8+ years",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    github: "https://github.com/sarahjohnson",
    password: "Enter new password (leave blank to keep current)"
  };

  return (
    <Layout>
      <div style={styles.page}>
        {/* Background Pattern */}
        <div style={styles.bgPattern}></div>

        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerText}>
              <h1 style={{ ...styles.heading, color: theme === "dark" ? "#fff" : "#1e293b" }}>
                Teacher Profile
              </h1>
              <p style={styles.subtext}>Manage your professional educator identity</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Left Column - Avatar Section */}
          <div style={styles.leftColumn}>
            <div style={{ ...styles.avatarCard, background: theme === "dark" ? "#1e293b" : "#ffffff" }}>
              <div style={styles.avatarWrapper}>
                {imageLoading && <div style={styles.imageLoader}></div>}
                <img
                  src={profile.profileImage}
                  alt="profile"
                  style={styles.avatar}
                  onError={(e) => {
                    e.target.src = "https://api.dicebear.com/7.x/adventurer/svg?seed=teacher";
                  }}
                />
                <div style={styles.cameraOverlay} onClick={() => cameraInputRef.current?.click()}>
                  📷
                </div>
              </div>

              <div style={styles.uploadBtns}>
                <button style={styles.uploadBtn} onClick={() => galleryInputRef.current?.click()}>
                  📁 Gallery
                </button>
                <button style={styles.uploadBtn} onClick={() => cameraInputRef.current?.click()}>
                  📸 Camera
                </button>
              </div>

              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={handleImageChange} />
              <input ref={galleryInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />

              <div style={styles.statsContainer}>
                <div style={styles.statItem}>
                  <span style={styles.statValue}>85%</span>
                  <span style={styles.statLabel}>Profile Complete</span>
                </div>
                <div style={styles.statDivider}></div>
                <div style={styles.statItem}>
                  <span style={styles.statValue}>⭐ 4.8</span>
                  <span style={styles.statLabel}>Teacher Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form Sections */}
          <div style={styles.rightColumn}>
            {/* Section Navigation */}
            <div style={styles.sectionNav}>
              {Object.keys(sections).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  style={{
                    ...styles.navBtn,
                    background: activeSection === key ? "#667eea" : "transparent",
                    color: activeSection === key ? "#fff" : theme === "dark" ? "#94a3b8" : "#64748b",
                  }}
                >
                  <span>{sections[key].icon}</span>
                  <span>{sections[key].title}</span>
                </button>
              ))}
            </div>

            {/* Form Card */}
            <div style={{ ...styles.card, background: theme === "dark" ? "#1e293b" : "#ffffff" }}>
              <div style={styles.cardHeader}>
                <h2 style={{ ...styles.cardTitle, color: theme === "dark" ? "#fff" : "#1e293b" }}>
                  {sections[activeSection].icon} {sections[activeSection].title}
                </h2>
                <div style={styles.cardBadge}>
                  {sections[activeSection].fields.length} fields
                </div>
              </div>

              <div style={styles.formGrid}>
                {sections[activeSection].fields.map((field) => (
                  <div key={field} style={styles.formGroup}>
                    <label style={{ ...styles.label, color: theme === "dark" ? "#cbd5e1" : "#334155" }}>
                      {fieldLabels[field]}
                      {field !== "password" && <span style={styles.required}>*</span>}
                    </label>
                    
                    {field === "bio" ? (
                      <textarea
                        name={field}
                        placeholder={fieldPlaceholders[field]}
                        value={profile[field]}
                        onChange={handleChange}
                        style={{ ...styles.textarea, background: theme === "dark" ? "#0f172a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#1e293b" }}
                        rows={4}
                      />
                    ) : (
                      <input
                        type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={fieldPlaceholders[field]}
                        value={profile[field]}
                        onChange={handleChange}
                        style={{ ...styles.input, background: theme === "dark" ? "#0f172a" : "#f8fafc", color: theme === "dark" ? "#fff" : "#1e293b" }}
                      />
                    )}
                    
                    {field === "password" && (
                      <p style={styles.hintText}>Leave blank to keep your current password</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={styles.actionButtons}>
                <button
                  style={styles.cancelBtn}
                  onClick={() => {
                    setProfile({ ...profile, password: "" });
                  }}
                >
                  Cancel
                </button>
                <button style={styles.saveBtn} onClick={handleSave} disabled={loading}>
                  {loading ? (
                    <>
                      <span style={styles.spinner}></span>
                      Saving...
                    </>
                  ) : (
                    <>💾 Save Profile</>
                  )}
                </button>
              </div>
            </div>

            {/* Preview Card */}
            <div style={{ ...styles.previewCard, background: theme === "dark" ? "#1e293b" : "#ffffff" }}>
              <h3 style={{ ...styles.previewTitle, color: theme === "dark" ? "#fff" : "#1e293b" }}>
                👁️ Profile Preview
              </h3>
              <div style={styles.previewContent}>
                <div style={styles.previewAvatar}>
                  <img src={profile.profileImage} alt="preview" style={styles.previewAvatarImg} />
                </div>
                <div style={styles.previewInfo}>
                  <h4 style={styles.previewName}>{profile.name || "Your Name"}</h4>
                  <p style={styles.previewRole}>Teacher</p>
                  <p style={styles.previewBio}>{profile.bio?.substring(0, 60) || "Add your bio..."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TeacherProfile;

// ================= STYLES =================
const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    paddingBottom: "60px",
  },

  bgPattern: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  header: {
    position: "relative",
    zIndex: 1,
    marginBottom: "40px",
  },

  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  },

  headerText: {
    textAlign: "center",
  },

  heading: {
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtext: {
    fontSize: "16px",
    color: "#94a3b8",
  },

  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: "32px",
    position: "relative",
    zIndex: 1,
  },

  leftColumn: {
    position: "sticky",
    top: "100px",
    alignSelf: "start",
  },

  avatarCard: {
    borderRadius: "24px",
    padding: "32px 24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  avatarWrapper: {
    position: "relative",
    width: "180px",
    height: "180px",
    margin: "0 auto 20px",
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #667eea",
    boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
  },

  imageLoader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.5)",
    zIndex: 2,
  },

  cameraOverlay: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "20px",
    color: "#fff",
    border: "3px solid white",
    transition: "transform 0.2s ease",
    zIndex: 3,
  },

  uploadBtns: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "24px",
  },

  uploadBtn: {
    padding: "10px 20px",
    background: "#f1f5f9",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    color: "#334155",
    transition: "all 0.2s ease",
  },

  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
  },

  statItem: {
    textAlign: "center",
    flex: 1,
  },

  statValue: {
    display: "block",
    fontSize: "18px",
    fontWeight: "700",
    color: "#667eea",
    marginBottom: "4px",
  },

  statLabel: {
    fontSize: "11px",
    color: "#94a3b8",
  },

  statDivider: {
    width: "1px",
    height: "30px",
    background: "#e2e8f0",
  },

  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  sectionNav: {
    display: "flex",
    gap: "8px",
    background: "rgba(255,255,255,0.05)",
    padding: "6px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
  },

  navBtn: {
    flex: 1,
    padding: "12px 16px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease",
  },

  card: {
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    paddingBottom: "16px",
    borderBottom: "2px solid #e2e8f0",
  },

  cardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
  },

  cardBadge: {
    padding: "4px 12px",
    background: "#e0e7ff",
    color: "#667eea",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  formGrid: {
    display: "grid",
    gap: "20px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "600",
  },

  required: {
    color: "#ef4444",
    marginLeft: "4px",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
  },

  textarea: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },

  hintText: {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "4px",
  },

  actionButtons: {
    display: "flex",
    gap: "16px",
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0",
  },

  cancelBtn: {
    flex: 1,
    padding: "14px",
    background: "#f1f5f9",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    color: "#64748b",
    transition: "all 0.2s ease",
  },

  saveBtn: {
    flex: 2,
    padding: "14px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease",
  },

  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },

  previewCard: {
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },

  previewTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "20px",
  },

  previewContent: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },

  previewAvatar: {
    width: "60px",
    height: "60px",
    flexShrink: 0,
  },

  previewAvatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },

  previewInfo: {
    flex: 1,
  },

  previewName: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "4px",
  },

  previewRole: {
    fontSize: "12px",
    color: "#667eea",
    marginBottom: "4px",
  },

  previewBio: {
    fontSize: "12px",
    color: "#94a3b8",
    lineHeight: "1.4",
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
  
  input:focus, textarea:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  .avatar-wrapper:hover .camera-overlay {
    transform: scale(1.1);
  }
`;
document.head.appendChild(styleSheet);