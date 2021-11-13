import React from 'react';
import { useLocation } from 'react-router-dom'

import './Header.css';

import LogoHeader from '../LogoHeader/LogoHeader';
import Navigation from '../Navigation/Navigation';

function Header() {
  const [headerStyle, setHeaderStyle] = React.useState('');
  const { pathname } = useLocation();

  React.useEffect( () => {
    const permittedList = ['/movies', '/saved-movies', '/profile'];
    const authList = ['/signup', '/signin'];

    if (pathname === '/') setHeaderStyle('header-page__main');
    else if (permittedList.some((item) => item === pathname)) setHeaderStyle('');
    else if (authList.some((item) => item === pathname)) setHeaderStyle('header-page__auth');
    else setHeaderStyle('header_hidden');
  }, [pathname])

  return (
    <header className={`header ${headerStyle}`}>
      <LogoHeader />
      <Navigation />
    </header>
  );
}

export default Header;
