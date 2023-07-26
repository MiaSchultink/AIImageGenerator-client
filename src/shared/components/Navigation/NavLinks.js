import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const authObject = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to={`/image/library`}>IMAGES</NavLink>
      </li>
      {authObject.isLoggedIn && (
        <li>
          <NavLink to={`/image/new`}>NEW IMAGE</NavLink>
        </li>
      )}
      {authObject.isLoggedIn && (
        <li>
          <NavLink to={`/user/profile`}>PROFILE</NavLink>
        </li>
      )}
       {!authObject.isLoggedIn && (
        <li>
          <NavLink to="/user/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {authObject.isLoggedIn && (
        <li>
          <button onClick={authObject.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
