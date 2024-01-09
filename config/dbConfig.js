import mongoose from "mongoose";

export const connectToDB = () => {
    const mongoURI = process.env.DB_CONNECTION || "mongodb+srv://learn2024driveachuza:learn2024123456@cluster0.cgpwt91.mongodb.net/bookLibrary?retryWrites=true&w=majority";
    mongoose.connect(mongoURI)
        .then((suc) => { console.log("mongo db connected sucessfully!!!", suc.connection.host) })
        .catch(err => {
            console.log("cannot connect mongoDB")
            console.log(err)
            process.exit(1);//סוגר את התכונית שאנחנו מתחילים להריץ בכישלון
        })

}