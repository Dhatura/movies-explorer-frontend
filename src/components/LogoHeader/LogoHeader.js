import React from 'react';
import { Link } from 'react-router-dom';

import './LogoHeader.css';

import Logo from '../../images/logo_icon.svg';

function LogoHeader() {
  return (
    <Link to="/" className="logo-header">
      <img className="logo-header__image" src={Logo} alt="Логотип" />
    </Link>
  );
}

export default LogoHeader;
