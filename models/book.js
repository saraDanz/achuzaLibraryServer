import Joi from "joi";
import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    //_id לא צריך לרשום
    name: { type: String, required: true },
    numPages: Number,
    isComix: Boolean,
    publishDate: { type: Date, default: Date.now() }

})

export const Book = mongoose.model("books", bookSchema);//מקשר בין הקולקשן 

export const bookValidator = (_bookToValidate) => {

    let bookJoi = Joi.object({
        name: Joi.string().min(5).max(8),
        numPages: Joi.number().min(0).max(40000),
    })

    return bookJoi.validate(_bookToValidate);
}