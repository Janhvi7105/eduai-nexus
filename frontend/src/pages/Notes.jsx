import Layout from "../components/common/Layout"; // ✅ IMPORTANT

function Notes() {
  const notes = [
    "Chapter 1 Notes",
    "Chapter 2 Notes",
    "Chapter 3 Notes",
  ];

  return (
    <Layout>
      <div style={styles.page}>
        <h2 style={styles.title}>🗒️ Notes</h2>

        <div style={styles.list}>
          {notes.map((note, i) => (
            <div key={i} style={styles.card}>
              <span>📘 {note}</span>

              {/* 🔥 Optional View Button */}
              <button style={styles.btn}>
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Notes;


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
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};