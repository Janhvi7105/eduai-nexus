import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminTopbar({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

  const admin =
    JSON.parse(localStorage.getItem("user")) || {};

  return (

    <div
      style={{
        ...styles.topbar,
        background: darkMode ? "#0f172a" : "#ffffff",
        border: darkMode
          ? "1px solid #1e293b"
          : "1px solid #e5e7eb",
      }}
    >

      {/* ================= RIGHT SECTION ================= */}
      <div style={styles.rightSection}>

        {/* NOTIFICATION */}
        <div
          style={{
            ...styles.iconBox,
            background: darkMode
              ? "#1e293b"
              : "#f3f4f6",
          }}
          onClick={() =>
            setShowNotifications(!showNotifications)
          }
        >
          🔔
          <span style={styles.dot}></span>
        </div>

        {/* NOTIFICATION POPUP */}
        {showNotifications && (
          <div
            style={{
              ...styles.notificationPopup,
              background: darkMode
                ? "#111827"
                : "#ffffff",
              color: darkMode
                ? "#ffffff"
                : "#111827",
            }}
          >
            <h4>Notifications</h4>
            <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  }}
>

  <div>
    👨‍🎓 Student enrolled in React Basics
  </div>

  <div>
    📚 New course created
  </div>

  <div>
    💰 Payment ₹499 received
  </div>

  <div>
    👨‍🏫 New instructor request
  </div>

</div>
          </div>
        )}

        {/* DARK MODE */}
        <div
          style={{
            ...styles.iconBox,
            background: darkMode
              ? "#1e293b"
              : "#f3f4f6",
          }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌙" : "☀️"}
        </div>

        {/* ADMIN PROFILE */}
        <div
          style={{
            ...styles.profileBox,
            background: darkMode
              ? "#1e293b"
              : "#f3f4f6",
          }}
          onClick={() =>
            navigate("/admin-profile")
          }
        >

          <div style={styles.avatar}>
            {admin?.name
              ? admin.name[0].toUpperCase()
              : "J"}
          </div>

          <div>

            <p
              style={{
                ...styles.adminText,
                color: darkMode
                  ? "#94a3b8"
                  : "#6b7280",
              }}
            >
              Admin
            </p>

            <h4
              style={{
                ...styles.adminName,
                color: darkMode
                  ? "#ffffff"
                  : "#111827",
              }}
            >
              {admin?.name || "Janhvi"}
            </h4>

          </div>

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
    height: "90px",
    borderRadius: "22px",
    padding: "0 30px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "30px",
    transition: "all 0.3s ease",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    position: "relative",
  },

  iconBox: {
    width: "55px",
    height: "55px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "24px",
    position: "relative",
    transition: "all 0.3s ease",
  },

  dot: {
    width: "10px",
    height: "10px",
    background: "#ef4444",
    borderRadius: "50%",
    position: "absolute",
    top: "12px",
    right: "12px",
  },

  notificationPopup: {
    position: "absolute",
    top: "70px",
    right: "140px",
    padding: "15px",
    borderRadius: "10px",
    width: "250px",
    zIndex: 1000,
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
  },

  profileBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "10px 16px",
    borderRadius: "18px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#8b5cf6,#ec4899)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "22px",
  },

  adminText: {
    margin: 0,
    fontSize: "13px",
  },

  adminName: {
    margin: 0,
    fontSize: "18px",
  },
};