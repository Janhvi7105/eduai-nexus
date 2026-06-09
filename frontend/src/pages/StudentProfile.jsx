import { useState } from "react";
import Layout from "../components/common/Layout";
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Target, 
  Heart,
  Edit2,
  Save,
  Camera
} from "lucide-react";

function StudentProfile() {
  // ================= STUDENT STATE =================
  const [student, setStudent] = useState({
    name: "Janhvi Ghuikar",
    email: "janhvighuikar@gmail.com",
    mobile: "+91 9876543210",
    education: "B.E Computer Engineering",
    goal: "Become Full Stack Developer",
    interests: "React, Node.js, AI, Cloud Computing",
    bio: "Passionate learner with a keen interest in building scalable web applications. Currently exploring advanced React patterns and cloud architecture.",
    location: "Mumbai, India",
    joiningDate: "January 2025"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState(student);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle cancel edit
  const handleCancel = () => {
    setFormData(student);
    setIsEditing(false);
  };

  // Handle update profile
  const handleUpdate = () => {
    setStudent(formData);
    setIsEditing(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Get initials for avatar
  const getInitials = () => {
    return student.name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <Layout>
      <div style={styles.page}>
        
        {/* Success Toast */}
        {showSuccess && (
          <div style={styles.toast}>
            <span style={styles.toastIcon}>✅</span>
            <span style={styles.toastText}>Profile updated successfully!</span>
          </div>
        )}

        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.avatarSection}>
            <div style={styles.avatar}>
              {getInitials()}
              <div style={styles.cameraIcon}>
                <Camera size={16} color="white" />
              </div>
            </div>
            <div style={styles.statusBadge}>
              <span style={styles.statusDot}></span>
              Active Student
            </div>
          </div>
          
          <div style={styles.headerInfo}>
            <h1 style={styles.heading}>Student Profile</h1>
            <p style={styles.subtext}>
              Manage your personal information and learning preferences
            </p>
          </div>
          
          <button 
            style={isEditing ? styles.saveHeaderBtn : styles.editHeaderBtn}
            onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            {isEditing ? (
              <>
                <Save size={18} />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 size={18} />
                Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#3b82f6" }}>
              <GraduationCap size={22} color="white" />
            </div>
            <div>
              <h3 style={styles.statValue}>4.8</h3>
              <p style={styles.statLabel}>GPA Score</p>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#10b981" }}>
              <Target size={22} color="white" />
            </div>
            <div>
              <h3 style={styles.statValue}>12</h3>
              <p style={styles.statLabel}>Courses Taken</p>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: "#8b5cf6" }}>
              <Heart size={22} color="white" />
            </div>
            <div>
              <h3 style={styles.statValue}>8</h3>
              <p style={styles.statLabel}>Certificates</p>
            </div>
          </div>
        </div>

        {/* Profile Form Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>📋 Personal Information</h2>
            <p style={styles.cardSubtitle}>Update your details below</p>
          </div>

          <div style={styles.formGrid}>
            {/* NAME */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={isEditing ? formData.name : student.name}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  ...styles.input,
                  background: isEditing ? "#1e293b" : "#0f172a",
                  cursor: isEditing ? "text" : "default",
                  opacity: isEditing ? 1 : 0.8,
                }}
              />
            </div>

            {/* EMAIL */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={isEditing ? formData.email : student.email}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  ...styles.input,
                  background: isEditing ? "#1e293b" : "#0f172a",
                  cursor: isEditing ? "text" : "default",
                  opacity: isEditing ? 1 : 0.8,
                }}
              />
            </div>

            {/* MOBILE */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Phone size={16} />
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                value={isEditing ? formData.mobile : student.mobile}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  ...styles.input,
                  background: isEditing ? "#1e293b" : "#0f172a",
                  cursor: isEditing ? "text" : "default",
                  opacity: isEditing ? 1 : 0.8,
                }}
              />
            </div>

            {/* LOCATION */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                📍 Location
              </label>
              <input
                type="text"
                name="location"
                value={isEditing ? formData.location : student.location}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  ...styles.input,
                  background: isEditing ? "#1e293b" : "#0f172a",
                  cursor: isEditing ? "text" : "default",
                  opacity: isEditing ? 1 : 0.8,
                }}
              />
            </div>

            {/* EDUCATION */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <GraduationCap size={16} />
                Education
              </label>
              <input
                type="text"
                name="education"
                value={isEditing ? formData.education : student.education}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  ...styles.input,
                  background: isEditing ? "#1e293b" : "#0f172a",
                  cursor: isEditing ? "text" : "default",
                  opacity: isEditing ? 1 : 0.8,
                }}
              />
            </div>

            {/* JOINING DATE */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                📅 Joined
              </label>
              <input
                type="text"
                name="joiningDate"
                value={isEditing ? formData.joiningDate : student.joiningDate}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  ...styles.input,
                  background: isEditing ? "#1e293b" : "#0f172a",
                  cursor: isEditing ? "text" : "default",
                  opacity: isEditing ? 1 : 0.8,
                }}
              />
            </div>
          </div>

          {/* GOAL */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Target size={16} />
              Learning Goal
            </label>
            <input
              type="text"
              name="goal"
              value={isEditing ? formData.goal : student.goal}
              onChange={handleChange}
              disabled={!isEditing}
              style={{
                ...styles.input,
                background: isEditing ? "#1e293b" : "#0f172a",
                cursor: isEditing ? "text" : "default",
                opacity: isEditing ? 1 : 0.8,
              }}
            />
          </div>

          {/* INTERESTS */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Heart size={16} />
              Interests
            </label>
            <input
              type="text"
              name="interests"
              value={isEditing ? formData.interests : student.interests}
              onChange={handleChange}
              disabled={!isEditing}
              style={{
                ...styles.input,
                background: isEditing ? "#1e293b" : "#0f172a",
                cursor: isEditing ? "text" : "default",
                opacity: isEditing ? 1 : 0.8,
              }}
            />
          </div>

          {/* BIO */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              📝 Bio
            </label>
            <textarea
              name="bio"
              rows="3"
              value={isEditing ? formData.bio : student.bio}
              onChange={handleChange}
              disabled={!isEditing}
              style={{
                ...styles.textarea,
                background: isEditing ? "#1e293b" : "#0f172a",
                cursor: isEditing ? "text" : "default",
                opacity: isEditing ? 1 : 0.8,
              }}
            />
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div style={styles.buttonGroup}>
              <button
                style={styles.cancelBtn}
                onClick={handleCancel}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                Cancel
              </button>
              <button
                style={styles.updateBtn}
                onClick={handleUpdate}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Recent Activity Section */}
        <div style={styles.activitySection}>
          <h3 style={styles.activityTitle}>📊 Recent Activity</h3>
          <div style={styles.activityList}>
            <div style={styles.activityItem}>
              <div style={styles.activityIcon}>✅</div>
              <div style={styles.activityContent}>
                <p style={styles.activityText}>Completed "Advanced React" module</p>
                <span style={styles.activityTime}>2 hours ago</span>
              </div>
            </div>
            <div style={styles.activityItem}>
              <div style={styles.activityIcon}>📝</div>
              <div style={styles.activityContent}>
                <p style={styles.activityText}>Scored 92% in Mock Test</p>
                <span style={styles.activityTime}>Yesterday</span>
              </div>
            </div>
            <div style={styles.activityItem}>
              <div style={styles.activityIcon}>🏆</div>
              <div style={styles.activityContent}>
                <p style={styles.activityText}>Earned "Full Stack Developer" certificate</p>
                <span style={styles.activityTime}>3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default StudentProfile;

// ================= PROFESSIONAL STYLES =================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "30px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  toast: {
    position: "fixed",
    top: "80px",
    right: "20px",
    background: "#10b981",
    color: "white",
    padding: "12px 20px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    zIndex: 1000,
    animation: "slideIn 0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },

  toastIcon: {
    fontSize: "18px",
  },

  toastText: {
    fontSize: "14px",
    fontWeight: "500",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "20px",
  },

  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },

  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "bold",
    color: "white",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },

  cameraIcon: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    background: "#3b82f6",
    borderRadius: "50%",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid white",
  },

  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#d1fae5",
    color: "#059669",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    background: "#10b981",
    borderRadius: "50%",
    display: "inline-block",
    animation: "pulse 2s infinite",
  },

  headerInfo: {
    flex: 1,
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

  editHeaderBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "white",
    border: "2px solid #e2e8f0",
    padding: "10px 24px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#475569",
  },

  saveHeaderBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    border: "none",
    padding: "10px 24px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "white",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
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
    color: "#0f172a",
  },

  statLabel: {
    fontSize: "13px",
    color: "#64748b",
  },

  card: {
    background: "white",
    borderRadius: "24px",
    padding: "30px",
    border: "1px solid #e2e8f0",
    marginBottom: "30px",
  },

  cardHeader: {
    marginBottom: "24px",
  },

  cardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "4px",
  },

  cardSubtitle: {
    fontSize: "14px",
    color: "#64748b",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
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
    color: "#1e293b",
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
    color: "#1e293b",
  },

  buttonGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "flex-end",
    marginTop: "20px",
  },

  cancelBtn: {
    padding: "12px 24px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#475569",
  },

  updateBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 28px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "white",
  },

  activitySection: {
    background: "white",
    borderRadius: "24px",
    padding: "24px",
    border: "1px solid #e2e8f0",
  },

  activityTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: "16px",
  },

  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px",
    background: "#f8fafc",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },

  activityIcon: {
    fontSize: "24px",
  },

  activityContent: {
    flex: 1,
  },

  activityText: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1e293b",
    marginBottom: "4px",
  },

  activityTime: {
    fontSize: "11px",
    color: "#94a3b8",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  input:focus, textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  
  .activity-item:hover {
    transform: translateX(4px);
    background: #f1f5f9;
  }
`;
document.head.appendChild(styleSheet);