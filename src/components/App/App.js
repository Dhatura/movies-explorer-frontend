import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, useHistory, Redirect } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import mainApi from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState('');
  const [isLoginError, setIsLoginError] = useState('');
  const [isEditProfileError, setIsEditProfileError] = useState('');
  const [isComplitedUpdate, setComplitedUpdate] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      auth.checkToken(token)
      .then(() => setLoggedIn(true))
      .catch((err) => {
        console.log(err);
        history.push('/signin');
      });
    }
  }, [history, token]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo()])
        .then(([userData]) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    setComplitedUpdate(false);
  }, [pathname]);

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          history.push('/movies')
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsLoginError(err);
      })
      .finally(() => {
        setIsDataSent(false);
      });
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsRegisterError(err);
      })
      .finally(() => {
        setIsDataSent(false);
      });
  }

  function handleUpdateUser(name, email) {
    mainApi
      .editUserProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
        setComplitedUpdate(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsEditProfileError(err);
      })
      .finally(() => {
        setIsDataSent(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    // localStorage.removeItem("foundMovies");
    // localStorage.removeItem("movies");
    setLoggedIn(false);
    // setMovies([]);
    setCurrentUser({ email: '', name: '' });
    history.push('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="root__container">
          <Header loggedIn={loggedIn} />
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route exact path='/signup'>
              {!loggedIn ? (
                <Register
                  onRegister={handleRegister}
                  setError={setIsRegisterError}
                  setIsDataSent={setIsDataSent}
                  isError={isRegisterError}
                  isDataSent={isDataSent}
                />
              ) : (
                <Redirect to='/movies' />
              )}
            </Route>
            <Route exact path='/signin'>
              {!loggedIn ? (
                <Login
                  onLogin={handleLogin}
                  setError={setIsLoginError}
                  setIsDataSent={setIsDataSent}
                  isError={isLoginError}
                  isDataSent={isDataSent}
                />
              ) : (
                <Redirect to='/movies' />
              )}
            </Route>
            <ProtectedRoute
              path='/profile'
              loggedIn={token}
              component={Profile}
              handleSignOut={handleSignOut}
              onEditUserInfo={handleUpdateUser}
              isComplitedUpdate={isComplitedUpdate}
              setComplitedUpdate={setComplitedUpdate}
              isError={isEditProfileError}
              setError={setIsEditProfileError}
            />
            <Route exact path='/movies'>
              <Movies />
            </Route>
            <Route exact path='/saved-movies'>
              <SavedMovies />
            </Route>
            <Route path='/*'>
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
