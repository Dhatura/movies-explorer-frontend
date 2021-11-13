import React from 'react';

import './Movies.css'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList movies={[...Array(12).keys()]} />
    </section>
  );
}

export default Movies;
