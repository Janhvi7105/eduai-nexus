import AdminLayout from "../components/admin/AdminLayout";

function Revenue() {
  return (
    <AdminLayout>
      <div style={styles.page}>

        <h1 style={styles.heading}>
          💰 Revenue Dashboard
        </h1>

        <div style={styles.cards}>

          <div style={styles.card}>
            <h2>₹0</h2>
            <p>Gross Revenue</p>
          </div>

          <div style={styles.card}>
            <h2>₹0</h2>
            <p>Platform Revenue (30%)</p>
          </div>

          <div style={styles.card}>
            <h2>₹0</h2>
            <p>Instructor Revenue (70%)</p>
          </div>

          <div style={styles.card}>
            <h2>0</h2>
            <p>Total Enrollments</p>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default Revenue;

const styles = {
  page: {
    color: "white",
  },

  heading: {
    fontSize: "40px",
    marginBottom: "30px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#0f172a",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
  },
};