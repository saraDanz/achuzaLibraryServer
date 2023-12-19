import express from "express";
import * as bookController from "../controllers/book.js";

const router = express.Router();

router.get("/", bookController.getAllBooks)
router.get("/:id", bookController.getBookById)
router.delete("/:id", bookController.deleteBook)
router.post("/", bookController.addBook)
router.put("/:bookid", bookController.updateBook)

export default router;