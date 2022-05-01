const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { decode } = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
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
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(
        user.password,
        salt,
        function (err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
        }
      );
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (
  plainPassword,
  cb
) {
  //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
  bcrypt.compare(
    plainPassword,
    this.password,
    function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    }
  );
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // console.log('user._id', user._id)

  // jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(
    user._id.toHexString(),
    "secretToken"
  );
  // user._id + 'secretToken' = token
  // ->
  // 'secretToken' -> user._id

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, cb) {
  let user = this;

  jwt.verify(token, 'secretToken', function(err, decoded) {
    user.findOne({ "_id": decoded, "token": token}, function(err, user) {
      if(err) return cb(err);
      cb(null, user)
    })
  })
}
const User = mongoose.model("User", userSchema);

module.exports = { User };

// 스키마를 만든 후 모델로 감싸야한다.

/* salt를 이용해서 암호화를 먼저 해야햐고, 그러기 위해선 먼저 생성.
saltRounds = salt가 몇 글자인 지, 나타내는 것. */

/* 세이브를 하기 전, 비밀번호를 암호화시켜야 한다. 
유저 스키마를 가져오고, pre() 하면.. (몽구스에서)
pre('save') -> 유저 모델의 유저 정보 저장하기 전에, 무엇을 한다. 
function(){}을 줘서.. */

/* 이미 암호화된 암호를 복호화할 순 없으니까, bcrypt의 compare를 사용한다
(암호화되지 않은 플레인 패스워드, userSchema의 패스워드, 콜백) */
