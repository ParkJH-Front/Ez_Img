import { useState } from "react";

function Test() {
  const [word, setWord] = useState("");

  const onChange = (event) => setWord(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/Profiles?userID=${word}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} />
      </form>
    </div>
  );
}

export default Test;
