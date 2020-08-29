import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <p>PROJECT BOARD</p>
      <Link to="/">
        <button>HOME</button>
      </Link>
      <Link to="/projectboard">
        <button>BOARD</button>
      </Link>
    </div>
  );
};

export default Header;
