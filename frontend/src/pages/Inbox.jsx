import Layout from "../components/common/Layout"; // ✅ IMPORTANT

function Inbox() {
  const messages = [
    "Your exam is scheduled",
    "New course added",
    "Your payment was successful",
    "Assignment deadline approaching",
  ];

  return (
    <Layout>
      <div style={styles.page}>
        <h2 style={styles.title}>📩 Inbox</h2>

        <div style={styles.list}>
          {messages.map((msg, i) => (
            <div key={i} style={styles.card}>
              <span>📢 {msg}</span>

              {/* 🔥 Optional action */}
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

export default Inbox;


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
    background: "#9333ea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};