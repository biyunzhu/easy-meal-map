import "./Footer.scss";
import footerImg from "../../assets/images/footer-image.png";

function Footer() {
  return (
    <footer className="footer">
      <img
        src={footerImg}
        alt="be kind to yourself"
        className="footer__image"
      />
    </footer>
  );
}

export default Footer;
