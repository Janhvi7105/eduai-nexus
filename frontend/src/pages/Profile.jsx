import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";

function Profile() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("account");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ================= LOAD PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);

        setForm({
          firstName: res.data.user.firstName || res.data.user.name?.split(' ')[0] || "",
          lastName: res.data.user.lastName || res.data.user.name?.split(' ')[1] || "",
          phone: res.data.user.phone || "",
          city: res.data.user.city || "",
          bio: res.data.user.bio || "",
        });

      } catch (err) {
        console.error(err);
        alert("Failed to load profile ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= UPDATE PROFILE =================
  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "/api/user/update-profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated ✅");

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

    } catch (err) {
      alert("Update failed ❌");
    } finally {
      setUpdating(false);
    }
  };

  // ================= UPDATE PASSWORD =================
  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters ❌");
      return;
    }

    setUpdating(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "/api/user/update-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password updated successfully 🔐");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      alert(err.response?.data?.message || "Error updating password ❌");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={styles.container}>
        {/* Background Pattern */}
        <div style={styles.bgPattern}></div>

        {/* LEFT CARD - Profile Sidebar */}
        <div style={styles.leftCard}>
          <div style={styles.avatarWrapper}>
            <div style={styles.avatar}>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div style={styles.onlineDot}></div>
          </div>

          <h3 style={styles.userName}>{user?.name || "User"}</h3>
          <p style={styles.userEmail}>{user?.email || "user@example.com"}</p>

          <div style={styles.roleBadge}>
            <span style={styles.roleIcon}>👤</span>
            <span>{user?.role || "Student"}</span>
          </div>

          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>5</div>
              <div style={styles.statLabel}>Courses</div>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>2</div>
              <div style={styles.statLabel}>Exams</div>
            </div>
            <div style={styles.statDivider}></div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>80%</div>
              <div style={styles.statLabel}>Progress</div>
            </div>
          </div>

          <div style={styles.memberSince}>
            <span>📅 Member since 2024</span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div style={styles.rightSection}>
          {/* TABS */}
          <div style={styles.tabs}>
            <button
              onClick={() => setTab("account")}
              style={{
                ...styles.tab,
                ...(tab === "account" ? styles.activeTab : {}),
              }}
            >
              <span>👤</span> Account
            </button>
            <button
              onClick={() => setTab("security")}
              style={{
                ...styles.tab,
                ...(tab === "security" ? styles.activeTab : {}),
              }}
            >
              <span>🔒</span> Security
            </button>
            <button
              onClick={() => setTab("stats")}
              style={{
                ...styles.tab,
                ...(tab === "stats" ? styles.activeTab : {}),
              }}
            >
              <span>📊</span> Stats
            </button>
          </div>

          {/* ACCOUNT TAB */}
          {tab === "account" && (
            <div style={styles.formContainer}>
              <h3 style={styles.formTitle}>Personal Information</h3>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>First Name</label>
                  <input
                    placeholder="Enter first name"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Last Name</label>
                  <input
                    placeholder="Enter last name"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    value={user?.email}
                    disabled
                    style={{ ...styles.input, ...styles.disabledInput }}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>City</label>
                  <input
                    placeholder="Enter your city"
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroupFull}>
                  <label style={styles.label}>Bio</label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={form.bio}
                    onChange={(e) =>
                      setForm({ ...form, bio: e.target.value })
                    }
                    rows={4}
                    style={styles.textarea}
                  />
                </div>
              </div>

              <button
                style={styles.saveBtn}
                onClick={handleUpdateProfile}
                disabled={updating}
              >
                {updating ? (
                  <span style={styles.btnLoader}>
                    <span style={styles.btnSpinner}></span>
                    Updating...
                  </span>
                ) : (
                  "💾 Update Profile"
                )}
              </button>
            </div>
          )}

          {/* SECURITY TAB */}
          {tab === "security" && (
            <div style={styles.formContainer}>
              <h3 style={styles.formTitle}>Change Password</h3>
              <div style={styles.securityInfo}>
                <div style={styles.securityIcon}>🔐</div>
                <p>Choose a strong password with at least 6 characters</p>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  style={styles.input}
                />
                <p style={styles.hintText}>Minimum 6 characters</p>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  style={styles.input}
                />
              </div>

              <button
                style={styles.saveBtn}
                onClick={handleUpdatePassword}
                disabled={updating}
              >
                {updating ? (
                  <span style={styles.btnLoader}>
                    <span style={styles.btnSpinner}></span>
                    Updating...
                  </span>
                ) : (
                  "🔒 Update Password"
                )}
              </button>
            </div>
          )}

          {/* STATS TAB */}
          {tab === "stats" && (
            <div style={styles.statsContainer}>
              <h3 style={styles.formTitle}>Learning Statistics</h3>
              
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statCardIcon}>📚</div>
                  <div style={styles.statCardNumber}>5</div>
                  <div style={styles.statCardLabel}>Courses Enrolled</div>
                </div>
                
                <div style={styles.statCard}>
                  <div style={styles.statCardIcon}>📝</div>
                  <div style={styles.statCardNumber}>2</div>
                  <div style={styles.statCardLabel}>Exams Attempted</div>
                </div>
                
                <div style={styles.statCard}>
                  <div style={styles.statCardIcon}>📈</div>
                  <div style={styles.statCardNumber}>80%</div>
                  <div style={styles.statCardLabel}>Overall Progress</div>
                </div>
                
                <div style={styles.statCard}>
                  <div style={styles.statCardIcon}>⭐</div>
                  <div style={styles.statCardNumber}>4.8</div>
                  <div style={styles.statCardLabel}>Average Rating</div>
                </div>
              </div>

              <div style={styles.progressSection}>
                <h4 style={styles.progressTitle}>Course Completion</h4>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: "80%" }}></div>
                </div>
                <p style={styles.progressText}>80% complete • 4 of 5 courses finished</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;

const styles = {
  container: {
    display: "flex",
    gap: "28px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    position: "relative",
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
  loadingContainer: {
    textAlign: "center",
    padding: "60px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid rgba(102, 126, 234, 0.2)",
    borderTopColor: "#667eea",
    borderRadius: "50%",
    margin: "0 auto 16px",
    animation: "spin 0.8s linear infinite",
  },
  leftCard: {
    width: "280px",
    background: "#fff",
    borderRadius: "24px",
    padding: "32px 24px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    position: "relative",
    zIndex: 1,
    height: "fit-content",
    transition: "transform 0.3s ease",
  },
  avatarWrapper: {
    position: "relative",
    display: "inline-block",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
    fontWeight: "bold",
    margin: "0 auto 16px",
    boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
  },
  onlineDot: {
    position: "absolute",
    bottom: "12px",
    right: "0",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#10b981",
    border: "3px solid #fff",
  },
  userName: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "4px",
  },
  userEmail: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "12px",
  },
  roleBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    background: "#e0e7ff",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#667eea",
    marginBottom: "24px",
  },
  roleIcon: {
    fontSize: "12px",
  },
  stats: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
    marginBottom: "20px",
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#667eea",
  },
  statLabel: {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "4px",
  },
  statDivider: {
    width: "1px",
    height: "30px",
    background: "#e5e7eb",
  },
  memberSince: {
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
    fontSize: "12px",
    color: "#94a3b8",
  },
  rightSection: {
    flex: 1,
    background: "#fff",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    position: "relative",
    zIndex: 1,
  },
  tabs: {
    display: "flex",
    gap: "12px",
    marginBottom: "28px",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "8px",
  },
  tab: {
    padding: "10px 24px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#6b7280",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "8px",
  },
  activeTab: {
    color: "#667eea",
    background: "#e0e7ff",
  },
  formContainer: {
    animation: "fadeIn 0.3s ease",
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "24px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  inputGroupFull: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    gridColumn: "span 2",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    fontSize: "14px",
    transition: "all 0.2s ease",
    outline: "none",
    fontFamily: "inherit",
  },
  disabledInput: {
    background: "#f9fafb",
    color: "#6b7280",
    cursor: "not-allowed",
  },
  textarea: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    fontSize: "14px",
    transition: "all 0.2s ease",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
  },
  securityInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    background: "#fef3c7",
    borderRadius: "12px",
    marginBottom: "24px",
  },
  securityIcon: {
    fontSize: "28px",
  },
  hintText: {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "4px",
  },
  saveBtn: {
    marginTop: "24px",
    padding: "14px 28px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    width: "100%",
  },
  btnLoader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  btnSpinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  statsContainer: {
    animation: "fadeIn 0.3s ease",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  statCard: {
    textAlign: "center",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "16px",
    transition: "all 0.2s ease",
  },
  statCardIcon: {
    fontSize: "32px",
    marginBottom: "8px",
  },
  statCardNumber: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#667eea",
    marginBottom: "4px",
  },
  statCardLabel: {
    fontSize: "12px",
    color: "#94a3b8",
  },
  progressSection: {
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "16px",
  },
  progressTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#1f2937",
  },
  progressBar: {
    height: "8px",
    background: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "8px",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  },
  progressText: {
    fontSize: "12px",
    color: "#6b7280",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  input:focus, textarea:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  }
  
  .left-card:hover {
    transform: translateY(-4px);
  }
`;
document.head.appendChild(styleSheet);