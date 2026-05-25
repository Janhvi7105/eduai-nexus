import MockTest
from "../models/MockTest.js";


// =======================================
// CREATE MOCK TEST
// =======================================
export const createMockTest =
  async (req, res) => {

    try {

      const {
        courseId,
        title,
        questions,
      } = req.body;


      // VALIDATION
      if (
        !title ||
        !questions ||
        questions.length === 0
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill all fields",
        });
      }


      // CREATE TEST
      const mockTest =
        await MockTest.create({

          courseId,
          title,
          questions,
        });


      res.status(201).json({

        success: true,

        mockTest,
      });

    } catch (error) {

      console.error(
        "CREATE TEST ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Failed to create mock test",
      });
    }
  };


// =======================================
// GET MOCK TEST BY COURSE
// =======================================
export const getMockTestByCourse =
  async (req, res) => {

    try {

      const mockTest =
        await MockTest.findOne({

          courseId:
            req.params.courseId,
        });


      res.json({

        success: true,

        mockTest,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch mock test",
      });
    }
  };


// =======================================
// GET SINGLE MOCK TEST
// =======================================
export const getSingleMockTest =
  async (req, res) => {

    try {

      const test =
        await MockTest.findById(
          req.params.testId
        );


      res.json({

        success: true,

        test,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch test",
      });
    }
  };


// =======================================
// GET ALL MOCK TESTS
// =======================================
export const getAllMockTests =
  async (req, res) => {

    try {

      const tests =
        await MockTest.find();

      console.log(
        "ALL MOCK TESTS:",
        tests
      );


      res.json({

        success: true,

        tests,
      });

    } catch (error) {

      console.error(
        "FETCH ALL TESTS ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch tests",
      });
    }
  };