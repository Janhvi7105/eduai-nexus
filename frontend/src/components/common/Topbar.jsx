import {
  useNavigate,
} from "react-router-dom";

function Topbar({
  theme,
  setTheme,
}) {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};


  return (

    <div
      style={{
        ...styles.topbar,

        // ✅ WHITE IN LIGHT MODE
        // ✅ BLACK IN DARK MODE
        background:
          theme === "dark"
            ? "#000000"
            : "#ffffff",

        border:
          theme === "dark"
            ? "1px solid #111827"
            : "1px solid #e5e7eb",

        boxShadow:
          theme === "dark"
            ? "0 4px 20px rgba(0,0,0,0.5)"
            : "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >


      {/* ================= RIGHT SECTION ================= */}
      <div style={styles.right}>


        {/* 🔔 NOTIFICATION - TEACHER ONLY */}
        {user?.role === "teacher" && (
          <div
            style={{
              ...styles.iconBox,

              background:
                theme === "dark"
                  ? "#111827"
                  : "#f3f4f6",

              color:
                theme === "dark"
                  ? "#ffffff"
                  : "#111827",
            }}

            onClick={() =>
              navigate("/notifications")
            }
          >
            🔔

            <span style={styles.dot}></span>
          </div>
        )}


        {/* 🌙 DARK MODE */}
        <div
          style={{
            ...styles.iconBox,

            background:
              theme === "dark"
                ? "#111827"
                : "#f3f4f6",

            color:
              theme === "dark"
                ? "#ffffff"
                : "#111827",
          }}

          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
        >
          {theme === "dark"
            ? "☀️"
            : "🌙"}
        </div>


        {/* 👤 PROFILE */}
        <div
          style={{
            ...styles.profile,

            background:
              theme === "dark"
                ? "#111827"
                : "#f3f4f6",
          }}

          // ✅ DYNAMIC PROFILE NAVIGATION
          onClick={() =>

            navigate(

              user?.role === "teacher"
                ? "/teacher-profile"
                : "/student-profile"

            )
          }
        >


          {/* ================= AVATAR ================= */}
          <div style={styles.avatar}>


            {
              user?.name

                ? user.name[0]
                    .toUpperCase()

                : "A"
            }

          </div>


          {/* ================= NAME ================= */}
          <span
            style={{
              ...styles.name,

              color:
                theme === "dark"
                  ? "#ffffff"
                  : "#111827",
            }}
          >

            {
              user?.name ||
              "Admin"
            }

          </span>

        </div>

      </div>

    </div>
  );
}

export default Topbar;


// ================= STYLES =================
const styles = {

  topbar: {

    height: "80px",

    borderRadius: "20px",

    display: "flex",

    justifyContent: "flex-end",

    alignItems: "center",

    padding: "0 30px",

    marginBottom: "25px",

    transition: "0.3s",
  },

  right: {

    display: "flex",

    alignItems: "center",

    gap: "20px",
  },

  iconBox: {

    width: "55px",

    height: "55px",

    borderRadius: "18px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    cursor: "pointer",

    fontSize: "24px",

    position: "relative",

    transition: "0.3s",
  },

  dot: {

    width: "10px",

    height: "10px",

    background: "red",

    borderRadius: "50%",

    position: "absolute",

    top: "12px",

    right: "12px",

    border: "2px solid white",
  },

  profile: {

    display: "flex",

    alignItems: "center",

    gap: "12px",

    padding: "10px 16px",

    borderRadius: "20px",

    transition: "0.3s",

    cursor: "pointer",
  },

  avatar: {

    width: "45px",

    height: "45px",

    borderRadius: "50%",

    background:
      "linear-gradient(135deg,#8b5cf6,#ec4899)",

    color: "#fff",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontWeight: "bold",

    fontSize: "20px",
  },

  name: {

    fontWeight: "600",

    fontSize: "18px",
  },
};