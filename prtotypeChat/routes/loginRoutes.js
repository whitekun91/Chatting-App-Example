const express = require("express");
const router = express.Router();

// 로그인 및 회원등록 메소드
const {
  getLogin,
  loginUser,
  getRegister,
  registerUser
} = require('../controllers/loginController');

// 채팅방 메소드
const getChat = require("../controllers/chatController");

// 메인 시작 라우터 : 로그인 페이지
router.route('/')
  .get(getLogin)
  .post(loginUser);

// 회원 등록 라우터
router.route('/register')
  .get(getRegister)
  .post(registerUser);

// 채팅방 라우터
router.route('/chat')
  .get(getChat);

module.exports = router;
