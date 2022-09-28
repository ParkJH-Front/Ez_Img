/** express module load */
const express = require("express");
const app = express();

// const cors = require("cors");
// app.use(cors());

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

//임시 데이터
// const users = [
//   { id: 1, name: "user1" },
//   { id: 2, name: "user2" },
//   { id: 3, name: "user3" },
// ];

/**
 * 파라미터 변수 뜻
 * req : request 요청
 * res : response 응답
 */

/**
 * @path {GET} http://localhost:4000/
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
app.get("/", (req, res) => {
  res.send("express Server!!");
});

/**
 * @path {GET} http://localhost:4000/api/users
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
// app.get("/api/users", (req, res) => {
//   res.json({ ok: true, users: users });
// });

// app.get(4001, () => {
//   console.log("연결!");
// });
