/** express module load */
const { application, request } = require("express");
const express = require("express");
/** express active */
const app = express();

app.get("/", (req, res) => {
  res.send("hello API");
});

// http listen port 생성 서버 실행
app.listen(4000, () => console.log("API 백엔드.. 도전!"));

// "https://jsonplaceholder.typicode.com/todos/1";

// //** request module load */
// const request = require("request");
// test
const URL = "https://jsonplaceholder.typicode.com/todos/1";

const requests = require("request");
requests(URL, function (error, response, body) {
  console.log(request);
});

// test(local)
const cors = require("cors");
app.use(cors());
const port = 4000;

app.get("/test", (res, req) => {
  console.log(res, req);
});
