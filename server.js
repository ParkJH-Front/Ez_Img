// express, cors, body-parser module load
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
const { findAllByDisplayValue } = require("@testing-library/react");
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

//로그인 로직
app.post("/Profiles", (req, res) => {
  // console.log(req.body);
  const { userID, userPW } = req.body;
  // console.log(userID, userPW);
  const userInfo = dataJson.Profiles.filter((ID) => ID.id === userID);
  const checkID = userInfo[0]?.id === userID;
  const checkPW = userInfo[0]?.password === userPW;
  console.log(`ID확인 : ${checkID}, PW확인 : ${checkPW}`);

  if (checkID === false) {
    res.json({
      ok: false,
      error: "일치하는 ID가 없습니다. 다시 확인해주세요.",
    });
  } else if (checkPW === false) {
    res.json({
      ok: false,
      error: "일치하는 PW가 없습니다. 다시 확인해주세요.",
    });
  } else {
    res.json({ ok: true });
  }
});

// 회원가입 로직
// 해결해야할점
// 1. 빈값이 전달되었을때 검증
// 2. json 데이터 내 회원정보 추가 및 저장
// 추후 기능업그레이드 사항
// 1. 캡챠
// 2. 외부 API 계정 연동 (google, github, kakao ...)
app.post("/singup", (req, res) => {
  const { newID, newPW, rePW, newNic, newEmail } = req.body;
  console.log(newID, newPW, rePW, newNic, newEmail);

  // 1. ID 중복체크
  const checkID = dataJson.Profiles.filter((value) => value.id === newID);
  // 2. Nic 중복체크
  const checkNic = dataJson.Profiles.filter((value) => value.name === newNic);
  // 3. Email 중복체크
  const checkEmail = dataJson.Profiles.filter(
    (value) => value.email === newEmail
  );

  if (checkID.length !== 0) {
    res.json({ ok: false, error: "ID가 중복입니다." });
  } else if (checkNic.length !== 0) {
    res.json({ ok: false, error: "nicname 이 중복입니다." });
  } else if (checkEmail.length !== 0) {
    res.json({ ok: false, error: "email이 중복입니다." });
  } else if (newPW !== rePW) {
    res.json({ ok: false, error: "password 가 일치하지 않습니다." });
  } else {
    res.json({ ok: true });
  }
});

// http listen port 생성 서버 실행
app.listen(port, () => {
  console.log("express active");
});
