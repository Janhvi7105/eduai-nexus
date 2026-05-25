import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      {/* 🔥 Title */}
      <h1 style={styles.title}>🚀 Welcome to EduAI Nexus</h1>

      <p style={styles.subtitle}>
        Learn Smart • Practice Exams • Track Your Progress
      </p>

      {/* 🔥 Navigation Buttons */}
      <div style={styles.buttons}>
        <Link to="/login">
          <button style={styles.btn}>Login</button>
        </Link>

        <Link to="/courses">
          <button style={styles.btn}>Courses</button>
        </Link>

        {/* ✅ FIXED: Goes to landing page */}
        <Link to="/become-instructor">
          <button style={styles.instructorBtn}>
            🚀 Become Instructor
          </button>
        </Link>
      </div>

      {/* 🔥 Feature Section */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>📚 Smart Learning</h3>
          <p>Explore courses and build your knowledge</p>
        </div>

        <div style={styles.card}>
          <h3>📝 Online Exams</h3>
          <p>Take real-time quizzes and test yourself</p>
        </div>

        <div style={styles.card}>
          <h3>📊 Analytics</h3>
          <p>Track your performance and improve</p>
        </div>
      </div>
    </div>
  );
}

export default Home;


// 🎨 Styles (Clean + Modern)
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    padding: "20px",
  },

  title: {
    fontSize: "42px",
    marginBottom: "10px",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
    opacity: 0.9,
  },

  buttons: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  btn: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "10px",
    background: "white",
    color: "#6366f1",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },

  // 🔥 Instructor Button (highlighted CTA)
  instructorBtn: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
  },

  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "50px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  card: {
    background: "rgba(255,255,255,0.15)",
    padding: "20px",
    borderRadius: "15px",
    width: "220px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
};