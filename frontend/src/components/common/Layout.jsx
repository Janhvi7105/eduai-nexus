import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import {
  useEffect,
  useState,
} from "react";

function Layout({ children }) {

  // ================= THEME =================
  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme")
      || "light"
    );

  // ================= MOBILE DETECTION =================
  const [isMobile, setIsMobile] =
    useState(window.innerWidth <= 768);

  // ================= SIDEBAR STATE =================
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  // ================= APPLY THEME =================
  useEffect(() => {

    // SAVE THEME
    localStorage.setItem(
      "theme",
      theme
    );

    // BODY BACKGROUND
    document.body.style.background =
      theme === "dark"
        ? "#020617"
        : "#f3f4f6";

    // BODY TEXT
    document.body.style.color =
      theme === "dark"
        ? "#f8fafc"
        : "#111827";

  }, [theme]);

  return (

    <div
      style={{
        ...styles.container,

        background:
          theme === "dark"
            ? "#020617"
            : "#f3f4f6",

        color:
          theme === "dark"
            ? "#f8fafc"
            : "#111827",
      }}
    >

      {/* ================= SIDEBAR ================= */}
      <Sidebar
        theme={theme}
        setTheme={setTheme}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
      />


      {/* ================= MAIN ================= */}
      <div
        style={{
          ...styles.main,
          marginLeft: sidebarOpen
            ? (isMobile ? "80px" : "240px")
            : "0px",
          width: "100%",
          padding: isMobile
            ? "10px"
            : "20px",
          transition: "all 0.3s ease",
        }}
      >


        {/* ================= TOPBAR ================= */}
        <div
          style={{
            ...styles.topbarWrapper,

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
                ? "0 4px 20px rgba(0,0,0,0.6)"
                : "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >

          <Topbar
            theme={theme}
            setTheme={setTheme}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

        </div>


        {/* ================= PAGE CONTENT ================= */}
        <div
          style={{
            ...styles.content,

            color:
              theme === "dark"
                ? "#f8fafc"
                : "#111827",
          }}
        >

          {children}

        </div>

      </div>

    </div>
  );
}

export default Layout;


// ================= STYLES =================
const styles = {

  container: {
    display: "flex",
    minHeight: "100vh",
    transition: "0.3s",
  },

  main: {
    marginLeft: "240px",
    width: "100%",
    minHeight: "100vh",
    transition: "all 0.3s ease",
    padding: "20px",
  },

  // ================= TOPBAR WRAPPER =================
  topbarWrapper: {
    position: "sticky",
    top: "0",
    zIndex: "999",
    borderRadius: "22px",
    marginBottom: "25px",
    padding: "8px 20px",
    transition: "0.3s",
  },

  // ================= PAGE CONTENT =================
  content: {
    transition: "0.3s",
  },
};