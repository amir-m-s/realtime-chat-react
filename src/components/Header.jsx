import { useState } from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [userDropDown, setUserDropDown] = useState(false);

  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <h2>
            <a href="#">Realtime Chat</a>
          </h2>
        </div>
        <div className="user-control">
          <div className="user-btns">
            <button
              className="btn btn-accent btn-rounded"
              onClick={() => setUserDropDown(prevState => !prevState)}
            >
              <FaUser />
            </button>
          </div>
          <div
            className={`dropdown btn-rounded ${
              userDropDown && "dropdown-visible"
            }`}
          >
            <div className="dropdown-container">
              <div className="user-info">Username</div>
              <div className="control-btns">
                <button className="btn btn-rounded btn-primary">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
