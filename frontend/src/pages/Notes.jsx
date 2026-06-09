import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";
import { 
  Download, 
  FileText, 
  Search, 
  Filter,
  BookOpen,
  Clock,
  ChevronRight,
  Grid,
  List
} from "lucide-react";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/notes/my-notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data.notes);
      
      // Extract unique courses for filter
      const uniqueCourses = [...new Set(res.data.notes.map(note => note.courseTitle || "General"))];
      setCourses(uniqueCourses);
      
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDownload = async (note) => {
    try {
      const url = note.fileUrl.startsWith("http")
        ? note.fileUrl
        : `http://localhost:5000${note.fileUrl}`;
      
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${note.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download note. Please try again.");
    }
  };

  // Filter notes based on search and course
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (note.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "all" || note.courseTitle === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <Layout>
      <div style={styles.page}>
        
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              <BookOpen size={18} />
              <span>Learning Resources</span>
            </div>
            <h1 style={styles.heroTitle}>📚 Course Notes</h1>
            <p style={styles.heroSubtitle}>
              Access and download all your course materials in one place
            </p>
          </div>
        </div>

        {/* Stats Section */}
        {notes.length > 0 && (
          <div style={styles.statsBar}>
            <div style={styles.statItem}>
              <FileText size={20} color="#3b82f6" />
              <span style={styles.statValue}>{notes.length}</span>
              <span style={styles.statLabel}>Total Notes</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <Clock size={20} color="#8b5cf6" />
              <span style={styles.statValue}>{courses.length}</span>
              <span style={styles.statLabel}>Courses</span>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        {notes.length > 0 && (
          <div style={styles.searchBar}>
            <div style={styles.searchInputWrapper}>
              <Search size={18} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search notes by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            
            <div style={styles.filterWrapper}>
              <Filter size={18} color="#94a3b8" />
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            
            <div style={styles.viewToggle}>
              <button
                style={{ ...styles.viewBtn, background: viewMode === "grid" ? "#3b82f6" : "transparent", color: viewMode === "grid" ? "white" : "#64748b" }}
                onClick={() => setViewMode("grid")}
              >
                <Grid size={16} />
              </button>
              <button
                style={{ ...styles.viewBtn, background: viewMode === "list" ? "#3b82f6" : "transparent", color: viewMode === "list" ? "white" : "#64748b" }}
                onClick={() => setViewMode("list")}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loader}></div>
            <p style={styles.loadingText}>Loading your notes...</p>
          </div>
        ) : notes.length === 0 ? (
          /* Empty State */
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📭</div>
            <h2 style={styles.emptyTitle}>No Notes Available</h2>
            <p style={styles.emptyText}>
              You don't have any course notes yet. Notes will appear here once your instructor uploads them.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div style={styles.gridContainer}>
            {filteredNotes.map((note, index) => (
              <div 
                key={note._id} 
                style={{
                  ...styles.gridCard,
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.cardIcon}>📄</div>
                  <div style={styles.cardBadge}>
                    {note.courseTitle || "Course Material"}
                  </div>
                </div>
                
                <h3 style={styles.cardTitle}>{note.title}</h3>
                <p style={styles.cardDescription}>
                  {note.description || "Comprehensive study notes covering key concepts and examples."}
                </p>
                
                <div style={styles.cardMeta}>
                  <span style={styles.metaText}>📅 {formatDate(note.createdAt)}</span>
                  <span style={styles.metaText}>📄 PDF Format</span>
                </div>
                
                <button
                  style={styles.downloadBtn}
                  onClick={() => handleDownload(note)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <Download size={16} />
                  Download Notes
                  <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div style={styles.listContainer}>
            {filteredNotes.map((note) => (
              <div key={note._id} style={styles.listItem}>
                <div style={styles.listItemContent}>
                  <div style={styles.listIcon}>📘</div>
                  <div style={styles.listInfo}>
                    <h3 style={styles.listTitle}>{note.title}</h3>
                    <p style={styles.listSubtitle}>
                      {note.courseTitle || "Course Material"} • {formatDate(note.createdAt)}
                    </p>
                    <p style={styles.listDescription}>
                      {note.description || "Comprehensive study notes covering key concepts."}
                    </p>
                  </div>
                </div>
                <button
                  style={styles.listDownloadBtn}
                  onClick={() => handleDownload(note)}
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && notes.length > 0 && (
          <div style={styles.resultsCount}>
            Showing {filteredNotes.length} of {notes.length} notes
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Notes;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  heroSection: {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    padding: "60px 40px",
    marginBottom: "30px",
  },

  heroContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.1)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#a78bfa",
    marginBottom: "16px",
  },

  heroTitle: {
    fontSize: "42px",
    fontWeight: "800",
    color: "white",
    marginBottom: "12px",
  },

  heroSubtitle: {
    fontSize: "16px",
    color: "#94a3b8",
    maxWidth: "600px",
  },

  statsBar: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    padding: "20px",
    background: "white",
    margin: "0 20px 30px 20px",
    borderRadius: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  statValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e293b",
  },

  statLabel: {
    fontSize: "14px",
    color: "#64748b",
  },

  statDivider: {
    width: "1px",
    background: "#e2e8f0",
  },

  searchBar: {
    display: "flex",
    gap: "16px",
    maxWidth: "1200px",
    margin: "0 auto 30px",
    padding: "0 20px",
    flexWrap: "wrap",
  },

  searchInputWrapper: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "white",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
  },

  filterWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "white",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },

  filterSelect: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
    cursor: "pointer",
  },

  viewToggle: {
    display: "flex",
    gap: "8px",
    background: "white",
    padding: "4px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },

  viewBtn: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s",
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px",
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "3px solid #e2e8f0",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    marginTop: "16px",
    color: "#64748b",
  },

  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
    maxWidth: "500px",
    margin: "0 auto",
  },

  emptyIcon: {
    fontSize: "80px",
    marginBottom: "20px",
  },

  emptyTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "12px",
  },

  emptyText: {
    fontSize: "16px",
    color: "#64748b",
  },

  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },

  gridCard: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    transition: "all 0.3s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    animation: "fadeInUp 0.5s ease-out forwards",
    opacity: 0,
    transform: "translateY(20px)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },

  cardIcon: {
    fontSize: "40px",
  },

  cardBadge: {
    background: "#e0e7ff",
    color: "#4f46e5",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
  },

  cardDescription: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.5",
    marginBottom: "16px",
  },

  cardMeta: {
    display: "flex",
    gap: "16px",
    marginBottom: "20px",
    fontSize: "12px",
    color: "#94a3b8",
  },

  metaText: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  downloadBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },

  listContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },

  listItem: {
    background: "white",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.3s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  listItemContent: {
    display: "flex",
    gap: "16px",
    flex: 1,
  },

  listIcon: {
    fontSize: "32px",
  },

  listInfo: {
    flex: 1,
  },

  listTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "4px",
  },

  listSubtitle: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "6px",
  },

  listDescription: {
    fontSize: "13px",
    color: "#94a3b8",
  },

  listDownloadBtn: {
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },

  resultsCount: {
    textAlign: "center",
    padding: "30px 20px",
    color: "#64748b",
    fontSize: "14px",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .grid-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
  
  .list-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  button:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);