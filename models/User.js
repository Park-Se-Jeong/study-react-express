const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    // 공백 삭제
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
    // admin이냐 일반 user냐에 대한 default 값 설정 : 설정 안하면, 기본 user 0으로.
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: { // 토큰 유효기간
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };

// 스키마를 만든 후 모델로 감싸야한다.