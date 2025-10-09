require("dotenv").config();
const { Client } = require("pg");

// .env 파일에서 PostgreSQL 접속 정보 불러오기
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const dbconnect = async () => {
    try {
        await client.connect();
        console.log("DB Connected");

        // 해당 SW에 사용할 PostgreSQL DB의 Table이 없을 경우 Table 생성
        // 채팅방 로그인 테이블 --> 테이블에 사용자 ID, 패스워드 저장
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS chat_login (
              id SERIAL PRIMARY KEY,
              username VARCHAR(100) NOT NULL,
              password VARCHAR(100) NOT NULL
            );
        `;
        await client.query(createTableQuery);

        // 채팅방 채팅 내용 저장 테이블
        const createChatLogTableQuery = `
            CREATE TABLE IF NOT EXISTS all_chat_log (
              id SERIAL PRIMARY KEY,
              username VARCHAR(100) NOT NULL,
              message VARCHAR(100) NOT NULL
            );
        `;
        await client.query(createChatLogTableQuery);

    } catch (err) {
        // DB 연결 실패시 에러 메세지 표시
        console.log(err);
    }
}

module.exports = { client, dbconnect };
