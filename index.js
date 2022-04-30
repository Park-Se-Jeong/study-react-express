const express = require("express"); // 다운받은 express를 가져옴
const app = express(); // 함수를 이용해서 app을 만듦
const port = 3001; // 백 서버로 포트 3000번을 사용
const { User } = require("./models/User");
const config = require("./config/key");
const mongoose = require("mongoose");

// //application/x-www/form-urlencoded : 이 데이터를 분석해서 가져올 수 있도록.
// app.use(bodyParser.urlencoded({extended: true}));
// // 서버에서 클라이언트에서 받은 정보를 분석해서 가져온다.

// //application/json : json 타입을 분석해서 가져올 수 있도록.
// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("MongoDB Connected!!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 룰룰루");
}); //루트 디렉토리에 오면, Hello World를 출력해줌

app.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
