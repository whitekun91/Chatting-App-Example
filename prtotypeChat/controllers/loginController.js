const asyncHandler = require('express-async-handler');
const { client, dbconnect } = require('../config/dbconnect');
const bcrypt = require("bcrypt");
require("dotenv").config();

const jwcSecret = process.env.JWT_TOKEN;
const jwc = require("jsonwebtoken");

// Get login page
const getLogin = (req, res) => {
    res.render("home")
}

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM chat_login WHERE username = $1';
    const result = await client.query(query, [username]);
    const user = result.rows[0];
    if (!user) {
        return res.json({ message: 'Not Match' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ message: 'Not Match' });
    }
    const token = jwc.sign({ id: user.id }, jwcSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect(`/chat?username=${username}`);
});

// Get register page
const getRegister = (req, res) => {
    res.render('register');
}

// Post register
const registerUser = asyncHandler(async (req, res) => {
    const { username, password, password2 } = req.body;
    if (password === password2) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO chat_login (username, password) VALUES ($1, $2) RETURNING *;';
        const values = [username, hashedPassword];
        await client.query(query, values);
        res.json({ message: "Register successful", values });
    } else {
        res.send("Register Failed");
    }
});

module.exports = { getLogin, loginUser, getRegister, registerUser };
