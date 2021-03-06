import React from "react";

import "./SavedMovies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  movies,
  handleSearchSubmit,
  toggleCheckbox,
  checkboxOn,
  handleDeleteMovie,
  savedMovies,
  isMoviesNotFound,
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
          handleDeleteMovie={handleDeleteMovie}
          savedMovies={savedMovies}
          isMoviesNotFound={isMoviesNotFound}
        />
      )}
    </section>
  );
}

export default SavedMovies;
