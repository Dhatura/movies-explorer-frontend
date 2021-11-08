import React from 'react';
import { Route, Switch } from 'react-router-dom';

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

function App() {
  return (
    <div className="root">
      <div className="root__container">
        <Header />
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route exact path='/signup'>
            <Register />
          </Route>
          <Route exact path='/signin'>
            <Login />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
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
  );
}

export default App;
