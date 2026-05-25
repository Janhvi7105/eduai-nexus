import Layout from "../components/common/Layout";

function AdminDashboard() {
  return (
    <Layout>
      <h1>👑 Admin Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <h3>Manage Users</h3>
        <p>List of users will appear here</p>
      </div>
    </Layout>
  );
}

export default AdminDashboard;