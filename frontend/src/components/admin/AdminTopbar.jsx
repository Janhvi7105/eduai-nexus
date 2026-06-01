import {
  useNavigate,
} from "react-router-dom";

function AdminTopbar() {

  const navigate =
    useNavigate();

  const admin =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};


  return (

    <div style={styles.topbar}>


      {/* ================= SEARCH ================= */}
      <div style={styles.searchBox}>

        <input
          type="text"
          placeholder="Search users, courses..."
          style={styles.searchInput}
        />

      </div>


      {/* ================= RIGHT SECTION ================= */}
      <div style={styles.rightSection}>


        {/* NOTIFICATION */}
        <div
          style={styles.iconBox}

          onClick={() =>
            navigate(
              "/admin-notifications"
            )
          }
        >
          🔔

          <span style={styles.dot}></span>

        </div>


        {/* DARK MODE */}
        <div style={styles.iconBox}>
          🌙
        </div>


        {/* ADMIN PROFILE */}
        <div
          style={styles.profileBox}
        >

          <div style={styles.avatar}>

            {admin?.name
              ? admin.name[0]
                  .toUpperCase()
              : "A"}

          </div>


          <div>

            <p style={styles.adminText}>
              Admin
            </p>

            <h4 style={styles.adminName}>
              {admin?.name ||
                "Admin"}
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

    background: "#0f172a",

    borderRadius: "22px",

    padding: "0 30px",

    boxSizing: "border-box",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "space-between",

    border:
      "1px solid #1e293b",

    marginBottom: "30px",
  },

  searchBox: {

    width: "45%",
  },

  searchInput: {

    width: "100%",

    padding: "16px 20px",

    borderRadius: "14px",

    border:
      "1px solid #334155",

    background: "#020617",

    color: "white",

    outline: "none",

    fontSize: "16px",
  },

  rightSection: {

    display: "flex",

    alignItems: "center",

    gap: "18px",
  },

  iconBox: {

    width: "55px",

    height: "55px",

    borderRadius: "16px",

    background: "#1e293b",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    cursor: "pointer",

    fontSize: "24px",

    position: "relative",
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

  profileBox: {

    display: "flex",

    alignItems: "center",

    gap: "14px",

    background: "#1e293b",

    padding: "10px 16px",

    borderRadius: "18px",
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

    color: "#94a3b8",

    margin: 0,

    fontSize: "13px",
  },

  adminName: {

    margin: 0,

    color: "white",

    fontSize: "18px",
  },
};