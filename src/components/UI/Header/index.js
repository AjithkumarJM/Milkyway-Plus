import { NavLink } from "react-router-dom";

import Logo from "../../../assets/images/logo.png";

import "./style.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="cine-movie-logo" />
      </div>
      
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/watchlist">Watchlist</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
