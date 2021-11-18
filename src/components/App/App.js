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
import { getMovies } from '../../utils/MoviesApi';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState('');
  const [isLoginError, setIsLoginError] = useState('');
  const [isEditProfileError, setIsEditProfileError] = useState('');
  const [isComplitedUpdate, setComplitedUpdate] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);
  const [isCheckboxOn, setIsCheckboxOn] = useState(false);
  const [isSavedCheckboxOn, setIsSavedCheckboxOn] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [isMoviesNotFound, setMoviesNotFound] = useState(false);
  const [isSavedMoviesNotFound, setIsSavedMoviesNotFound] = useState(false);
  const [isErrorServer, setErrorServer] = useState(false);

    // все фильмы с внешнего сервера
    const [allMovies, setAllMovies] = useState([]);
    // отфильтрованные фильмы текущего поиска
    const [movies, setMovies] = useState([]);
    // все сохраненные фильмы
    const [allSavedMovies, setAllSavedMovies] = useState([]);
    // отфильтрованные сохраненные фильмы
    const [savedMovies, setSavedMovies] = useState([]);

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
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, moviesData]) => {
          const userMovies = moviesData.filter((movieItem) => movieItem.owner === userData._id);
          setCurrentUser(userData);
          setAllSavedMovies(userMovies);
          setSavedMovies(userMovies)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    setComplitedUpdate(false);
  }, [pathname]);

  const handleLogin = (email, password) => {
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

  const handleRegister = (name, email, password) => {
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

  const handleUpdateUser = (name, email) => {
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

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setAllMovies([]);
    setMovies([]);
    setAllSavedMovies([]);
    setSavedMovies([]);
    setCurrentUser({ email: '', name: '' });
    history.push('/');
  }

  const handleToggleCheckbox = () => {
    setIsCheckboxOn(!isCheckboxOn);
  }

  const handleSavedToggleCheckbox = () => {
    setIsSavedCheckboxOn(!isSavedCheckboxOn);
  }

  const handleFilteredMovies = (movies, keyWord, isShort) => {
    return movies.filter((item) => {
      if (keyWord === '' || (item.nameRU.toLowerCase().includes(keyWord.toLowerCase())
        || (item.nameEN ? item.nameEN : '').toLowerCase().includes(keyWord.toLowerCase()))) {
        if (isShort && item.duration > SHORT_MOVIE_DURATION) {
          return false
        }
        return true
      }
      return false;
    })
  }

  const handleSearchMovies = (keyWord) => {
    setLoading(true);
    setMoviesNotFound(false);
    setErrorServer(false);
    setMovies([]);
    if(allMovies.length > 0) {
      setMovies(handleFilteredMovies(allMovies, keyWord, isCheckboxOn));
      setLoading(false);
    } else {
      getMovies().then((res) => {
        setAllMovies(res)
        const filtredMovies = handleFilteredMovies(res, keyWord, isCheckboxOn)
        if (filtredMovies.length === 0)
          setMoviesNotFound(true)
        return filtredMovies
      })
      .then((res) => {
        setMovies(res)
      })
      .catch((err) => {
        setMovies([]);
        setErrorServer(true);
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      })
    }
  }

  const handleSaveSearchMovies = (keySavedWord) => {
    setLoading(true);
    setIsSavedMoviesNotFound(false);
    const newSavedMovies = handleFilteredMovies(allSavedMovies, keySavedWord, isSavedCheckboxOn);
    setSavedMovies(newSavedMovies);
    if (newSavedMovies.length === 0)
      setIsSavedMoviesNotFound(true);
    setLoading(false);
  }

  const handleSaveMovie = (movieForSave) => {
    movieForSave = {
      country: movieForSave.country || 'Страна не указана',
      director: movieForSave.director || 'Режиссер не указан',
      duration: movieForSave.duration || 0,
      year: movieForSave.year || 'Год не указан',
      description: movieForSave.description || 'Описание отсутствует',
      image: `https://api.nomoreparties.co${movieForSave.image.url}`,
      trailer: movieForSave.trailerLink || 'https://youtube.ru',
      thumbnail: `https://api.nomoreparties.co${movieForSave.image.url}`,
      movieId: movieForSave.id,
      nameRU: movieForSave.nameRU || 'Нет названия',
      nameEN: movieForSave.nameEN || 'Title not found',
    };
    return mainApi.saveMovie(movieForSave)
      .then((savedMovieItem) => {
        const newSavedMovies = [...allSavedMovies, savedMovieItem];
        setAllSavedMovies(newSavedMovies);
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  const handleDeleteMovie = (movieForDelete, isSavedPage) => {
    const movieForDeleteId = isSavedPage ? movieForDelete._id : savedMovies.find((item) => movieForDelete.id === item.movieId)._id;
    return mainApi.deleteMovie(movieForDeleteId)
      .then((res)=>{
        const newSavedMovies = allSavedMovies.filter((item) => item._id !== movieForDeleteId);
        setAllSavedMovies(newSavedMovies);
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
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
              exact
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
            <ProtectedRoute
              exact
              path='/movies'
              loggedIn={token}
              component={Movies}
              movies={movies}
              toggleCheckbox={handleToggleCheckbox}
              checkboxOn={isCheckboxOn}
              handleSearchSubmit={handleSearchMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
              isMoviesNotFound={isMoviesNotFound}
              isErrorServer={isErrorServer}
              isLoading={isLoading}
            />
            <ProtectedRoute
              exact
              path='/saved-movies'
              loggedIn={token}
              component={SavedMovies}
              movies={savedMovies}
              toggleCheckbox={handleSavedToggleCheckbox}
              checkboxOn={isSavedCheckboxOn}
              handleSearchSubmit={handleSaveSearchMovies}
              handleDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
              isMoviesNotFound={isSavedMoviesNotFound}
              isLoading={isLoading}
            />
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
