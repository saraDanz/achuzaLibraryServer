//בפורייקט שלנו נעשה ייבוא ע"יimport
//במקום להתשמש בcommonJS - require /module.exports
import express from "express";
import { config } from "dotenv";
import bookRouter from "./routes/book.js";
import mongoose from "mongoose";

config();//envכך גרמנו שנוד ידע כבר עכשיו לחפש בקובץ ששמו נקודה 
//כאשר אנו כותבים את המילה process.env


const app = express();
const mongoURI = process.env.DB_CONNECTION || "mongodb://localhost:27017/library";
mongoose.connect(mongoURI)
    .then((suc) => { console.log("mongo db connected sucessfully!!!", suc.connection.host) })
    .catch(err => {
        console.log("cannot connect mongoDB")
        console.log(err)
        process.exit(1);//סוגר את התכונית שאנחנו מתחילים להריץ בכישלון
    })


app.use(express.json())

app.use("/api/book", bookRouter);



let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

//enviornment variables-משתני סביבה