import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminTopbar({ darkMode, setDarkMode, sidebarCollapsed, setSidebarCollapsed, isMobile }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/notifications/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data.notifications);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
  }, []);

  const admin = JSON.parse(localStorage.getItem("user")) || { name: "Janhvi" };
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        ...styles.topbar,
        background: darkMode
          ? "rgba(15, 23, 42, 0.95)"
          : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: darkMode
          ? "1px solid rgba(255, 255, 255, 0.05)"
          : "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* ================= LEFT SECTION ================= */}
      <div style={styles.leftSection}>
        {isMobile && (
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              ...styles.iconBtn,
              background: darkMode ? "#1e293b" : "#f1f5f9",
            }}
          >
            ☰
          </button>
        )}

        {/* Search Bar */}
        <div
          style={{
            ...styles.searchBar,
            background: darkMode ? "#1e293b" : "#f1f5f9",
            border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
          }}
        >
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              ...styles.searchInput,
              background: "transparent",
              color: darkMode ? "#fff" : "#1e293b",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={styles.clearBtn}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div style={styles.rightSection}>
        {/* Notification */}
        <div ref={notificationRef} style={styles.notificationContainer}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              ...styles.iconBtn,
              background: darkMode ? "#1e293b" : "#f1f5f9",
            }}
          >
            <span style={styles.bellIcon}>🔔</span>
            {unreadCount > 0 && (
              <span style={styles.notificationBadge}>{unreadCount}</span>
            )}
          </button>

          {/* Notification Popup */}
          {showNotifications && (
            <div
              style={{
                ...styles.notificationPopup,
                background: darkMode ? "#1e293b" : "#ffffff",
                border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
              }}
            >
              <div style={styles.popupHeader}>
                <h4 style={styles.popupTitle}>Notifications</h4>
                <button style={styles.markAllRead}>Mark all read</button>
              </div>
              
              <div style={styles.notificationList}>
                {notifications.length > 0 ? (
                  notifications.map((n, index) => (
                    <div
                      key={n._id || index}
                      style={{
                        ...styles.notificationItem,
                        background: !n.read && (darkMode ? "rgba(102, 126, 234, 0.1)" : "rgba(102, 126, 234, 0.05)"),
                      }}
                    >
                      <div style={styles.notificationIcon}>
                        {n.type === "success" ? "✅" : n.type === "warning" ? "⚠️" : "ℹ️"}
                      </div>
                      <div style={styles.notificationContent}>
                        <p style={styles.notificationMessage}>{n.message}</p>
                        <span style={styles.notificationTime}>
                          {n.timeAgo || "Just now"}
                        </span>
                      </div>
                      {!n.read && <div style={styles.unreadDot}></div>}
                    </div>
                  ))
                ) : (
                  <div style={styles.emptyNotifications}>
                    <span style={styles.emptyIcon}>📭</span>
                    <p>No notifications</p>
                  </div>
                )}
              </div>
              
              <button style={styles.viewAllBtn}>View All Notifications</button>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => {
            const newMode = !darkMode;
            setDarkMode(newMode);
            localStorage.setItem("adminDarkMode", newMode);
          }}
          style={{
            ...styles.iconBtn,
            background: darkMode ? "#1e293b" : "#f1f5f9",
          }}
        >
          <span style={styles.themeIcon}>{darkMode ? "☀️" : "🌙"}</span>
        </button>

        {/* Admin Profile */}
        <div ref={profileRef} style={styles.profileContainer}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              ...styles.profileBtn,
              background: darkMode ? "#1e293b" : "#f1f5f9",
            }}
          >
            <div style={styles.avatar}>
              {admin?.name ? admin.name[0].toUpperCase() : "J"}
            </div>
            {!isMobile && (
              <div style={styles.profileInfo}>
                <p style={{ ...styles.adminText, color: darkMode ? "#94a3b8" : "#6b7280" }}>
                  Admin
                </p>
                <h4 style={{ ...styles.adminName, color: darkMode ? "#ffffff" : "#111827" }}>
                  {admin?.name || "Janhvi"}
                </h4>
              </div>
            )}
            {!isMobile && (
              <span style={styles.dropdownArrow}>▼</span>
            )}
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div
              style={{
                ...styles.profileDropdown,
                background: darkMode ? "#1e293b" : "#ffffff",
                border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
              }}
            >
              <button
                onClick={() => {
                  navigate("/admin-profile");
                  setShowProfileMenu(false);
                }}
                style={styles.dropdownItem}
              >
                <span>👤</span>
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  navigate("/admin-settings");
                  setShowProfileMenu(false);
                }}
                style={styles.dropdownItem}
              >
                <span>⚙️</span>
                <span>Settings</span>
              </button>
              <button
                onClick={() => {
                  navigate("/admin-help");
                  setShowProfileMenu(false);
                }}
                style={styles.dropdownItem}
              >
                <span>❓</span>
                <span>Help Center</span>
              </button>
              <div style={styles.dropdownDivider}></div>
              <button
                onClick={handleLogout}
                style={{ ...styles.dropdownItem, ...styles.logoutItem }}
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminTopbar;

// ================= STYLES =================
const styles = {
  topbar: {
    width: "100%",
    padding: "16px 24px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.3s ease",
    position: "sticky",
    top: 0,
    zIndex: 999,
    borderRadius: "0 0 20px 20px",
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flex: 1,
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
  },

  iconBtn: {
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "20px",
    transition: "all 0.2s ease",
    border: "none",
    position: "relative",
  },

  searchBar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 16px",
    borderRadius: "14px",
    transition: "all 0.2s ease",
    minWidth: "280px",
    flex: 1,
    maxWidth: "400px",
  },

  searchIcon: {
    fontSize: "18px",
    opacity: 0.6,
  },

  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "14px",
    flex: 1,
    padding: "4px 0",
  },

  clearBtn: {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "14px",
    opacity: 0.6,
    padding: "0 4px",
  },

  bellIcon: {
    fontSize: "20px",
  },

  notificationBadge: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    background: "#ef4444",
    color: "white",
    fontSize: "10px",
    fontWeight: "bold",
    padding: "2px 6px",
    borderRadius: "10px",
    minWidth: "18px",
    textAlign: "center",
  },

  notificationContainer: {
    position: "relative",
  },

  notificationPopup: {
    position: "absolute",
    top: "52px",
    right: "0",
    width: "360px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    overflow: "hidden",
    zIndex: 1000,
  },

  popupHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
  },

  popupTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
  },

  markAllRead: {
    border: "none",
    background: "none",
    color: "#667eea",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: "500",
  },

  notificationList: {
    maxHeight: "400px",
    overflowY: "auto",
  },

  notificationItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px 20px",
    cursor: "pointer",
    transition: "background 0.2s ease",
    position: "relative",
  },

  notificationIcon: {
    fontSize: "18px",
    flexShrink: 0,
  },

  notificationContent: {
    flex: 1,
  },

  notificationMessage: {
    margin: 0,
    fontSize: "13px",
    lineHeight: "1.4",
  },

  notificationTime: {
    fontSize: "10px",
    opacity: 0.5,
    marginTop: "4px",
    display: "block",
  },

  unreadDot: {
    width: "8px",
    height: "8px",
    borderRadius: "4px",
    background: "#667eea",
    flexShrink: 0,
    marginTop: "4px",
  },

  emptyNotifications: {
    textAlign: "center",
    padding: "40px 20px",
  },

  emptyIcon: {
    fontSize: "40px",
    display: "block",
    marginBottom: "8px",
  },

  viewAllBtn: {
    width: "100%",
    padding: "12px",
    border: "none",
    background: "rgba(102, 126, 234, 0.1)",
    color: "#667eea",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },

  themeIcon: {
    fontSize: "20px",
  },

  profileContainer: {
    position: "relative",
  },

  profileBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 16px 8px 12px",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "none",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    flexShrink: 0,
  },

  profileInfo: {
    textAlign: "left",
  },

  adminText: {
    margin: 0,
    fontSize: "11px",
    fontWeight: "500",
  },

  adminName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
  },

  dropdownArrow: {
    fontSize: "10px",
    opacity: 0.6,
  },

  profileDropdown: {
    position: "absolute",
    top: "52px",
    right: "0",
    width: "240px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    overflow: "hidden",
    zIndex: 1000,
  },

  dropdownItem: {
    width: "100%",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    transition: "background 0.2s ease",
    fontSize: "13px",
    fontWeight: "500",
  },

  dropdownDivider: {
    height: "1px",
    background: "rgba(0,0,0,0.05)",
    margin: "4px 0",
  },

  logoutItem: {
    color: "#ef4444",
  },
};

// Add hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  button:hover {
    transform: translateY(-2px);
  }
  
  .notification-item:hover {
    transform: translateX(4px);
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);