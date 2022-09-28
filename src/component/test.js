import { useState } from "react";

function Test() {
  const [word, setWord] = useState("");

  const onChange = (event) => setWord(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    const postData = {
      text: word,
    };

    fetch("http://localhost:4000/testAPI", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
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
