import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ theme, isMobile, sidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  // ================= USER =================
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("User parse error:", err);
    localStorage.clear();
  }

  const role = user?.role || "student";

  // ================= STUDENT MENU =================
  const studentMenu = [
    { name: "Dashboard", path: "/student-dashboard", icon: "🏠" },
    { name: "My Courses", path: "/my-courses", icon: "📚" },
    { name: "Mock Test", path: "/mock-tests", icon: "📝" },
    { name: "Notes", path: "/notes", icon: "🗒️" },
  ];

  // ================= TEACHER MENU =================
  const teacherMenu = [
    { name: "Dashboard", path: "/teacher-dashboard", icon: "🏠" },
    { name: "Create Course", path: "/create-course", icon: "➕" },
    { name: "My Courses", path: "/my-courses", icon: "📚" },
    { name: "Students", path: "/students", icon: "👨‍🎓" },
    { name: "Notes", path: "/teacher-notes", icon: "📖" },
  ];

  // ================= SELECT MENU =================
  const menu = role === "teacher" ? teacherMenu : studentMenu;

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          transform: sidebarOpen
            ? "translateX(0)"
            : "translateX(-100%)",
          width: isMobile ? "80px" : "240px",
          background: theme === "dark" ? "#0f172a" : "#ffffff",
          borderRight: theme === "dark" ? "1px solid #1e293b" : "1px solid #e5e7eb",
          boxShadow: sidebarOpen ? "0 0 20px rgba(0,0,0,0.1)" : "none",
        }}
      >
        {/* ================= LOGO ================= */}
        <div style={styles.logoSection}>
          <h1
            style={{
              ...styles.logo,
              color: theme === "dark" ? "#f8fafc" : "#111827",
              fontSize: isMobile ? "24px" : "28px",
            }}
          >
            {isMobile ? "🎓" : "🎓 EduAI"}
          </h1>
        </div>

        {/* ================= MENU ================= */}
        <div style={styles.menu}>
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{
                ...styles.link,
                justifyContent: isMobile ? "center" : "flex-start",
                padding: isMobile ? "12px" : "12px 16px",
                background: location.pathname === item.path
                  ? "linear-gradient(135deg,#2563eb,#4f46e5)"
                  : "transparent",
                color: location.pathname === item.path
                  ? "#ffffff"
                  : theme === "dark"
                  ? "#cbd5e1"
                  : "#374151",
                boxShadow: location.pathname === item.path
                  ? "0 10px 20px rgba(37,99,235,0.3)"
                  : "none",
              }}
            >
              <span style={styles.icon}>{item.icon}</span>
              {!isMobile && <span style={styles.linkText}>{item.name}</span>}
            </Link>
          ))}
        </div>

        {/* ================= BOTTOM ================= */}
        <div style={styles.bottom}>
          <button 
            onClick={handleLogout} 
            style={{
              ...styles.logout,
              justifyContent: "center",
              padding: "12px",
            }}
          >
            <span>{isMobile ? "🚪" : "🚪 Logout"}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

// ================= STYLES =================
const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    zIndex: 999,
    overflowX: "hidden",
    whiteSpace: "nowrap",
  },

  logoSection: {
    padding: "30px 20px 20px",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
  },

  logo: {
    fontWeight: "800",
    letterSpacing: "1px",
    margin: 0,
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
  },

  menu: {
    flex: 1,
    overflowY: "auto",
    padding: "20px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
    fontSize: "15px",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },

  linkText: {
    opacity: 1,
    transition: "opacity 0.2s ease",
  },

  icon: {
    fontSize: "20px",
    minWidth: "24px",
  },

  bottom: {
    padding: "20px 12px",
    borderTop: "1px solid rgba(0,0,0,0.05)",
  },

  logout: {
    width: "100%",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};