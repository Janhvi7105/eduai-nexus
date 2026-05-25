import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";

function Notifications() {

  const [notifications, setNotifications] =
    useState([]);

  const theme =
    localStorage.getItem("theme") || "light";


  // =================================
  // FETCH NOTIFICATIONS
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
              }}
            >

              <h3>
                {n.title}
              </h3>

              <p>
                {n.message}
              </p>

              <small>
                {new Date(
                  n.createdAt
                ).toLocaleString()}
              </small>

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