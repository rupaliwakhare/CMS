import express from "express"
import  protect from "../middleware/authMiddleware.js";
import {
  enrollCourse,
  getMyCourses,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/:courseId", protect, enrollCourse);

// Student view enrolled courses
router.get("/my-courses", protect, getMyCourses);

export default router;
