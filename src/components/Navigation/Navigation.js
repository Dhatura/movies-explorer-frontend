import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import "./Navigation.css";
import AccountIcon from "../../images/account_icon.svg";

function Navigation({ loggedIn }) {
  const [activeBurgerMenu, setActiveBurgerMenu] = React.useState(false);

  const handleClickOpen = () => {
    setActiveBurgerMenu(true);
  };

  const handleClickClose = () => {
    setActiveBurgerMenu(false);
  };

  const { pathname } = useLocation();
  const permittedList = ["/movies", "/saved-movies", "/profile", "/"];

  return (
    <>
      {pathname === "/" && !loggedIn && (
        <nav className="navigation">
          <Link
            to="/signup"
            className="navigation__link navigation__link_type_signup"
          >
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="navigation__link navigation__link_type_signin"
          >
            Войти
          </Link>
        </nav>
      )}
      {permittedList.some((item) => item === pathname) && loggedIn && (
        <>
          <nav className="navigation navigation_hidden">
            <Link
              to="/movies"
              className="navigation__link navigation__link_type_movies"
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className="navigation__link navigation__link_type_saved-movies"
            >
              Сохраненные фильмы
            </Link>
            <Link
              to="/profile"
              className="navigation__link navigation__link_type_account"
            >
              <img
                className="navigation__link-icon"
                src={AccountIcon}
                alt="Иконка аккаунта"
              />
              <h3 className="navigation__link-text">Аккаунт</h3>
            </Link>
          </nav>
          <button
            type="button"
            className="burger-menu-btn"
            onClick={handleClickOpen}
          />
          <nav
            className={activeBurgerMenu ? "burger-menu_active" : "burger-menu"}
          >
            <ul className="burger-menu__list">
              <li className="burger-menu__item">
                <NavLink
                  exact
                  to="/"
                  className="burger-menu__link"
                  activeClassName="burger-menu__link_active"
                >
                  Главная
                </NavLink>
              </li>

              <li className="burger-menu__item">
                <NavLink
                  to="/movies"
                  className="burger-menu__link"
                  activeClassName="burger-menu__link_active"
                  onClick={handleClickClose}
                >
                  Фильмы
                </NavLink>
              </li>

              <li className="burger-menu__item">
                <NavLink
                  to="/saved-movies"
                  className="burger-menu__link"
                  activeClassName="burger-menu__link_active"
                  onClick={handleClickClose}
                >
                  Сохраненные фильмы
                </NavLink>
              </li>

              <li className="burger-menu__item">
                <NavLink
                  to="/profile"
                  className="burger-menu__link burger-menu__link_type_account"
                  onClick={handleClickClose}
                >
                  <img
                    className="burger-menu__link-icon"
                    src={AccountIcon}
                    alt="Иконка аккаунта"
                  />
                  <h3 className="burger-menu__link-text">Аккаунт</h3>
                </NavLink>
              </li>
            </ul>
            <button
              type="button"
              className="burger-menu-btn-cls"
              onClick={handleClickClose}
            />
          </nav>
        </>
      )}
    </>
  );
}

export default Navigation;
