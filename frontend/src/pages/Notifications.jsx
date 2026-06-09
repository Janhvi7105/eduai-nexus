import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";

function Notifications() {

  const [notifications, setNotifications] =
    useState([]);

  const theme =
    localStorage.getItem("theme") || "light";


  // =================================
  // MARK NOTIFICATION AS READ
  // =================================
  const markRead = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `/api/notifications/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh notifications after marking as read
      const res = await axios.get(
        "/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(
        res.data.notifications || []
      );

    } catch (err) {

      console.error(err);
    }
  };


  // =================================
  // FETCH NOTIFICATIONS WITH AUTO-REFRESH
  // =================================
  useEffect(() => {

    const fetchNotifications = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await axios.get(
          "/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotifications(
          res.data.notifications || []
        );

      } catch (err) {

        console.error(err);
      }
    };

    fetchNotifications();

    const interval = setInterval(
      fetchNotifications,
      5000
    );

    return () => clearInterval(interval);

  }, []);


  return (
    <Layout>

      <div style={styles.page}>

        <h1 style={styles.heading}>
          🔔 Notifications
        </h1>


        {notifications.length === 0 ? (

          <div style={styles.empty}>
            No notifications yet ❗
          </div>

        ) : (

          notifications.map((n) => (

            <div
              key={n._id}
              style={{
                ...styles.card,

                background:
                  theme === "dark"
                    ? "#1e293b"
                    : "#ffffff",

                color:
                  theme === "dark"
                    ? "#f8fafc"
                    : "#111827",

                opacity: n.read ? 0.6 : 1,
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h3>{n.title}</h3>

                <span
                  style={{
                    background:
                      n.type === "completion"
                        ? "#10b981"
                        : "#2563eb",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                  }}
                >
                  {n.type}
                </span>
              </div>

              <p>
                {n.message}
              </p>

              <small>
                {new Date(
                  n.createdAt
                ).toLocaleString()}
              </small>

              {!n.read && (
                <button
                  onClick={() => markRead(n._id)}
                  style={{
                    marginTop: "12px",
                    padding: "6px 12px",
                    background: "#4f46e5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Mark Read
                </button>
              )}

            </div>
          ))
        )}

      </div>

    </Layout>
  );
}

export default Notifications;


// =================================
// STYLES
// =================================
const styles = {

  page: {
    padding: "20px",
  },

  heading: {
    fontSize: "34px",
    marginBottom: "25px",
  },

  card: {
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "15px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.05)",
  },

  empty: {
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
  },
};