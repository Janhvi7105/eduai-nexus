import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

function AdminSidebar({
  darkMode,
  isMobile,
  sidebarCollapsed,
  setSidebarCollapsed,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  // ================= MENU ITEMS =================
  const menuItems = [
    {
      title: "Dashboard",
      icon: "📊",
      activeIcon: "✨",
      path: "/admin-dashboard",
      description: "Overview & stats"
    },
    {
      title: "Students",
      icon: "👨‍🎓",
      activeIcon: "🎓",
      path: "/manage-students",
      description: "Manage learners"
    },
    {
      title: "Teachers",
      icon: "👨‍🏫",
      activeIcon: "🏆",
      path: "/manage-teachers",
      description: "Educator management"
    },
    {
      title: "Pending Requests",
      icon: "⏳",
      activeIcon: "📋",
      path: "/pending-teachers",
      description: "Approvals needed"
      // badge removed
    },
    {
      title: "Courses",
      icon: "📚",
      activeIcon: "📖",
      path: "/manage-courses",
      description: "Course catalog"
    },
  ];

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isExpanded = !isMobile && !sidebarCollapsed;
  const sidebarWidth = isMobile ? "80px" : (sidebarCollapsed ? "80px" : "280px");

  return (
    <div
      style={{
        ...styles.sidebar,
        width: sidebarWidth,
        background: darkMode
          ? "linear-gradient(180deg, #0f172a 0%, #020617 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        borderRight: darkMode
          ? "1px solid rgba(255, 255, 255, 0.05)"
          : "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: darkMode
          ? "4px 0 20px rgba(0, 0, 0, 0.3)"
          : "4px 0 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* ================= TOP SECTION ================= */}
      <div>
        {/* ================= LOGO ================= */}
        <div style={styles.logoContainer}>
          <div
            style={{
              ...styles.logoWrapper,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <span style={styles.logoEmoji}>🎓</span>
          </div>
          {isExpanded && (
            <div style={styles.logoText}>
              <span style={styles.logoMain}>EduAI</span>
              <span style={styles.logoSub}>Admin Panel</span>
            </div>
          )}
          {!isMobile && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                ...styles.collapseBtn,
                background: darkMode ? "#1e293b" : "#f1f5f9",
                color: darkMode ? "#94a3b8" : "#64748b",
              }}
            >
              {sidebarCollapsed ? "→" : "←"}
            </button>
          )}
        </div>

        {/* ================= MENU ================= */}
        <div style={styles.menu}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredItem === index;
            
            return (
              <div
                key={item.title}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  ...styles.menuItem,
                  justifyContent: isMobile || sidebarCollapsed ? "center" : "flex-start",
                  background: isActive
                    ? darkMode
                      ? "rgba(102, 126, 234, 0.15)"
                      : "rgba(102, 126, 234, 0.08)"
                    : isHovered
                    ? darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.03)"
                    : "transparent",
                  borderLeft: isActive ? "4px solid #667eea" : "4px solid transparent",
                  transform: isHovered ? "translateX(4px)" : "translateX(0)",
                }}
              >
                <div style={styles.iconWrapper}>
                  <span style={styles.icon}>
                    {isActive ? item.activeIcon || item.icon : item.icon}
                  </span>
                </div>
                
                {isExpanded && (
                  <div style={styles.menuText}>
                    <div style={{
                      ...styles.menuTitle,
                      color: isActive
                        ? "#667eea"
                        : darkMode
                        ? "#cbd5e1"
                        : "#334155",
                      fontWeight: isActive ? "700" : "500",
                    }}>
                      {item.title}
                    </div>
                    <div style={styles.menuDescription}>
                      {item.description}
                    </div>
                  </div>
                )}
                
                {isActive && !isExpanded && (
                  <div style={styles.activeDot}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div>
        {/* Logout Button - Profile Section Removed */}
        <button
          style={{
            ...styles.logoutBtn,
            justifyContent: isMobile || sidebarCollapsed ? "center" : "flex-start",
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          }}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <span style={styles.logoutIcon}>🚪</span>
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;

// ================= STYLES =================
const styles = {
  sidebar: {
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    padding: "24px 16px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflowY: "auto",
    overflowX: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 1000,
  },

  logoContainer: {
    marginBottom: "40px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 8px",
  },

  logoWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
    flexShrink: 0,
  },

  logoEmoji: {
    fontSize: "28px",
  },

  logoText: {
    flex: 1,
  },

  logoMain: {
    display: "block",
    fontSize: "18px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  },

  logoSub: {
    display: "block",
    fontSize: "10px",
    color: "#94a3b8",
    marginTop: "2px",
  },

  collapseBtn: {
    position: "absolute",
    right: "-8px",
    top: "12px",
    width: "24px",
    height: "24px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    transition: "all 0.2s ease",
    zIndex: 10,
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",
    textDecoration: "none",
  },

  iconWrapper: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  icon: {
    fontSize: "20px",
    transition: "transform 0.2s ease",
  },

  menuText: {
    flex: 1,
    textAlign: "left",
  },

  menuTitle: {
    fontSize: "14px",
    fontWeight: "500",
    transition: "color 0.2s ease",
  },

  menuDescription: {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "2px",
  },

  activeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "3px",
    background: "#667eea",
    position: "absolute",
    right: "12px",
  },

  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "none",
    color: "white",
    padding: "12px 16px",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    width: "100%",
  },

  logoutIcon: {
    fontSize: "18px",
  },
};

// Add hover styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  .menu-item:hover .icon {
    transform: scale(1.1);
  }
`;
document.head.appendChild(styleSheet);