import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo_nukki.png";
import backgroundImg from "../img/background.jpg";
import "../css/login.css";
import "../css/nav.css";
import "../css/default.css";

function Login() {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const URL = "https://ez-img.herokuapp.com/";
  const USERNAME = "USERNAME";

  // 로그인 점검 로직 성공 시 localStorage 내 ID 정보 저장.
  // 로그인 성공 후 wellcome.js 로 이동
  const navigate = useNavigate();
  const onID = (event) => setUserID(event.target.value);
  const onPW = (event) => setUserPW(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(`${URL}/Profiles`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        userPW: userPW,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.ok);
        if (data.ok === false) {
          alert(`${data.error}`);
        } else {
          alert("로그인성공~");
          localStorage.setItem(USERNAME, userID);
          navigate(`/`);
        }
      });
  };

  // 회원가입 버튼 클릭 시, 회원가입 양식 표기 (컴포넌트 이동 x)
  const loginRef = useRef("");
  const singUpRef = useRef("");

  const onClick = (event) => {
    event.preventDefault();
    loginRef.current.className = "none";
    singUpRef.current.classList = "show";
  };

  // 회원가입 기능 제작중 (함수실행순서의 문제)

  const [newID, setNewID] = useState(null);
  const [newPW, setNewPW] = useState(null);
  const [rePW, setRePW] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newNic, setNewNic] = useState(null);

  const onNewID = (event) => setNewID(event.target.value);
  const onNewPW = (event) => setNewPW(event.target.value);
  const onRePW = (event) => setRePW(event.target.value);
  const onEmail = (event) => setNewEmail(event.target.value);
  const onNewNic = (event) => setNewNic(event.target.value);

  const singUpSubmit = (event) => {
    event.preventDefault();
    fetch(`${URL}/singup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        newID: newID,
        newPW: newPW,
        rePW: rePW,
        newNic: newNic,
        newEmail: newEmail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.ok === true) {
          alert("회원가입 완료, 다시 로그인하세요.");
          navigate("/");
        } else {
          alert(`${data.error}`);
        }
      });
  };

  return (
    <article>
      {/* 배경 이미지 */}
      <section>
        <img src={backgroundImg} className="background_login" />
      </section>
      {/* 상단 nav */}
      <section>
        <nav className="background_nav">
          {/* 로고 => wellcome 으로 가기 */}
          <section>
            <a href="/">
              <img className="logo_nav" src={logo}></img>
            </a>
          </section>
          {/* 로그인기능 */}
          <section>
            <form>
              <button className="login_btn">login</button>
            </form>
          </section>
        </nav>
      </section>
      {/* 로그인 기능 */}
      <section className="login_box center">
        <section ref={loginRef}>
          <form onSubmit={onSubmit} className="flex_column">
            <div>
              <h1>ez-img 로그인</h1>
            </div>
            <input
              onChange={onID}
              value={userID}
              placeholder="write your ID"
              type="text"
              required
            ></input>
            <input
              onChange={onPW}
              value={userPW}
              placeholder="write your PW"
              type="password"
              required
            ></input>
            <button className="login_box_btn">Enter</button>
          </form>
          <form className="flex_column">
            <button onClick={onClick} className="login_box_btn">
              회원가입
            </button>
          </form>
        </section>
        {/* 회원가입 기능 */}
        <section ref={singUpRef} className="none">
          <form onSubmit={singUpSubmit} className="flex_column sign_Up">
            <input
              onChange={onNewID}
              placeholder="newID"
              required
              pattern=".{6,12}"
              title="6 ~ 12 사이의 길이로 입력하세요."
            ></input>
            <input
              onChange={onNewPW}
              type="password"
              placeholder="newPW"
              required
              pattern=".{8,}"
              title="최소 8자리 이상 입력하세요."
            ></input>
            <input
              onChange={onRePW}
              type="password"
              placeholder="rePW"
              required
              pattern=".{8,}"
              title="최소 8자리 이상 입력하세요."
            ></input>
            <input
              onChange={onEmail}
              placeholder="email-address"
              required
            ></input>
            <input
              onChange={onNewNic}
              placeholder="name"
              required
              pattern=".{2,6}"
              title="2 ~ 6 사이의 길이로 입력하세요."
            ></input>
            <button>회원가입</button>
          </form>
        </section>
      </section>
    </article>
  );
}

export default Login;
