import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="nav-bar">
      <form className="div1"></form>
      <div className="div2">
        <div className="logo">
          <Link to={"/"}>
            <img src="../images/UTTN_princ.png" alt=""></img>
          </Link>
        </div>
      </div>
      <div className="div3"></div>
    </header>
  );
};
