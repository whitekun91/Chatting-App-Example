const asyncHandler = require('express-async-handler');
const { client, dbconnect } = require('../config/dbconnect');
require("dotenv").config();

const getChat = (req, res) => {
    const { username } = req.query;
    res.render('chat', { username: username });
}

module.exports = getChat;
