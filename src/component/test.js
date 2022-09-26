import { useState } from "react";

function Test() {
  const URL = "http://localhost:4000/test";

  const [word, setWord] = useState("");

  const onChange = (event) => setWord(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    fetch(URL).then((res) => console.log(res));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange}></input>
      </form>
    </div>
  );
}

export default Test;
