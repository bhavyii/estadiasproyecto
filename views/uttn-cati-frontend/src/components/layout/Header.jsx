import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="nav-bar">
      <div className="div1">
        <Link to="http://localhost:3000/principal">
          <img src="../icons/back.png" alt="" />
        </Link>
      </div>
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
