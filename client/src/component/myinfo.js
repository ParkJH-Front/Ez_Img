import { useState, useRef } from "react";
import Nav from "./nav";
import "../css/imgrander.css";
import "../css/main.css";

function MyInfo() {
  // 사용자 페이지
  const [scrapImgArr, setScrapImgArr] = useState([]);
  const APISERVER = "http://54.241.119.165:4000";
  const USERNAME = "USERNAME";
  const USERID = localStorage.getItem(USERNAME);

  fetch(`${APISERVER}/info`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userID: USERID,
    }),
  })
    .then((res) => res.json())
    .then((scrapArr) => setScrapImgArr(scrapArr[0].scrap));
  return (
    <section>
      <Nav />
      <div className="result">
        <h1>스크랩 목록</h1>
      </div>
      <div className="column_imgBox">
        {scrapImgArr.map((imgSrc, index) => {
          return (
            <div className="box">
              <img className="rander_img" src={imgSrc} key={index} />
              <div className="imgIcon">
                {/* <button onClick={() => onScrap(imgSrc)}>스크랩</button>
                <button onClick={() => openModal(imgSrc)}>크게보기</button>
                <button type="button" onClick={() => downloadHandler(imgSrc)}>
                  다운로드
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MyInfo;
