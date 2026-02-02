import express from "express";
import {
  register,
  login,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", protect, getUserById);
router.put("/update/:id", protect, updateUser);
router.delete("/delete/:id", protect, deleteUser);

export default router;
