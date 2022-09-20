function Test() {
  const URL = "https://source.unsplash.com/random";

  fetch(URL).then((req) => console.log(req));

  return (
    <div>
      <img src={URL}></img>
    </div>
  );
}

export default Test;
