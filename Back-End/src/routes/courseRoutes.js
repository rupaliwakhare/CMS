import express from "express";
import {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse
 
} from "../controllers/courseController.js";
import protect  from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.post("/", protect, authorize("admin", "instructor"),upload.single("thumbnail"), createCourse);
router.get("/", getCourses);
router.get("/:id", getSingleCourse);
router.put("/:id", protect, authorize("admin", "instructor"),upload.single("thambnail"), updateCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);

export default router;
