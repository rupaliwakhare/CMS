import express from "express";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";


const router = express.Router();

router.post("/", protect, authorize("admin", "instructor"), createCourse);
router.get("/", getCourses);
router.put("/:id", protect, authorize("admin", "instructor"), updateCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);

export default router;
