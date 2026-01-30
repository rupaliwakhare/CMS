import express from "express";
import {
  register,
  login,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", authMiddleware, getUserById);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);

export default router;
