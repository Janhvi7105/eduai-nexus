import {
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
} from "react-router-dom";

import Layout from "../components/common/Layout";


function MockTest() {

  const { courseId } =
    useParams();

  // ================= STATES =================
  const [title, setTitle] =
    useState("");

  const [questions, setQuestions] =
    useState([

      {
        question: "",

        options: [
          "",
          "",
          "",
          "",
        ],

        correctAnswer: 0,
      },
    ]);


  // ================= ADD QUESTION =================
  const addQuestion = () => {

    setQuestions([

      ...questions,

      {
        question: "",

        options: [
          "",
          "",
          "",
          "",
        ],

        correctAnswer: 0,
      },
    ]);
  };


  // ================= QUESTION CHANGE =================
  const handleQuestionChange =
    (
      index,
      field,
      value
    ) => {

      const updatedQuestions =
        [...questions];

      updatedQuestions[index][field] =
        value;

      setQuestions(
        updatedQuestions
      );
    };


  // ================= OPTION CHANGE =================
  const handleOptionChange =
    (
      questionIndex,
      optionIndex,
      value
    ) => {

      const updatedQuestions =
        [...questions];

      updatedQuestions[
        questionIndex
      ].options[
        optionIndex
      ] = value;

      setQuestions(
        updatedQuestions
      );
    };


  // ================= SAVE MOCK TEST =================
  const handleSave =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(

          "/api/mocktest/create",

          {
            courseId,
            title,
            questions,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "✅ Mock Test Created Successfully"
        );

      } catch (error) {

        console.error(
          "MOCK TEST ERROR:",
          error
        );

        alert(
          "❌ Failed to create mock test"
        );
      }
    };


  return (

    <Layout>

      <div style={styles.page}>


        {/* ================= HEADER ================= */}
        <div style={styles.header}>


          <h1 style={styles.heading}>
            📝 Create Mock Test
          </h1>


          <p style={styles.subtext}>
            Create practice tests for students
          </p>

        </div>


        {/* ================= TEST TITLE ================= */}
        <div style={styles.card}>


          <input
            type="text"

            placeholder="Enter Mock Test Title"

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }

            style={styles.input}
          />

        </div>


        {/* ================= QUESTIONS ================= */}
        {questions.map(
          (
            question,
            qIndex
          ) => (

            <div
              key={qIndex}
              style={styles.questionCard}
            >

              <h2 style={styles.questionHeading}>
                Question {qIndex + 1}
              </h2>


              {/* QUESTION */}
              <input
                type="text"

                placeholder="Enter Question"

                value={
                  question.question
                }

                onChange={(e) =>
                  handleQuestionChange(
                    qIndex,
                    "question",
                    e.target.value
                  )
                }

                style={styles.input}
              />


              {/* OPTIONS */}
              {question.options.map(
                (
                  option,
                  oIndex
                ) => (

                  <input
                    key={oIndex}

                    type="text"

                    placeholder={`Option ${oIndex + 1}`}

                    value={option}

                    onChange={(e) =>
                      handleOptionChange(
                        qIndex,
                        oIndex,
                        e.target.value
                      )
                    }

                    style={styles.input}
                  />
                )
              )}


              {/* CORRECT ANSWER */}
              <select

                value={
                  question.correctAnswer
                }

                onChange={(e) =>
                  handleQuestionChange(
                    qIndex,
                    "correctAnswer",
                    Number(
                      e.target.value
                    )
                  )
                }

                style={styles.select}
              >

                <option value={0}>
                  Correct Answer:
                  Option 1
                </option>

                <option value={1}>
                  Correct Answer:
                  Option 2
                </option>

                <option value={2}>
                  Correct Answer:
                  Option 3
                </option>

                <option value={3}>
                  Correct Answer:
                  Option 4
                </option>

              </select>

            </div>
          )
        )}


        {/* ================= BUTTONS ================= */}
        <div style={styles.buttonContainer}>


          <button
            style={styles.addBtn}
            onClick={addQuestion}
          >
            ➕ Add Question
          </button>


          <button
            style={styles.saveBtn}
            onClick={handleSave}
          >
            💾 Save Mock Test
          </button>

        </div>

      </div>

    </Layout>
  );
}

export default MockTest;



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
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "10px",
  },

  subtext: {
    color: "#94a3b8",
    fontSize: "18px",
  },

  card: {
    background: "#111827",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "30px",
  },

  questionCard: {
    background: "#111827",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "25px",
  },

  questionHeading: {
    marginBottom: "20px",
    fontSize: "28px",
  },

  input: {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    marginBottom: "15px",
    fontSize: "16px",
    background: "#1f2937",
    color: "white",
  },

  select: {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    background: "#1f2937",
    color: "white",
  },

  buttonContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  addBtn: {
    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",

    color: "white",

    border: "none",

    padding: "16px 24px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",

    fontSize: "16px",
  },

  saveBtn: {
    background:
      "linear-gradient(135deg,#10b981,#059669)",

    color: "white",

    border: "none",

    padding: "16px 24px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",

    fontSize: "16px",
  },
};