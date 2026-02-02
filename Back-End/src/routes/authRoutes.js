import express from "express";
import {
  register,
  login,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);
router.get("/:id",upload.single("profileImage"), protect, getUserById);
router.put("/update/:id", protect, updateUser);
router.delete("/delete/:id", protect, deleteUser);

export default router;
