import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children, darkMode }) {
  return (
    <div
      style={{
        ...styles.container,
        background: darkMode ? "#020617" : "#f3f4f6",
      }}
    >
      {/* ================= SIDEBAR ================= */}
      <AdminSidebar darkMode={darkMode} />

      {/* ================= MAIN CONTENT ================= */}
      <div style={styles.main}>

        {/* ================= PAGE CONTENT ================= */}
        <div style={styles.content}>
          {children}
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;

// ================= STYLES =================
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  },

  main: {
    marginLeft: "260px",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
  },

  content: {
    width: "100%",
  },
};