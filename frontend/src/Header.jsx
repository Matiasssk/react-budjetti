import { useNavigate } from "react-router-dom";

import "./header2.css";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log("click", e.target.value);
    navigate(`/${e.target.value}`);
  };
  return (
    <>
      <div className="main-header">
        <div className="header-text-wrapper">
          <h1>Valtion budjetti 2025</h1>
          <input id="menu-toggle" type="checkbox" />
          <label className="menu-button-container" htmlFor="menu-toggle">
            <div className="menu-button"></div>
          </label>
          <ul className="menu">
            <li>
              <button
                className="header-btn"
                onClick={(e) => handleClick(e)}
                value=""
              >
                Etusivu
              </button>
            </li>
            <li>
              <button
                className="header-btn"
                onClick={(e) => handleClick(e)}
                value="budjetti"
              >
                Tutki Budjettia
              </button>
            </li>
            <li>
              <button
                className="header-btn"
                onClick={(e) => handleClick(e)}
                value="verokuitti"
              >
                Tulosta Verokuitti
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
