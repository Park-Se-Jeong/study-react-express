import React, { useEffect } from "react";
import axios from "axios";
function LandingPage(props) {

  useEffect(() => {

  }, []);

  const onÇlickHandler = () => {
    axios
      .get("api/users/logout")
      .then(response => {
        console.log(response.data);
        alert("로그아웃 되었습니다.");
      })
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
      시작페이지
      <button onClick={onÇlickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
