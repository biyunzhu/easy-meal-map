import logo from "../../assets/logos/easy-meal-map-high-resolution-logo-transparent.png";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="easy meal map logo" className="header__logo" />
      </Link>
      <nav className="nav">
        <Link to="/" className="nav__link">
          Planner
        </Link>
        <Link to="/tracker" className="nav__link">
          Tracker
        </Link>
      </nav>
    </header>
  );
}

export default Header;
