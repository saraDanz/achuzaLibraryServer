import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    //_id לא צריך לרשום
    name: { type: String, required: true },
    numPages: Number,
    isComix: Boolean,
    publishDate: { type: Date, default: Date.now() }

})

export const Book=mongoose.model("books",bookSchema);//מקשר בין הקולקשן 