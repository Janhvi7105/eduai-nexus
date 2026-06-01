import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function AdminSidebar() {

  const navigate =
    useNavigate();

  const location =
    useLocation();


  // ================= MENU ITEMS =================
  const menuItems = [

    {
      title: "Dashboard",
      icon: "📊",
      path:
        "/admin-dashboard",
    },

    {
      title: "Students",
      icon: "👨‍🎓",
      path:
        "/manage-students",
    },

    {
      title: "Teachers",
      icon: "👨‍🏫",
      path:
        "/manage-teachers",
    },

    {
      title: "Pending Requests",
      icon: "⏳",
      path:
        "/pending-teachers",
    },

    {
      title: "Courses",
      icon: "📚",
      path:
        "/manage-courses",
    },

    {
      title: "Revenue",
      icon: "💰",
      path:
        "/admin-revenue",
    },

    {
      title: "Notifications",
      icon: "🔔",
      path:
        "/notifications",
    },

    {
      title: "Settings",
      icon: "⚙️",
      path:
        "/admin-settings",
    },
  ];


  // ================= LOGOUT =================
  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      navigate("/login");
    };


  return (

    <div style={styles.sidebar}>


      {/* ================= TOP ================= */}
      <div>


        {/* ================= LOGO ================= */}
        <div style={styles.logo}>

          🎓 EduAI
          <br />
          Admin

        </div>


        {/* ================= MENU ================= */}
        <div style={styles.menu}>


          {menuItems.map(
            (item) => (

              <div

                key={item.title}

                onClick={() =>
                  navigate(
                    item.path
                  )
                }

                style={{
                  ...styles.menuItem,

                  background:
                    location.pathname ===
                    item.path

                      ? "#2563eb"

                      : "transparent",
                }}
              >

                <span
                  style={styles.icon}
                >
                  {item.icon}
                </span>

                <span>
                  {item.title}
                </span>

              </div>
            )
          )}

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

    background: "#020617",

    color: "white",

    position: "fixed",

    left: 0,

    top: 0,

    padding: "28px 20px",

    boxSizing: "border-box",

    borderRight:
      "1px solid #1e293b",

    display: "flex",

    flexDirection: "column",

    justifyContent:
      "space-between",

    overflowY: "auto",
  },

  logo: {

    fontSize: "34px",

    fontWeight: "800",

    marginBottom: "45px",

    lineHeight: "1.3",

    textAlign: "center",
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

    transition: "0.3s",
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

    transition: "0.3s",
  },
};