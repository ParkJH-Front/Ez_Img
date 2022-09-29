// express, cors, body-parser module load
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 4000;

//test data
const dataJson = {
  Profiles: [
    {
      id: "test",
      password: "test1234",
      email: "test@test.com",
      name: "test00",
      scrapImg:
        "http://t1.daumcdn.net/encyclop/m74/6LqaLGshJnr1kfKHz2uQ32xkAJoe529TONOTxlrj",
    },
    {
      id: "test1",
      password: "test12341",
      email: "test1@test.com",
      name: "test11",
    },
    {
      id: "test2",
      password: "test12324",
      email: "test2@test.com",
      name: "test22",
    },
    {
      id: "test3",
      password: "test112234",
      email: "test3@test.com",
      name: "test33",
    },
    {
      id: "집집집",
      password: "jsonWKd",
      email: "집집집@ezimg.com",
      name: "귀요미집집집",
    },
    {
      id: "test5",
      password: "jsonWKd",
      email: "test5@ezimg.com",
      name: "귀요미test5",
    },
    {
      id: "test6",
      password: "jsonWKd",
      email: "test6@ezimg.com",
      name: "귀요미test6",
    },
  ],
  Forum: [
    {
      title: "첫번째 글",
      id: "작성자",
      date: "2022.08.23",
      body: "글내용이 쏚쏚1212!",
      comment: "첫번째 댓글",
      count: 0,
    },
    {
      title: "두번째 글",
      id: "작성자",
      date: "2022.08.23",
      body: "글내용이 쏚쏚!",
      comment: "첫번째 댓글",
      count: 0,
    },
    {
      title: "세번째 글",
      id: "작성자",
      date: "2022.08.23",
      body: "글내용이 123123쏚쏚!",
      comment: "첫번째 댓글",
      count: 0,
    },
  ],
};

app.post("/Profiles", (req, res) => {
  console.log(req.body);
  const { userID, userPW } = req.body;
  console.log(userID, userPW);
  if (dataJson.filter((data) => data.id === userID) === null) {
  }
});

// http listen port 생성 서버 실행
app.listen(port, () => {
  console.log("express active");
});
