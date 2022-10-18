import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/nav.css";
import logo from "../img/logo_nukki.png";

function Nav() {
  /** 로컬 스토리지 내 사용자 정보가 있는 경우, 로그인버튼 표기 X*/

  const greetingRef = useRef();
  const loginBtnRef = useRef();
  const USERNAME = "USERNAME";
  const checkLogin = localStorage.getItem(USERNAME);

  useEffect(() => {
    if (checkLogin === null) {
      return;
    } else {
      loginBtnRef.current.classList = "none";
      greetingRef.current.classList = "greeting";
    }
  }, []);

  /** 사용자로부터 받는 키워드 */
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const onChange = (event) => setKeyword(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (keyword === "") {
      return;
    } else {
      navigate(`/main${keyword}`);
      setKeyword("");
    }
  };

  const goToMain = (event) => {
    navigate(`/login`);
  };

  const goToInfo = (event) => {
    console.log(event);
    navigate(`/myinfo`);
  };

  // logout 버튼 클릭 시 기능구현
  const onLogout = (event) => {
    localStorage.removeItem(USERNAME);
  };

  return (
    <nav className="background_nav">
      {/* 로고 => wellcome 으로 가기 */}
      <section>
        <a href="/">
          <img className="logo_nav" src={logo}></img>
        </a>
      </section>
      {/* 검색기능 */}
      <section className="search_layout">
        {/* <form onSubmit={onSubmit}> */}
        <form onSubmit={onSubmit}>
          <input
            className="search_input"
            onChange={onChange}
            value={keyword}
            type="text"
            placeholder=" 이미지 검색"
          ></input>
          <button className="search_btn">search</button>
        </form>
      </section>
      {/* 로그인기능 */}
      <section>
        <form>
          <button className="login_btn" ref={loginBtnRef} onClick={goToMain}>
            login
          </button>
          <div className="none" ref={greetingRef}>
            <button onClick={goToInfo} className="infoBtn">
              <a>{checkLogin} to scrap</a>
            </button>
            <button className="logout" onClick={onLogout}>
              LogOut
            </button>
          </div>
        </form>
      </section>
    </nav>
  );
}

export default Nav;
