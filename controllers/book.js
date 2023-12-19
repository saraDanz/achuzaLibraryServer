//בקונטרולר נרשוםפ את הקוד עצמו שמטפל במסד נתונים 
//בראוטר נזמן את הפונקציות מכאן
import { Book } from "../models/book.js";//אות ראשונה גדולה למודל
import mongoose from "mongoose";

export const getAllBooks = async (req, res) => {

    // Book.find({})
    //     .then((allbooks) => {
    //         res.json(allbooks)
    //         console.log("finish")
    //     })
    //     .catch(err => { res.status(400).send("Nצטערים") })


    try {
        let allbooks = await Book.find({}) //שליפת כל הספרים מהמסד נתונים
        res.json(allbooks)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את כל הספרים" + err.message)
    }
}
export const getBookById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id))
            return res.status(400).send("קוד אינו תקין")
        let book = await Book.findById(req.params.id) //שליפת כל הספרים מהמסד נתונים
        if (!book)
            return res.status(404).send("לא קיים ספר עם כזה קוד")
        res.json(book)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את הספר הספרים" + err.message)
    }

}
export const deleteBook = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("not valid id");

    let deletedBook = await Book.findByIdAndDelete(id)
    if (!deletedBook)
        return res.status(404).send("לא נמצא ספר עם כזה קוד למחיקה")
    return res.json(deletedBook);

}
export const updateBook = async (req, res) => {
    //אפשר לעדכן ישר בתוך המסד נתונים
    //אפשר לשלוף לעדכן כאן ולשמור

    let { bookid } = req.params;
    if (!mongoose.isValidObjectId(bookid))
        return res.status(400).send("not valid id");
    try {


        let bookToUpdate = await Book.findById(bookid);
        if (!bookToUpdate)
            return res.status(404).send("לא נמצא ספר עם קוד כזה")
        bookToUpdate.name = req.body.name || bookToUpdate.name;
        bookToUpdate.numPages = req.body.numPages || bookToUpdate.numPages;
        bookToUpdate.publishDate = req.body.publishDate || bookToUpdate.publishDate;
        bookToUpdate.isComix = req.body.isComix || bookToUpdate.isComix;

        await bookToUpdate.save();
        res.json(bookToUpdate);
    } catch (err) {
        res.status(400).send("אא לעדכן" + err)
    }

}

export const addBook = async (req, res) => {
    let { name, numPages, isComix, publishDate } = req.body;
    if (!name || !numPages)
        return res.status(404).send("missing parameters name or numPAges");
    try {

        let sameBooks = await Book.find({ numPages, name });
        if (sameBooks.length > 0)
            return res.status(409).send("כבר קיים ספר בשם כזה עם אות ומספר עמודים")

        let newBook = Book.create({ name, numPages, isComix: isComix || false, publishDate })
        await newBook.save();

        return res.status(201).json(newBook)
    }
    catch (err) {
        res.status(400).send("אא להוסיף" + err)
    }
}