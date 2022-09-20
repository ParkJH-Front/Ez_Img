import { useRef } from "react";
import "../css/imgrander.css";

function ImgRander(props) {
  /** useRef 모달 영역 및 모달 이미지 영역 DOM 캐치 */
  const modalRef = useRef("");
  const modalImgRef = useRef("");

  /** Object 로 전달받은 props Array로 반환 */
  const propsData = Object.values(props?.imgURL);

  /** imgURL 로드 시, error 발생 시 해당 element 출력안함 */
  const onErrorImg = (err) => {
    err.target.parentElement.className = "error";
  };

  /** 다운로드 버튼 클릭 시 이미지 다운로드 기능 */
  function downloadHandler(imgURL) {
    // alert("CORS 문제 해결 후 기능 구현 예정 ~ '༼ つ ◕_◕ ༽つ");
  }

  /** 모달을 열고, 닫고 핸들링 하는 로직 */
  const openModal = (img) => {
    modalImgRef.current.src = img;
    modalHandler();
  };

  const closeModal = (event) => {
    modalHandler();
  };

  const bgClick = (event) => {
    const bg = event.target.className;
    if (bg === "modalContanier") {
      modalRef.current.className = "close";
    }
  };

  function modalHandler() {
    const triger = modalRef.current.className;
    if (triger === "modalContanier") {
      modalRef.current.className = "close";
    } else {
      modalRef.current.className = "modalContanier";
    }
  }

  /** 스크랩 버튼 클릭 시 URL 사용자에 저장 */
  const USERNAME = "USERNAME";
  const jsonServer = "http://localhost:4000";
  const onScrap = (img) => {
    const user = localStorage.getItem(USERNAME);
    console.log(img);
    console.log(`${jsonServer}/Profiles/${user}`);

    fetch(`${jsonServer}/Profiles/${user}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scrapImg: `${img}`,
      }),
    }).then((res) => console.log(res.json()));
  };

  return (
    <section className="layout_imgbox">
      <div className="column_imgBox">
        {propsData
          .map((arr) => arr.image_url)
          .map((imgSrc, index) => (
            <div className="box">
              <img
                className="rander_img"
                src={imgSrc}
                key={index}
                onError={onErrorImg}
              />
              <div className="imgIcon">
                <button onClick={() => onScrap(imgSrc)}>스크랩</button>
                <button onClick={() => openModal(imgSrc)}>크게보기</button>
                <button type="button" onClick={() => downloadHandler(imgSrc)}>
                  다운로드
                </button>
              </div>
            </div>
          ))}
        <div className=" close" onClick={bgClick} ref={modalRef}>
          <div className="modal">
            <div className="column modalShow">
              <img ref={modalImgRef}></img>
              <button className="modalBtn" onClick={closeModal}>
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImgRander;
