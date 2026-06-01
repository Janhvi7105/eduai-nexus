import AdminSidebar
from "./AdminSidebar";

import AdminTopbar
from "./AdminTopbar";


function AdminLayout({
  children,
}) {

  return (

    <div style={styles.container}>


      {/* ================= SIDEBAR ================= */}
      <AdminSidebar />


      {/* ================= MAIN CONTENT ================= */}
      <div style={styles.main}>


        {/* ================= TOPBAR ================= */}
        <AdminTopbar />


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

    background: "#020617",

    minHeight: "100vh",
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