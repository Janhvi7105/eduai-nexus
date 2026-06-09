import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

function AdminLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        setSidebarCollapsed(true);
      } else if (window.innerWidth > 1024) {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSidebarWidth = () => {
    if (isMobile) return "80px";
    if (sidebarCollapsed) return "80px";
    return "280px";
  };

  return (
    <div
      style={{
        ...styles.container,
        background: darkMode
          ? "linear-gradient(135deg, #0f172a 0%, #020617 100%)"
          : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      }}
    >
      <AdminSidebar
        darkMode={darkMode}
        isMobile={isMobile}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      <div
        style={{
          ...styles.main,
          marginLeft: getSidebarWidth(),
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <AdminTopbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          isMobile={isMobile}
        />

        <main style={styles.content}>
          <div style={styles.contentWrapper}>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    transition: "background 0.3s ease",
    position: "relative",
  },

  main: {
    flex: 1,
    width: "calc(100% - 280px)",
    minHeight: "100vh",
    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s ease",
    position: "relative",
  },

  content: {
    padding: "24px 28px",
    animation: "fadeIn 0.5s ease-out",
  },

  contentWrapper: {
    maxWidth: "1600px",
    margin: "0 auto",
  },
};

// Add global animations and styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(102, 126, 234, 0.4);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(102, 126, 234, 0.6);
  }

  /* Smooth transitions */
  * {
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  /* Loading animation */
  .loading-skeleton {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(styleSheet);