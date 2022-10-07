import { useEffect, useState, Component, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import Nav from "./nav";
import Loding from "../img/Rhombus.gif";
import "../css/main.css";

function Main() {
  /** API 통해 검색된 ImgURL */
  const [imgURL, setImgURL] = useState("");
  const [imgCount, setImgCount] = useState();

  /** Nav component 전달 받은 parameter 를 API 에 전달하는 로직 */
  const param = useParams().text;
  useEffect(() => {
    APIHandler(param);
  }, [param]);

  /** 이미지 검색 API, input: word(string) return: json.data */
  function APIHandler(keyword) {
    let URL = `https://dapi.kakao.com/v2/search/image?query=${keyword}`;
    fetch(URL, {
      headers: {
        Authorization: "KakaoAK 17d6f89d24fa2565f0e7155dc37188f0",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setImgURL(
          Object.values(json)[0].map((item) => {
            return item;
          })
        );
        setImgCount(json.documents.length);
      });
  }

  /** 지연로딩 3000ms */
  const ImgRander = lazy(() => {
    return Promise.all([
      import("./imgrander"),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]).then(([moduleExports]) => moduleExports);
  });

  // 맨위로 올라가는 버튼
  const onClick = (event) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Nav />
      <Suspense fallback={<img className="center" src={Loding} alt="loding" />}>
        <h1 className="result">
          {param} 검색결과 : {imgCount}
        </h1>
        <ImgRander imgURL={imgURL} />
      </Suspense>
      <div>
        <button onClick={onClick} className="up_scroll">
          맨위로
        </button>
      </div>
    </div>
  );
}

export default Main;
