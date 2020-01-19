import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { AuthContext } from "../../contexts/auth-context";
import Button from "../FormElements/Button";

export default function NavLinks(props) {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button onClick={auth.logout}>LOGOUT</Button>
        </li>
      )}
    </ul>
  );
}
