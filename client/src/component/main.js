import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./nav";
import Loding from "../img/Rhombus.gif";
import ImgRander from "./imgrander";
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
    let URL = `http://localhost:4000/search?keyword=${keyword}`;
    fetch(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setImgURL(
          Object.values(json)[0].map((item) => {
            return item;
          })
        );
      });
  }

  /** 지연로딩 3000ms */
  const ImgRander = lazy(() => {
    return Promise.all([
      import("./imgrander"),
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]).then(([moduleExports]) => moduleExports);
  });

  // 맨위로 올라가는 버튼
  const onClick = (event) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Nav />
      <img className="center" src={Loding} alt="loding" />
      <Suspense>
        <h1 className="result">{param} 검색결과</h1>
        <ImgRander imgURL={imgURL} />
        <div>
          <button onClick={onClick} className="up_scroll">
            맨위로
          </button>
        </div>
      </Suspense>
    </div>
  );
}

export default Main;
