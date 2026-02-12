import express from "express";
import getStats from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/stats", protect, authorize("admin"), getStats);

export default router;
