//בפורייקט שלנו נעשה ייבוא ע"יimport
//במקום להתשמש בcommonJS - require /module.exports
import express from "express";
import { config } from "dotenv";
import bookRouter from "./routes/book.js";
import userRouter from "./routes/user.js";
import { connectToDB } from "./config/dbConfig.js";
import cors from "cors"
import { erroHandling } from "./middlewares/errorHandling.js";

config();//envכך גרמנו שנוד ידע כבר עכשיו לחפש בקובץ ששמו נקודה 
//כאשר אנו כותבים את המילה process.env
connectToDB();


const app = express();
app.use(express.json())//מפעיל פונקציה שמחזירה פונקציה 
// app.use(cors({origin:"http://localhost:3000",methods:"GET POST"}))
app.use(cors())//פונקציה שבונה מידלאור ומחזירה אותו
app.use(express.static('images'))
app.use("/api/book", bookRouter);
app.use("/api/user", userRouter);


app.use(erroHandling)


let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

//enviornment variables-משתני סביבה