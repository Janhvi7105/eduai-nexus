import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Sidebar({ theme }) {

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
    {
      name: "Dashboard",
      path: "/student-dashboard",
      icon: "🏠",
    },
    {
      name: "My Courses",
      path: "/my-courses",
      icon: "📚",
    },
    {
      name: "Mock Test",
      path: "/mock-tests",
      icon: "📝",
    },
    {
      name: "Notes",
      path: "/notes",
      icon: "🗒️",
    },
    {
      name: "Inbox",
      path: "/inbox",
      icon: "📩",
    },
  ];

  // ================= TEACHER MENU =================
  const teacherMenu = [
    {
      name: "Dashboard",
      path: "/teacher-dashboard",
      icon: "🏠",
    },
    {
      name: "Create Course",
      path: "/create-course",
      icon: "➕",
    },
    {
      name: "My Courses",
      path: "/my-courses",
      icon: "📚",
    },
    {
      name: "Students",
      path: "/students",
      icon: "👨‍🎓",
    },
     {
    name: "Notes",
    path: "/teacher-notes",
    icon: "📖",
  },
  ];

  // ================= SELECT MENU =================
  const menu = role === "teacher" ? teacherMenu : studentMenu;

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        ...styles.sidebar,
        background: theme === "dark" ? "#0f172a" : "#ffffff",
        borderRight: theme === "dark" ? "1px solid #1e293b" : "1px solid #e5e7eb",
      }}
    >
      {/* ================= LOGO ================= */}
      <div style={styles.logoSection}>
        <h1
          style={{
            ...styles.logo,
            color: theme === "dark" ? "#f8fafc" : "#111827",
          }}
        >
          🎓 EduAI
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
            {item.name}
          </Link>
        ))}
      </div>

      {/* ================= BOTTOM ================= */}
      <div style={styles.bottom}>
        {/* REFER BOX */}
        <div
          style={{
            ...styles.referBox,
            background: theme === "dark" ? "#1e293b" : "#f9fafb",
          }}
        >
          <p
            style={{
              ...styles.referTitle,
              color: theme === "dark" ? "#f8fafc" : "#111827",
            }}
          >
            🎁 Refer & Earn
          </p>
          <button style={styles.referBtn}>Refer Now</button>
        </div>

        {/* LOGOUT */}
        <button onClick={handleLogout} style={styles.logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

// ================= STYLES =================
const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    transition: "0.3s",
  },
  logoSection: {
    padding: "25px 25px 10px",
  },
  logo: {
    fontSize: "34px",
    fontWeight: "800",
    letterSpacing: "1px",
  },
  menu: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "16px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "0.3s",
    fontSize: "16px",
  },
  icon: {
    fontSize: "20px",
  },
  bottom: {
    padding: "20px",
  },
  referBox: {
    padding: "18px",
    borderRadius: "18px",
    marginBottom: "18px",
    textAlign: "center",
  },
  referTitle: {
    fontWeight: "700",
    marginBottom: "15px",
    fontSize: "16px",
  },
  referBtn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg,#f59e0b,#f97316)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
  },
  logout: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
  },
};