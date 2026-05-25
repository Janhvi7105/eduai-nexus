import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";

function Profile() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("account");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ================= LOAD PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);

        setForm({
          firstName: res.data.user.firstName || res.data.user.name || "",
          lastName: res.data.user.lastName || "",
          phone: res.data.user.phone || "",
          city: res.data.user.city || "",
          bio: res.data.user.bio || "",
        });

      } catch (err) {
        console.error(err);
        alert("Failed to load profile ❌");
      }
    };

    fetchProfile();
  }, []);

  // ================= UPDATE PROFILE =================
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "/api/user/update-profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated ✅");

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

    } catch (err) {
      alert("Update failed ❌");
    }
  };

  // ================= UPDATE PASSWORD =================
  const handleUpdatePassword = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("Passwords do not match ❌");
        return;
      }

      const token = localStorage.getItem("token");

      await axios.put(
        "/api/user/update-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password updated 🔐");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      alert(err.response?.data?.message || "Error ❌");
    }
  };

  if (!user) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <Layout>
      <div style={styles.container}>

        {/* LEFT CARD */}
        <div style={styles.leftCard}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h3>{user?.name}</h3>
          <p>{user?.email}</p>

          <div style={styles.stats}>
            <div>
              <h4>5</h4>
              <p>Courses</p>
            </div>
            <div>
              <h4>2</h4>
              <p>Exams</p>
            </div>
            <div>
              <h4>80%</h4>
              <p>Progress</p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div style={styles.rightSection}>

          {/* TABS */}
          <div style={styles.tabs}>
            <button onClick={() => setTab("account")}>Account</button>
            <button onClick={() => setTab("security")}>Security</button>
            <button onClick={() => setTab("stats")}>Stats</button>
          </div>

          {/* ACCOUNT */}
          {tab === "account" && (
            <div style={styles.form}>
              <input
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />

              <input
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />

              <input value={user?.email} disabled />

              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <input
                placeholder="City"
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
              />

              <textarea
                placeholder="Bio"
                value={form.bio}
                onChange={(e) =>
                  setForm({ ...form, bio: e.target.value })
                }
              />

              <button style={styles.saveBtn} onClick={handleUpdateProfile}>
                Update Profile
              </button>
            </div>
          )}

          {/* SECURITY */}
          {tab === "security" && (
            <div style={styles.form}>
              <input
                placeholder="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
              />

              <input
                placeholder="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />

              <input
                placeholder="Confirm Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />

              <button style={styles.saveBtn} onClick={handleUpdatePassword}>
                Update Password
              </button>
            </div>
          )}

          {/* STATS */}
          {tab === "stats" && (
            <div style={styles.statsBox}>
              <h3>📊 Learning Stats</h3>
              <p>Courses Enrolled: 5</p>
              <p>Exams Attempted: 2</p>
              <p>Progress: 80%</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;


// 🎨 STYLES (same as yours)
const styles = {
  container: { display: "flex", gap: "20px" },
  leftCard: {
    width: "250px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    margin: "auto",
  },
  stats: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  rightSection: {
    flex: 1,
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },
  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  saveBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  statsBox: {
    padding: "10px",
  },
};