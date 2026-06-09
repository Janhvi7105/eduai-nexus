import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function AdminSidebar({ darkMode }) {

  const navigate = useNavigate();
  const location = useLocation();

  // ================= MENU ITEMS =================
  const menuItems = [
    {
      title: "Dashboard",
      icon: "📊",
      path: "/admin-dashboard",
    },
    {
      title: "Students",
      icon: "👨‍🎓",
      path: "/manage-students",
    },
    {
      title: "Teachers",
      icon: "👨‍🏫",
      path: "/manage-teachers",
    },
    {
      title: "Pending Requests",
      icon: "⏳",
      path: "/pending-teachers",
    },
    {
      title: "Courses",
      icon: "📚",
      path: "/manage-courses",
    },

  ];

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        ...styles.sidebar,
        background: darkMode ? "#020617" : "#ffffff",
        color: darkMode ? "#ffffff" : "#111827",
        borderRight: darkMode
          ? "1px solid #1e293b"
          : "1px solid #e5e7eb",
      }}
    >

      {/* ================= TOP ================= */}
      <div>

        {/* ================= LOGO ================= */}
        <div
          style={{
            ...styles.logo,
            color: darkMode ? "#ffffff" : "#111827",
          }}
        >
          🎓 EduAI
          <br />
          Admin
        </div>

        {/* ================= MENU ================= */}
        <div style={styles.menu}>

          {menuItems.map((item) => (

            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.menuItem,

                background:
                  location.pathname === item.path
                    ? "#2563eb"
                    : "transparent",

                color:
                  location.pathname === item.path
                    ? "#ffffff"
                    : darkMode
                    ? "#ffffff"
                    : "#111827",
              }}
            >

              <span style={styles.icon}>
                {item.icon}
              </span>

              <span>
                {item.title}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* ================= LOGOUT ================= */}
      <button
        style={styles.logoutBtn}
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

    </div>
  );
}

export default AdminSidebar;

// ================= STYLES =================
const styles = {

  sidebar: {
    width: "270px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    padding: "28px 20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflowY: "auto",
    transition: "all 0.3s ease",
  },

  logo: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "45px",
    lineHeight: "1.3",
    textAlign: "center",
    transition: "all 0.3s ease",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "18px",
    borderRadius: "18px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },

  icon: {
    fontSize: "22px",
  },

  logoutBtn: {
    background:
      "linear-gradient(135deg,#ef4444,#dc2626)",
    border: "none",
    color: "white",
    padding: "18px",
    borderRadius: "18px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "700",
    marginTop: "30px",
  },
};