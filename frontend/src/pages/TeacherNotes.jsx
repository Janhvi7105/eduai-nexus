import { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import axios from "axios";

function TeacherNotes() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "/api/courses/my-courses",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setCourses(res.data.courses);
    };

    fetchCourses();
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "/api/notes",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
      setNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSelected = async () => {
    if (!selectedNote) {
      alert("Select a note first");
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "courseId",
        courseId
      );

      if (file) {
        formData.append(
          "file",
          file
        );
      }

      await axios.put(
        `/api/notes/${selectedNote}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Notes updated successfully ✅"
      );

      fetchNotes();

    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedNote) {
      alert("Please select a note");
      return;
    }

    const confirmDelete =
      window.confirm(
        "Delete this note?"
      );

    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("token");

      await axios.delete(
        `/api/notes/${selectedNote}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
      alert("Notes deleted successfully ✅");
      fetchNotes();
      setSelectedNote("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "file",
        file
      );

      formData.append(
        "courseId",
        courseId
      );

      const res =
        await axios.post(
          "/api/notes/upload",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      alert(
        "Notes uploaded successfully ✅"
      );

      console.log(res.data);

      setTitle("");
      setFile(null);
      setCourseId("");
      fetchNotes();

    } catch (err) {

      console.error(err);

      alert(
        "Upload failed ❌"
      );
    }
  };

  return (
    <Layout>
      <h1>📖 Upload Notes</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "30px",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          maxWidth: "600px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label>Select Course</label>

          <select
            value={courseId}
            onChange={(e) =>
              setCourseId(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          >
            <option value="">
              Select Course
            </option>

            {courses.map((course) => (
              <option
                key={course._id}
                value={course._id}
              >
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Notes Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="React Hooks Notes"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Select PDF</label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Select Existing Note</label>

          <select
            value={selectedNote}
            onChange={(e) => {
              const noteId =
                e.target.value;

              setSelectedNote(noteId);

              const note =
                notes.find(
                  (n) => n._id === noteId
                );

              if (note) {
                setTitle(note.title);
                setCourseId(
                  note.courseId
                );
              }
            }}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          >
            <option value="">
              Select Note
            </option>

            {notes.map((note) => (
              <option
                key={note._id}
                value={note._id}
              >
                {note.title}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Upload Notes
          </button>

          <button
            type="button"
            onClick={handleEditSelected}
            style={{
              padding: "12px 24px",
              background: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Edit Notes
          </button>

          <button
            type="button"
            onClick={handleDeleteSelected}
            style={{
              padding: "12px 24px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Delete Notes
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default TeacherNotes;