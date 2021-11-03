import React from 'react';
import { useLocation } from 'react-router-dom'

import './Header.css';

import LogoHeader from '../LogoHeader/LogoHeader';
import Navigation from '../Navigation/Navigation';

function Header() {
  const [headerStyle, setHeaderStyle] = React.useState('');
  const { pathname } = useLocation();
  const authList = ['/signup', '/signin'];

  React.useEffect( () => {
    if (pathname === '/') setHeaderStyle('header-page__main')
    if (authList.some((item) => item === pathname)) setHeaderStyle('header-page__auth')
  }, [pathname])

  return (
    <header className={`header ${headerStyle}`}>
      <LogoHeader />
      <Navigation />
    </header>
  );
}

export default Header;
