import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
} from "react-router-dom";

import Layout
from "../components/common/Layout";


function AttemptMockTest() {

  const { testId } =
    useParams();


  // ================= STATES =================
  const [test, setTest] =
    useState(null);

  const [answers, setAnswers] =
    useState({});

  const [score, setScore] =
    useState(null);

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);


  // ================= FETCH MOCK TEST =================
  useEffect(() => {

    const fetchMockTest =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await axios.get(

              `http://localhost:5000/api/mocktest/${testId}`,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setTest(
            res.data.test
          );

        } catch (error) {

          console.error(
            "FETCH TEST ERROR:",
            error
          );
        }
      };

    fetchMockTest();

  }, [testId]);


  // ================= SELECT ANSWER =================
  const handleAnswer =
    (optionIndex) => {

      // ❌ Prevent changing answers after submit
      if (score !== null) {
        return;
      }

      setAnswers({

        ...answers,

        [currentQuestion]:
          optionIndex,
      });
    };


  // ================= NEXT QUESTION =================
  const handleNext =
    () => {

      if (
        currentQuestion <
        test.questions.length - 1
      ) {

        setCurrentQuestion(
          currentQuestion + 1
        );
      }
    };


  // ================= PREVIOUS QUESTION =================
  const handlePrevious =
    () => {

      if (
        currentQuestion > 0
      ) {

        setCurrentQuestion(
          currentQuestion - 1
        );
      }
    };


  // ================= SUBMIT TEST =================
  const handleSubmit =
    () => {

      let totalMarks = 0;

      test.questions.forEach(
        (
          question,
          index
        ) => {

          if (
            answers[index] ===
            question.correctAnswer
          ) {

            totalMarks++;
          }
        }
      );

      setScore(totalMarks);
    };


  // ================= LOADING =================
  if (!test) {

    return (

      <Layout>

        <div style={styles.loading}>
          ⏳ Loading Mock Test...
        </div>

      </Layout>
    );
  }


  const question =
    test.questions[currentQuestion];


  return (

    <Layout>

      <div style={styles.page}>


        {/* ================= HEADER ================= */}
        <div style={styles.header}>


          <h1 style={styles.heading}>
            📝 {test.title}
          </h1>


          <p style={styles.subtext}>
            Practice and improve your skills
          </p>

        </div>


        {/* ================= RESULT ================= */}
        {score !== null && (

          <div style={styles.resultBox}>


            <h2>
              🎉 Mock Test Completed
            </h2>


            <p style={styles.score}>
              Your Score:
              {" "}
              {score}
              /
              {test.questions.length}
            </p>

          </div>
        )}


        {/* ================= QUESTION CARD ================= */}
        <div style={styles.questionCard}>


          <h2 style={styles.question}>

            Q{currentQuestion + 1}.
            {" "}
            {question.question}

          </h2>


          {/* ================= OPTIONS ================= */}
          {question.options.map(
            (
              option,
              oIndex
            ) => (

              <button

                key={oIndex}

                onClick={() =>
                  handleAnswer(
                    oIndex
                  )
                }

                style={{
                  ...styles.option,

                  background:

                    // AFTER SUBMIT
                    score !== null

                      ? (

                          // ✅ CORRECT ANSWER
                          oIndex ===
                          question.correctAnswer

                            ? "#16a34a"

                            // ❌ WRONG SELECTED ANSWER
                            : answers[
                                currentQuestion
                              ] === oIndex

                            ? "#dc2626"

                            // NORMAL OPTION
                            : "#1f2937"
                        )

                      // BEFORE SUBMIT
                      : answers[
                          currentQuestion
                        ] === oIndex

                      ? "#2563eb"

                      : "#1f2937",
                }}
              >

                {oIndex + 1}.
                {" "}
                {option}

              </button>
            )
          )}


          {/* ================= BUTTONS ================= */}
          <div style={styles.buttonRow}>


            {/* PREVIOUS */}
            <button

              style={styles.prevBtn}

              onClick={
                handlePrevious
              }

              disabled={
                currentQuestion === 0
              }
            >
              ⬅ Previous
            </button>


            {/* NEXT / SUBMIT */}
            {currentQuestion <
            test.questions.length - 1 ? (

              <button

                style={styles.nextBtn}

                onClick={
                  handleNext
                }
              >
                Next ➡
              </button>

            ) : (

              <button

                style={styles.submitBtn}

                onClick={
                  handleSubmit
                }

                disabled={
                  score !== null
                }
              >
                ✅ Submit Test
              </button>
            )}

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default AttemptMockTest;


// ================= STYLES =================
const styles = {

  page: {
    padding: "30px",
    color: "white",
  },

  header: {
    marginBottom: "30px",
  },

  heading: {
    fontSize: "52px",
    fontWeight: "800",
    marginBottom: "10px",
  },

  subtext: {
    color: "#94a3b8",
    fontSize: "20px",
  },

  questionCard: {
    background: "#111827",
    padding: "35px",
    borderRadius: "25px",
    marginBottom: "25px",
  },

  question: {
    marginBottom: "25px",
    fontSize: "34px",
    fontWeight: "700",
  },

  option: {
    width: "100%",
    padding: "18px",
    borderRadius: "14px",
    border: "none",
    outline: "none",
    marginBottom: "18px",
    color: "white",
    cursor: "pointer",
    fontSize: "20px",
    textAlign: "left",
    transition: "0.3s",
  },

  buttonRow: {
    display: "flex",
    justifyContent:
      "space-between",
    marginTop: "30px",
  },

  prevBtn: {
    background: "#334155",
    color: "white",
    border: "none",
    padding: "16px 24px",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "700",
  },

  nextBtn: {
    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",

    color: "white",

    border: "none",

    padding: "16px 24px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",

    fontSize: "18px",
  },

  submitBtn: {
    background:
      "linear-gradient(135deg,#10b981,#059669)",

    color: "white",

    border: "none",

    padding: "16px 24px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",

    fontSize: "18px",
  },

  resultBox: {
    marginBottom: "30px",

    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",

    padding: "30px",

    borderRadius: "20px",

    textAlign: "center",
  },

  score: {
    fontSize: "34px",
    fontWeight: "800",
    marginTop: "15px",
  },

  loading: {
    padding: "40px",
    color: "white",
    fontSize: "30px",
  },
};