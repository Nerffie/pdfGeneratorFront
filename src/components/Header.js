import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        <h3 className="ui header">
          <i className="home icon"></i>
          <div className="content">Accueil</div>
        </h3>
      </Link>
      <div className="right menu">
        <Link to="/editor/new" className="item">
          <h3 className="ui header">
            <i className="plus icon"></i>
            <div className="content">Nouveau Modèle</div>
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default Header;
