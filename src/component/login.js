import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo_nukki.png";
import backgroundImg from "../img/background.jpg";
import "../css/login.css";
import "../css/nav.css";
import "../css/default.css";

function Login() {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const JsonServer = "http://localhost:4000/Profiles";
  const USERNAME = "USERNAME";

  // 로그인 점검 로직 성공 시 localStorage 내 ID 정보 저장.
  // 로그인 성공 후 wellcome.js 로 이동
  const navigate = useNavigate();
  const onID = (event) => setUserID(event.target.value);
  const onPW = (event) => setUserPW(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(`${JsonServer}/${userID}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.id === undefined) {
          alert("id 또는 password가 잘못 입력되었습니다.");
        } else if (json.password !== userPW) {
          alert("id 또는 password가 잘못 입력되었습니다.");
        } else {
          alert("로그인성공!");
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
  const URL = "http://localhost:4000/Profiles";
  const [newID, setNewID] = useState(null);
  const [newPW, setNewPW] = useState(null);
  const [rePW, setRePW] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newNicName, setNewNicName] = useState(null);

  const onNewID = (event) => setNewID(event.target.value);
  const onNewPW = (event) => setNewPW(event.target.value);
  const onRePW = (event) => setRePW(event.target.value);
  const onEmail = (event) => setNewEmail(event.target.value);
  const onNewName = (event) => setNewNicName(event.target.value);

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
            <div>
              <input
                onChange={onID}
                value={userID}
                placeholder="writh your ID"
                type="text"
                required
              ></input>
            </div>
            <div>
              <input
                onChange={onPW}
                value={userPW}
                placeholder="writh your PW"
                type="password"
                required
              ></input>
            </div>
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
          <form className="flex_column sign_Up">
            <input onChange={onNewID} placeholder="newID"></input>
            <input
              onChange={onNewPW}
              type="password"
              placeholder="newPW"
            ></input>
            <input onChange={onRePW} type="password" placeholder="rePW"></input>
            <input onChange={onEmail} placeholder="email-address"></input>
            <input onChange={onNewName} placeholder="name"></input>
            <button>회원가입</button>
          </form>
        </section>
      </section>
    </article>
  );
}

export default Login;
