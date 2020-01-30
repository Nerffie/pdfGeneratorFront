import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Home
      </Link>
      <div className="right menu">
        <Link to="/editor" className="item">
          New
        </Link>
      </div>
    </div>
  );
};
//191536746993-r37o8kuo63dic8uvvn01b2cqqnmr4psk.apps.googleusercontent.com

export default Header;
