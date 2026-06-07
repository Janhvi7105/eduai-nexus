import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token =
        localStorage.getItem("token");

      // Replace with actual course id for now
      const courseId =
        "6a23c14df4baee8e85221609";

      const res = await axios.get(
        `/api/notes/course/${courseId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setNotes(res.data.notes);

    } catch (err) {
      console.error(
        "Fetch Notes Error:",
        err
      );
    }
  };

  return (
    <Layout>
      <div style={styles.page}>
        <h2 style={styles.title}>
          📖 Course Notes
        </h2>

        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          <div style={styles.list}>
            {notes.map((note) => (
              <div
                key={note._id}
                style={styles.card}
              >
                <span>
                  📘 {note.title}
                </span>

                <button
                  style={styles.downloadBtn}
                  onClick={() => {
                    const url = note.fileUrl.startsWith("http")
                      ? note.fileUrl
                      : `http://localhost:5000${note.fileUrl}`;

                    fetch(url)
                      .then((response) => response.blob())
                      .then((blob) => {
                        const blobUrl =
                          window.URL.createObjectURL(blob);

                        const link =
                          document.createElement("a");

                        link.href = blobUrl;
                        link.download =
                          `${note.title}.pdf`;

                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        window.URL.revokeObjectURL(blobUrl);
                      });
                  }}
                >
                  ⬇ Download Notes
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Notes;

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
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.05)",
  },

  downloadBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  },
};