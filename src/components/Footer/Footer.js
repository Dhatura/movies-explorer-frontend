import React from "react";
import { useLocation } from "react-router-dom";

import "./Footer.css";

function Footer() {
  const [footerDisplay, setFooterDisplay] = React.useState("");
  const { pathname } = useLocation();

  React.useEffect(() => {
    const displayList = ["/movies", "/saved-movies", "/"];

    if (displayList.some((item) => item === pathname)) {
      setFooterDisplay("footer");
    } else {
      setFooterDisplay("footer_hidden");
    }
  }, [pathname]);

  return (
    <footer className={`${footerDisplay}`}>
      <p className="footer__caption">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <a
          className="footer__link footer__link_copyright"
          href="https://github.com/Dhatura"
          target="_blank"
          rel="noreferrer"
        >
          &copy; 2021. Alexandra Khakhina
        </a>
        <nav className="footer__navigation">
          <ul className="footer__links">
            <li className="footer__links-item">
              <a
                className="footer__link"
                href="https://www.linkedin.com/in/alexandra-hahina-4581931a3/"
                target="_blank"
                rel="noreferrer"
              >
                Linkedin
              </a>
            </li>
            <li className="footer__links-item">
              <a
                className="footer__link"
                href="https://github.com/Dhatura"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="footer__links-item">
              <a
                className="footer__link"
                href="https://t.me/datura969"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
