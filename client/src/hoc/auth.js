import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function (
  SpecificComponent,
  option,
  adminRoute = null
) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goLandingPage = () => {
    navigate("/");
  };
  const goLoginPage = () => {
    navigate("/login");
  };

  function AuthenticationCheck(props) {
    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (!response.payload.isAuth) {
          if (option) {
            goLoginPage();
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            goLandingPage();
          } else {
            if (!option) {
              goLandingPage();
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }
  return <AuthenticationCheck />;
}
