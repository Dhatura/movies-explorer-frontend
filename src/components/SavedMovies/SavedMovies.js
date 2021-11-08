import React from 'react';

import './SavedMovies.css'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={[...Array(3).keys()]} isSaved={true} />
    </section>
  );
}

export default SavedMovies;
