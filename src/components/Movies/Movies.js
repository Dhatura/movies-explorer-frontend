import React from 'react';

import './Movies.css'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({
  movies,
  toggleCheckbox,
  checkboxOn,
  onSaveMoviesCard,
  onDeleteMoviesCard,
  savedMovies,
  isMoviesNotFound,
  isErrorServer,
  handleSearchSubmit,
  isLoading
})
  {
  const likedMovies = savedMovies.map((movieItem) => movieItem.movieId);
  return (
    <section className="movies">
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
          pageSavedMovies={false}
          onSaveMoviesCard={onSaveMoviesCard}
          onDeleteMoviesCard={onDeleteMoviesCard}
          isMoviesLiked={likedMovies}
          savedMovies={savedMovies}
          isMoviesNotFound={isMoviesNotFound}
          isErrorServer={isErrorServer}
        />
      )}
    </section>
  );
}

export default Movies;
