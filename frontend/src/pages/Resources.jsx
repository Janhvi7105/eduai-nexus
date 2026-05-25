import Layout from "../components/common/Layout"; // ✅ IMPORTANT

function Resources() {
  const resources = [
    "React Notes.pdf",
    "JavaScript Guide.pdf",
    "MongoDB Tutorial.pdf",
  ];

  return (
    <Layout>
      <div style={styles.page}>
        <h2 style={styles.title}>📦 Resources</h2>

        <div style={styles.list}>
          {resources.map((r, i) => (
            <div key={i} style={styles.card}>
              <span>📄 {r}</span>

              {/* 🔥 Optional Download Button */}
              <button style={styles.btn}>
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Resources;


// 🎨 STYLES
const styles = {
  page: {
    padding: "20px",
  },

  title: {
    marginBottom: "20px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  card: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  btn: {
    padding: "6px 12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};