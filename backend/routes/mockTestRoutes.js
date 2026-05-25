import express from "express";

import {

  createMockTest,

  getMockTestByCourse,

  getSingleMockTest,

  getAllMockTests,

} from "../controllers/mockTestController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";


const router =
  express.Router();


// =======================================
// CREATE MOCK TEST
// =======================================
router.post(

  "/create",

  protect,

  createMockTest
);


// =======================================
// GET ALL MOCK TESTS
// =======================================
router.get(

  "/all",

  protect,

  getAllMockTests
);


// =======================================
// GET MOCK TEST BY COURSE
// =======================================
router.get(

  "/course/:courseId",

  protect,

  getMockTestByCourse
);


// =======================================
// GET SINGLE MOCK TEST
// =======================================
router.get(

  "/:testId",

  protect,

  getSingleMockTest
);


export default router;