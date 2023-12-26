//בקונטרולר נרשוםפ את הקוד עצמו שמטפל במסד נתונים 
//בראוטר נזמן את הפונקציות מכאן
import { Book, bookValidator } from "../models/book.js";//אות ראשונה גדולה למודל
import mongoose from "mongoose";

export const getAllBooks = async (req, res) => {
    //params-פרמטרים שהם חובה כלומר אם לא יישלחו הכתובת לא מזוהה
    ///query  -> queryparams פרמטרים אופציונלים
    let { search, numPages, page, perPage } = req.query;//

    //http://localhost:4000/users/1
    //http://localhost:4000/users?name=2&age=15


    try {
        let allbooks;
        let serachObject = {};
        if (search)
            serachObject.name = new RegExp(search, "i");
        if (numPages)
            serachObject.numPages = numPages
        //שליפת כל הספרים מהמסד נתונים
        allbooks = await Book.find(serachObject)//.sort({ name: -1, numPages: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
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
    // if (!name || !numPages)
    //     return res.status(404).send("missing parameters name or numPAges");
    let validate = bookValidator(req.body);
    if (validate.error)
        return res.status(400).send(validate.error[0])

    try {

        let sameBooks = await Book.find({ numPages, name });
        if (sameBooks.length > 0)
            return res.status(409).send("כבר קיים ספר בשם כזה עם אות ומספר עמודים")

        let newBook = await Book.create({ name, numPages, isComix: isComix || false, publishDate })


        // let newBook = new Book({ name, numPages, isComix: isComix || false, publishDate })
        // await newBook.save();

        return res.status(201).json(newBook)
    }
    catch (err) {
        res.status(400).send("אא להוסיף" + err)
    }
}

export const booksBetween = async (req, res) => {

    let { from, to, perPage, page } = req.query;//

    try {
        let serachObject = {};
        if (from)
            serachObject.numPages = { $gte: from }
        if (to)
            serachObject.numPages = { $lte: to }

        //   let  allbooks = await Book.find({ numPages: { $gte: from }, numPages: { $lte: to } })
        let allbooks = await Book.find(serachObject)
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(allbooks)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את כל הספרים" + err.message)
    }
}