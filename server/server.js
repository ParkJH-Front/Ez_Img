// express, cors, body-parser module load
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const fs = require("fs");
const { json } = require("body-parser");

const port = 4000;

const fetch = require("node-fetch");
const { resolve } = require("path");
const { rejects } = require("assert");

// json data file read
const dataBuffer = fs.readFileSync(__dirname + "/data_json.json");
const datalow = dataBuffer.toString();
const dataJson = JSON.parse(datalow);

//로그인 로직
app.post("/Profiles", (req, res) => {
  const { userID, userPW } = req.body;
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
// 추후 기능업그레이드 사항
// 1. 캡챠
// 2. 외부 API 계정 연동 (google, github, kakao ...)
app.post("/singup", (req, res) => {
  const { newID, newPW, rePW, newNic, newEmail } = req.body;
  console.log(newID, newPW, rePW, newNic, newEmail);

  const checkID = dataJson.Profiles.filter((value) => value.id === newID);
  const checkNic = dataJson.Profiles.filter((value) => value.name === newNic);
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
    dataJson.Profiles.push({
      id: newID,
      password: newPW,
      email: newEmail,
      name: newNic,
      scrap: [],
    });
    const jsonFileSave = JSON.stringify(dataJson);
    fs.writeFileSync("data_json.json", jsonFileSave);
  }
});

//스크랩 기능 로직
// 1. 로그인 된 사용자의 정보에 접근
// 2. 해당 사용자의 json data 에 scrap: url d추가
// 3. 저장
app.post("/scrap", (req, res) => {
  const scrapData = req.body;
  const user = scrapData.user;
  const imgURL = scrapData.imgUrl;
  // user : null or username , scrapImg : url
  console.log(user, imgURL);

  if ((user === null) | undefined) {
    res.json({ ok: false, error: "로그인 후 이용해주세요." });
  } else {
    const UserData = dataJson.Profiles.filter((ID) => ID.id === `${user}`);
    const duplicateCheck = UserData[0].scrap.some((item) => item === imgURL);
    if (duplicateCheck === true) {
      res.send({ ok: false, error: "이미 저장된 이미지 입니다." });
    } else {
      UserData[0].scrap.push(imgURL);
      fs.writeFileSync("data_json.json", JSON.stringify(dataJson));
      res.send({ ok: true, message: "저장에 성공하였습니다." });
    }
  }
});

//외부 API 연결

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  let URL = `https://dapi.kakao.com/v2/search/image?query=${keyword}`;
  fetch(URL, {
    headers: {
      Authorization: "KakaoAK 17d6f89d24fa2565f0e7155dc37188f0",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      res.send(json);
    });
});

//이미지 다운로드 로직
// const router = express.Router();
app.post("/download", (req, res) => {
  const URL = req.body.URL;
  function download(URL, fileName) {
    return fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/octet-stream" },
    })
      .then((res) => res.buffer())
      .then((data) => {
        new Promise((resolve, rejects) => {
          fs.writeFile(`./temp/${fileName}`, data, "binary", function (err) {
            console.log(err || fileName);
          });
          setTimeout(() => {
            resolve();
          }, 2500);
        }).then(() => {
          // res.send({ fileName: fileName });
          res.sendFile(`${__dirname}/temp/${fileName}`);
        });
      });
  }
  download(URL, URL.split("/").reverse()[0]);
});

// info 정보 로드
app.post("/info", (req, res) => {
  const user = req.body.userID;
  const userdata = dataJson.Profiles.filter((ID) => ID.id === user);
  res.send(userdata);
});

// http listen port 생성 서버 실행
app.listen(port, () => {
  console.log("express active");
});
