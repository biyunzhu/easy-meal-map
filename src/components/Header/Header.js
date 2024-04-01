import logo from "../../assets/logos/easy-meal-map-high-resolution-logo-transparent.png";
import "./Header.scss";

function Header() {
  return (
    <header>
      <img src={logo} alt="easy meal map logo" className="header__logo" />
    </header>
  );
}

export default Header;
