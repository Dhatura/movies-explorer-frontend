import React from 'react';

import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({
  movies,
  handleSearchSubmit,
  toggleCheckbox,
  checkboxOn,
  onDeleteMoviesCard,
  savedMovies,
  isLoading,
  }) {
  return (
    <section className="saved-movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        toggleCheckbox={toggleCheckbox}
        checkboxOn={checkboxOn}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={movies}
          pageSavedMovies={true}
          onDeleteMoviesCard={onDeleteMoviesCard}
          savedMovies={savedMovies}
        />
      )}
    </section>
  );
}

export default SavedMovies;
