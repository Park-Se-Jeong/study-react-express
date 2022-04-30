const express = require("express"); // 다운받은 express를 가져옴
const app = express(); // 함수를 이용해서 app을 만듦
const port = 3000; // 백 서버로 포트 3000번을 사용

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://sejeong:qkr2042055@cluster0.qziii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("MongoDB Connected!!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
}); //루트 디렉토리에 오면, Hello World를 출력해줌

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
