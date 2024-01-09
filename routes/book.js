import express from "express";
import * as bookController from "../controllers/book.js";
import { auth, authAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", bookController.getAllBooks)
router.get("/between", bookController.booksBetween)
router.get("/:id", bookController.getBookById)
router.delete("/:id", auth, bookController.deleteBook)
router.post("/", auth, bookController.addBook)
router.put("/:bookid", auth, bookController.updateBook)

export default router;