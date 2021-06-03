import React from "react";
import logoPath from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <a className="header__logo" target="_self" href="/mesto-react">
        <img src={logoPath} alt="Логотип сайта" className="header__image" />
      </a>
    </header>
  );
}

export default Header;
