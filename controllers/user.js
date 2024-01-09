import { generateToken } from "../config/jwt.js";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        if (!userName || !email || !password)
            return res.status(404).send("mosoong required paramters username or password or email")
        if (!/[0-9]{2}[A-Za-z]{2}/.test(password))
            return res.status(400).send('password not valid')
        let hashedPassword = await bcrypt.hash(password, 15);

        let newUser = new User({ userName, password: hashedPassword, email });
        await newUser.save();
        let { _id, userName: y, roles, email: e } = newUser;
        let token = generateToken(newUser);
        res.json({ _id, roles, userName: y, token, email: e });
    }
    catch (err) {
        res.status(500).send("an error occured in....")
    }

}

export const login = async (req, res) => {
    try {
        let { userName, password } = req.body;
        if (!userName || !password)
            return res.status(404).send("mosoong required paramters username or password")
        if (!/[0-9]{2}[A-Za-z]{2}/.test(password))
            return res.status(400).send('password not valid')



        let loggedInUser = await User.findOne({ userName });
        if (!loggedInUser)
            return res.status(404).send("no user with such credentials")

        if (!await bcrypt.compare(password, loggedInUser.password))
            return res.status(404).send("no user with such credentials")
        let { userName: u, _id, email, roles } = loggedInUser;
        let token = generateToken(loggedInUser);
        res.json({ _id, roles, userName: u, token, email });

    }
    catch (err) {
        res.status(500).send("an error occured in....")
    }

}

export const getAllUsers = async (req, res) => {
    try {
        let allusers = await User.find({}, "-password");//projection -לשלוך חלק מהשדות
        res.json(allusers);

    }
    catch (err) {
        res.status(500).send("an error occured in....")
    }

}