import React, { useState } from "react";
import { loginUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goLandingPage = () => {
    navigate("/");
  };
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        goLandingPage();
      } else {
        alert("사용자 정보가 없습니다.");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input
          type='email'
          value={Email}
          onChange={onEmailHandler}
        />
        <label>Password</label>
        <input
          type='password'
          value={Password}
          onChange={onPasswordHandler}
        />
        <br />
        <button type='submit'>login</button>
      </form>
    </div>
  );
}

export default LoginPage;
