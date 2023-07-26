import React, { useContext } from "react";

import "./GoToContent.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
const GoToContent = ({url, backgroundColor, children }) => {
const navigate = useNavigate();
const auth = useContext(AuthContext);

const clickHandler = (event) =>{
    event.preventDefault();
    if(auth.isLoggedIn){
      navigate(url)
    }
    else{
      navigate('/user/auth')
    }
}
  return (
    <div className="go-to-content__container" onClick={clickHandler} style={{ backgroundColor} }>
      <div className="go-to-content__title">{children}</div>
    </div>
  );
};

export default GoToContent;
