// express, cors, body-parser module load
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const fs = require("fs");

const port = process.env.PORT || 4000;

// json data file read
const dataBuffer = fs.readFileSync(__dirname + "/data_json.json");
const datalow = dataBuffer.toString();
const dataJson = JSON.parse(datalow);

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
  // console.log(req.body);
  // user : null or username , scrapImg : url
  if ((req.body.user === null) | undefined) {
    res.json({ ok: false, error: "로그인 후 이용해주세요." });
  } else {
    const targetUserData = dataJson.Profiles?.filter(
      (ID) => ID.id === `${scrapData.user}`
    );
    console.log(targetUserData);
    // const targetUserData = dataJson.Profiles.filter(
    //   (ID) => ID.id === `${scrapData.user}`
    // );
    // targetUserData[0].scrap = `${scrapData.imgUrl}`;

    // const jsonFileSave = JSON.stringify(targetUserData);
    // fs.writeFileSync("data_json.json", jsonFileSave);
  }
});

//이미지 다운로드 로직
// 1. 이미지 다운로드 버튼 클릭 시 외부(kakao) url 접근
// 2. 접근 후 이미지를 local 에 download
// 3. 사용자(클라이언트) 에게 해당 파일 다운로드 할 수 있도록 전달
// 4. 지정된 시간 (약 60초) 뒤 이미지를 삭제

// react_build import
// 1. build 에 있는 파일에 접근할 수 있도록 설정
app.use(express.static("build"));
// 2. "/"(루트) 접근 시 build/index.html 을 보여줄 수 있도록 설정
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

// http listen port 생성 서버 실행
app.listen(port, () => {
  console.log("express active");
});