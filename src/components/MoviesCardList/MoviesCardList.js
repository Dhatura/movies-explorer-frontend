import React, { useEffect, useState } from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import { LARGE_WINDOW_WIDTH,
        MEDIUM_WINDOW_WIDTH,
        MOBILE_WINDOW_WIDTH,
        QUANTITY_FOR_LARGE,
        QUANTITY_FOR_MEDIUM,
        QUANTITY_FOR_MOBILE,
        MORE_QUANTITY_FOR_LARGE,
        MORE_QUANTITY_FOR_MEDIUM,
        MORE_QUANTITY_FOR_MOBILE } from '../../utils/constants';

function MoviesCardList({ movies, pageSavedMovies, onSaveMoviesCard, onDeleteMoviesCard, isMoviesLiked, savedMovies, isMoviesNotFound, isErrorServer }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const moviesQuantity = () => {
    if(windowWidth >= LARGE_WINDOW_WIDTH) return {quantity: QUANTITY_FOR_LARGE, more: MORE_QUANTITY_FOR_LARGE};
    if(windowWidth >= MEDIUM_WINDOW_WIDTH) return {quantity: QUANTITY_FOR_MEDIUM, more: MORE_QUANTITY_FOR_MEDIUM};
    if(windowWidth >= MOBILE_WINDOW_WIDTH) return {quantity: QUANTITY_FOR_MOBILE, more: MORE_QUANTITY_FOR_MOBILE};
  }
  const [moviesCount, setMoviesCount] = useState(moviesQuantity().quantity);

  useEffect(() => {
    const callbackWidth = () => {
      setWindowWidth(window.innerWidth);
      setMoviesCount(moviesQuantity().quantity)
    };

    window.addEventListener('resize', callbackWidth);
  })

  const handleMoreCards = () => {
    setMoviesCount(Number(moviesCount) + moviesQuantity().more)
  }

  console.log("count" + moviesCount)
  return (
    <section className="movies-cards">
      <span className={`movies-card__message
        ${!isMoviesNotFound ? "movies-card__message_hidden" : ""} `}>
        Ничего не найдено
      </span>
      <span className={`movies-card__message
        ${!isErrorServer ? "movies-card__message_hidden" : ""} `}>
        Во время запроса произошла ошибка. Возможно, проблема с соединением
        или сервер недоступен. Подождите немного и попробуйте ещё раз
      </span>
      <span className={`movies-card__message
        ${pageSavedMovies && movies.length === 0 ? "" : "movies-card__message_hidden"} `}>
        Вы еще не сохранили ни одного фильма
      </span>
      <ul className="movies-cards__list">
        {movies.slice(0, moviesCount).map((movie) => (
          <MoviesCard
            movie={movie}
            pageSavedMovies={pageSavedMovies}
            key={pageSavedMovies ? movie.id : movie.movieId}
            onSaveMoviesCard={onSaveMoviesCard}
            onDeleteMoviesCard={onDeleteMoviesCard}
            // isMoviesLiked={isMoviesLiked.includes(movie.id)}
            savedMovies={savedMovies}
            />
          ))}
      </ul>
        {!pageSavedMovies ? (
          <button className={`${movies.length > moviesQuantity().quantity ? "movies-cards__button" : "movies-cards__button_hidden"}`} type="button" onClick={handleMoreCards}>
            Ещё
          </button>
        ) : (
          null
        )}
    </section>
  );
}

export default MoviesCardList;
