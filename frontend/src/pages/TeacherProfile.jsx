import {
  useEffect,
  useState,
  useRef,
} from "react";

import axios from "axios";

import Layout from "../components/common/Layout";

function TeacherProfile() {

  // ================= REFS =================
  const galleryInputRef = useRef(null);

  const cameraInputRef = useRef(null);


  // ================= THEME =================
  const [theme] = useState(
    localStorage.getItem("theme") || "light"
  );


  // ================= PROFILE =================
  const [profile, setProfile] = useState({

    name: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    experience: "",
    linkedin: "",
    github: "",
    password: "",

    profileImage:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=teacher",
  });


  // ================= FETCH PROFILE =================
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await axios.get(
          "/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile((prev) => ({

          ...prev,

          ...res.data.user,

          profileImage:
            res.data.user.profileImage ||

            "https://api.dicebear.com/7.x/adventurer/svg?seed=teacher",
        }));

      } catch (err) {

        console.error(
          "PROFILE ERROR:",
          err
        );
      }
    };

    fetchProfile();

  }, []);


  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setProfile((prev) => ({

      ...prev,

      [name]: value,
    }));
  };


  // ================= IMAGE CHANGE =================
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageURL =
      URL.createObjectURL(file);

    setProfile((prev) => ({

      ...prev,

      profileImage: imageURL,
    }));
  };


  // ================= SAVE PROFILE =================
  const handleSave = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        "/api/user/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "✅ Profile Updated Successfully"
      );

      localStorage.setItem(
        "user",
        JSON.stringify(profile)
      );

    } catch (err) {

      console.error(
        "UPDATE ERROR:",
        err
      );

      alert(
        "❌ Failed to update profile"
      );
    }
  };


  return (

    <Layout>

      <div style={styles.page}>


        {/* ================= HEADER ================= */}
        <div style={styles.header}>


          {/* ================= AVATAR SECTION ================= */}
          <div style={styles.avatarSection}>


            <div style={styles.avatarWrapper}>


              <img
                src={profile.profileImage}
                alt="profile"
                style={styles.avatar}
              />


              {/* CAMERA OVERLAY */}
              <div
                style={styles.cameraOverlay}
                onClick={() =>
                  cameraInputRef.current.click()
                }
              >
                📷
              </div>


              {/* CAMERA INPUT */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />


              {/* GALLERY INPUT */}
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

            </div>


            {/* ================= BUTTONS ================= */}
            <div style={styles.uploadBtns}>


              {/* GALLERY */}
              <button
                style={styles.uploadBtn}
                onClick={() =>
                  galleryInputRef.current.click()
                }
              >
                📁 Choose Photo
              </button>


              {/* CAMERA */}
              <button
                style={styles.uploadBtn}
                onClick={() =>
                  cameraInputRef.current.click()
                }
              >
                📸 Take Photo
              </button>

            </div>

          </div>


          {/* ================= TITLE ================= */}
          <div>

            <h1
              style={{
                ...styles.heading,

                color:
                  theme === "dark"
                    ? "#ffffff"
                    : "#111827",
              }}
            >
              👨‍🏫 Teacher Profile
            </h1>

            <p style={styles.subtext}>
              Build your professional educator identity
            </p>

          </div>

        </div>


        {/* ================= PROFILE CARD ================= */}
        <div
          style={{
            ...styles.card,

            background:
              theme === "dark"
                ? "#111827"
                : "#ffffff",
          }}
        >

          <h2
            style={{
              color:
                theme === "dark"
                  ? "#ffffff"
                  : "#111827",
            }}
          >
            👤 Personal Information
          </h2>


          {/* NAME */}
          <input
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleChange}
            style={styles.input}
          />


          {/* EMAIL */}
          <input
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            style={styles.input}
          />


          {/* PHONE */}
          <input
            name="phone"
            placeholder="Mobile Number"
            value={profile.phone}
            onChange={handleChange}
            style={styles.input}
          />


          {/* BIO */}
          <textarea
            name="bio"
            placeholder="Professional Bio"
            value={profile.bio}
            onChange={handleChange}
            style={styles.textarea}
          />


          {/* SKILLS */}
          <input
            name="skills"
            placeholder="Skills"
            value={profile.skills}
            onChange={handleChange}
            style={styles.input}
          />


          {/* EXPERIENCE */}
          <input
            name="experience"
            placeholder="Experience"
            value={profile.experience}
            onChange={handleChange}
            style={styles.input}
          />


          {/* LINKEDIN */}
          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            value={profile.linkedin}
            onChange={handleChange}
            style={styles.input}
          />


          {/* GITHUB */}
          <input
            name="github"
            placeholder="GitHub URL"
            value={profile.github}
            onChange={handleChange}
            style={styles.input}
          />


          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={profile.password}
            onChange={handleChange}
            style={styles.input}
          />


          {/* SAVE */}
          <button
            style={styles.saveBtn}
            onClick={handleSave}
          >
            💾 Save Profile
          </button>

        </div>

      </div>

    </Layout>
  );
}

export default TeacherProfile;



// ================= STYLES =================
const styles = {

  page: {
    paddingBottom: "40px",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },

  avatarWrapper: {
    position: "relative",
    width: "180px",
    height: "180px",
  },

  avatar: {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    objectFit: "cover",

    border: "5px solid #2563eb",

    boxShadow:
      "0 10px 25px rgba(37,99,235,0.4)",
  },

  cameraOverlay: {
    position: "absolute",
    bottom: "10px",
    right: "10px",

    width: "50px",
    height: "50px",

    borderRadius: "50%",

    background: "#2563eb",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    cursor: "pointer",

    fontSize: "22px",

    color: "#fff",

    border: "3px solid white",
  },

  uploadBtns: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  uploadBtn: {
    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",

    color: "#fff",

    border: "none",

    padding: "12px 18px",

    borderRadius: "12px",

    cursor: "pointer",

    fontWeight: "600",

    transition: "0.3s",
  },

  heading: {
    fontSize: "56px",
    fontWeight: "800",
    marginBottom: "10px",
  },

  subtext: {
    fontSize: "24px",
    color: "#94a3b8",
  },

  card: {
    padding: "40px",
    borderRadius: "25px",

    display: "flex",
    flexDirection: "column",
    gap: "20px",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.1)",
  },

  input: {
    padding: "18px",

    borderRadius: "14px",

    border: "1px solid #cbd5e1",

    fontSize: "18px",

    outline: "none",
  },

  textarea: {
    padding: "18px",

    borderRadius: "14px",

    border: "1px solid #cbd5e1",

    minHeight: "120px",

    fontSize: "18px",

    outline: "none",
  },

  saveBtn: {
    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",

    color: "#fff",

    border: "none",

    padding: "18px",

    borderRadius: "14px",

    fontSize: "18px",

    fontWeight: "700",

    cursor: "pointer",

    marginTop: "10px",
  },
};