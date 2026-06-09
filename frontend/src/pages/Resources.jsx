import Layout from "../components/common/Layout";
import { useState } from "react";

function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [downloading, setDownloading] = useState(null);

  const resources = [
    { 
      id: 1,
      name: "React Notes.pdf", 
      category: "frontend",
      size: "2.4 MB",
      downloads: 1245,
      icon: "⚛️",
      date: "2024-01-15"
    },
    { 
      id: 2,
      name: "JavaScript Guide.pdf", 
      category: "frontend",
      size: "3.1 MB",
      downloads: 987,
      icon: "📘",
      date: "2024-01-20"
    },
    { 
      id: 3,
      name: "MongoDB Tutorial.pdf", 
      category: "database",
      size: "1.8 MB",
      downloads: 756,
      icon: "🍃",
      date: "2024-02-01"
    },
    { 
      id: 4,
      name: "Python Basics.pdf", 
      category: "programming",
      size: "2.1 MB",
      downloads: 543,
      icon: "🐍",
      date: "2024-02-10"
    },
    { 
      id: 5,
      name: "Node.js Advanced.pdf", 
      category: "backend",
      size: "3.4 MB",
      downloads: 432,
      icon: "🚀",
      date: "2024-02-15"
    },
    { 
      id: 6,
      name: "CSS Masterclass.pdf", 
      category: "frontend",
      size: "1.5 MB",
      downloads: 321,
      icon: "🎨",
      date: "2024-02-20"
    }
  ];

  const categories = [
    { id: "all", name: "All Resources", icon: "📚" },
    { id: "frontend", name: "Frontend", icon: "🎨" },
    { id: "backend", name: "Backend", icon: "⚙️" },
    { id: "database", name: "Database", icon: "🗄️" },
    { id: "programming", name: "Programming", icon: "💻" }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (resourceId, resourceName) => {
    setDownloading(resourceId);
    // Simulate download delay
    setTimeout(() => {
      alert(`Downloading ${resourceName}... 📥`);
      setDownloading(null);
    }, 1000);
  };

  return (
    <Layout>
      <div style={styles.page}>
        {/* Background Pattern */}
        <div style={styles.bgPattern}></div>

        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerIcon}>📦</div>
            <div>
              <h1 style={styles.title}>Learning Resources</h1>
              <p style={styles.subtitle}>
                Access free study materials, notes, and guides
              </p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{resources.length}</div>
              <div style={styles.statLabel}>Total Resources</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>4.3K</div>
              <div style={styles.statLabel}>Total Downloads</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>12</div>
              <div style={styles.statLabel}>Categories</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div style={styles.searchSection}>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search resources by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            {searchTerm && (
              <button style={styles.clearBtn} onClick={() => setSearchTerm("")}>
                ✕
              </button>
            )}
          </div>

          <div style={styles.categoriesWrapper}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  ...styles.categoryBtn,
                  ...(selectedCategory === category.id ? styles.categoryBtnActive : {}),
                }}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div style={styles.resourcesGrid}>
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <div key={resource.id} style={styles.resourceCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.resourceIcon}>{resource.icon}</div>
                  <div style={styles.resourceInfo}>
                    <h3 style={styles.resourceName}>{resource.name}</h3>
                    <div style={styles.resourceMeta}>
                      <span>📄 {resource.size}</span>
                      <span>📅 {resource.date}</span>
                    </div>
                  </div>
                </div>
                
                <div style={styles.cardFooter}>
                  <div style={styles.downloadStats}>
                    <span>⬇️ {resource.downloads} downloads</span>
                  </div>
                  <button
                    style={styles.downloadBtn}
                    onClick={() => handleDownload(resource.id, resource.name)}
                    disabled={downloading === resource.id}
                  >
                    {downloading === resource.id ? (
                      <span style={styles.btnLoader}>
                        <span style={styles.btnSpinner}></span>
                        Downloading...
                      </span>
                    ) : (
                      <>
                        <span>📥</span> Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>🔍</span>
              <h3>No resources found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Featured Section */}
        <div style={styles.featuredSection}>
          <div style={styles.featuredHeader}>
            <span style={styles.featuredIcon}>⭐</span>
            <h3 style={styles.featuredTitle}>Popular Resources</h3>
          </div>
          <div style={styles.featuredGrid}>
            {resources.slice(0, 3).map((resource) => (
              <div key={resource.id} style={styles.featuredCard}>
                <div style={styles.featuredContent}>
                  <span style={styles.featuredResourceIcon}>{resource.icon}</span>
                  <div>
                    <div style={styles.featuredResourceName}>{resource.name}</div>
                    <div style={styles.featuredResourceStats}>
                      {resource.downloads}+ downloads
                    </div>
                  </div>
                </div>
                <button
                  style={styles.featuredBtn}
                  onClick={() => handleDownload(resource.id, resource.name)}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Resources;

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px",
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    position: "relative",
  },
  bgPattern: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    position: "relative",
    zIndex: 1,
    marginBottom: "40px",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
  },
  headerIcon: {
    fontSize: "48px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
  },
  statsContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  statCard: {
    flex: 1,
    minWidth: "120px",
    padding: "20px",
    background: "#fff",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    transition: "transform 0.2s ease",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#667eea",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "12px",
    color: "#94a3b8",
  },
  searchSection: {
    position: "relative",
    zIndex: 1,
    marginBottom: "32px",
  },
  searchWrapper: {
    position: "relative",
    marginBottom: "20px",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "18px",
    opacity: 0.6,
  },
  searchInput: {
    width: "100%",
    padding: "14px 16px 14px 48px",
    borderRadius: "14px",
    border: "2px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
    background: "#fff",
  },
  clearBtn: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "#94a3b8",
  },
  categoriesWrapper: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  categoryBtn: {
    padding: "8px 20px",
    borderRadius: "40px",
    border: "2px solid #e2e8f0",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    color: "#64748b",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  categoryBtnActive: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderColor: "transparent",
    color: "#fff",
  },
  resourcesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
    gap: "24px",
    position: "relative",
    zIndex: 1,
    marginBottom: "48px",
  },
  resourceCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    border: "1px solid #f0f0f0",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
  },
  resourceIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #667eea15, #764ba215)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },
  resourceInfo: {
    flex: 1,
  },
  resourceName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "6px",
  },
  resourceMeta: {
    display: "flex",
    gap: "12px",
    fontSize: "11px",
    color: "#94a3b8",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "12px",
    borderTop: "1px solid #e5e7eb",
  },
  downloadStats: {
    fontSize: "12px",
    color: "#64748b",
  },
  downloadBtn: {
    padding: "8px 20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  btnLoader: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  btnSpinner: {
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px",
    gridColumn: "1 / -1",
  },
  emptyIcon: {
    fontSize: "64px",
    display: "block",
    marginBottom: "16px",
  },
  featuredSection: {
    position: "relative",
    zIndex: 1,
    padding: "32px",
    background: "linear-gradient(135deg, #667eea10, #764ba210)",
    borderRadius: "24px",
    backdropFilter: "blur(10px)",
  },
  featuredHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px",
  },
  featuredIcon: {
    fontSize: "24px",
  },
  featuredTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
  },
  featuredGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
  },
  featuredCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    background: "#fff",
    borderRadius: "14px",
    transition: "all 0.2s ease",
  },
  featuredContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  featuredResourceIcon: {
    fontSize: "28px",
  },
  featuredResourceName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
  },
  featuredResourceStats: {
    fontSize: "11px",
    color: "#94a3b8",
  },
  featuredBtn: {
    padding: "6px 14px",
    background: "#e0e7ff",
    color: "#667eea",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .resource-card {
    animation: fadeIn 0.5s ease forwards;
  }
  
  .resource-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.1);
  }
  
  .category-btn:hover {
    transform: translateY(-2px);
  }
  
  .download-btn:hover {
    transform: translateY(-2px);
  }
  
  .featured-card:hover {
    transform: translateX(4px);
  }
  
  input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;
document.head.appendChild(styleSheet);