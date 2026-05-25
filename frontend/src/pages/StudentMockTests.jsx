import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import Layout from "../components/common/Layout";


function StudentMockTests() {

  const navigate =
    useNavigate();

  const [tests, setTests] =
    useState([]);


  // ================= FETCH MOCK TESTS =================
  useEffect(() => {

    const fetchTests =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await axios.get(

              "/api/mocktest/all",

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setTests(
            res.data.tests
          );

        } catch (error) {

          console.error(error);
        }
      };

    fetchTests();

  }, []);


  return (

    <Layout>

      <div style={styles.page}>


        {/* HEADER */}
        <h1 style={styles.heading}>
          📝 Available Mock Tests
        </h1>


        {/* EMPTY */}
        {tests.length === 0 && (

          <div style={styles.empty}>
            No mock tests available
          </div>
        )}


        {/* TESTS */}
        {tests.map((test) => (

          <div
            key={test._id}
            style={styles.card}
          >

            <div>

              <h2 style={styles.title}>
                {test.title}
              </h2>

              <p style={styles.questions}>
                {test.questions.length}
                {" "}
                Questions
              </p>

            </div>


            <button

              style={styles.btn}

              onClick={() =>
                navigate(
                  `/attempt-test/${test._id}`
                )
              }
            >
              🚀 Start Test
            </button>

          </div>
        ))}

      </div>

    </Layout>
  );
}

export default StudentMockTests;


// ================= STYLES =================
const styles = {

  page: {
    padding: "30px",
    color: "white",
  },

  heading: {
    fontSize: "48px",
    marginBottom: "30px",
  },

  empty: {
    background: "#111827",
    padding: "30px",
    borderRadius: "20px",
    fontSize: "22px",
  },

  card: {
    background: "#111827",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "20px",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",
  },

  title: {
    fontSize: "28px",
    marginBottom: "10px",
  },

  questions: {
    color: "#94a3b8",
  },

  btn: {
    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",

    color: "white",

    border: "none",

    padding: "16px 22px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",
  },
};