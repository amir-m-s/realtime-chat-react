import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <h2>
            <a href="#">Realtime Chat</a>
          </h2>
        </div>
        <div className="user-control">
          <div className="user-btn">
            <button className="btn btn-accent btn-rounded">
              <FaUser />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
