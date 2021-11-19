import React, { useEffect, useState } from "react";

import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";
import {
  LARGE_WINDOW_WIDTH,
  MEDIUM_WINDOW_WIDTH,
  MOBILE_WINDOW_WIDTH,
  QUANTITY_FOR_LARGE,
  QUANTITY_FOR_MEDIUM,
  QUANTITY_FOR_MOBILE,
  MORE_QUANTITY_FOR_LARGE,
  MORE_QUANTITY_FOR_MEDIUM,
  MORE_QUANTITY_FOR_MOBILE,
} from "../../utils/constants";

function MoviesCardList({
  movies,
  pageSavedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
  isMoviesNotFound,
  isErrorServer,
}) {
  const moviesQuantity = (windowWidth) => {
    if (windowWidth >= LARGE_WINDOW_WIDTH)
      return { quantity: QUANTITY_FOR_LARGE, more: MORE_QUANTITY_FOR_LARGE };
    if (windowWidth >= MEDIUM_WINDOW_WIDTH)
      return { quantity: QUANTITY_FOR_MEDIUM, more: MORE_QUANTITY_FOR_MEDIUM };
    if (windowWidth >= MOBILE_WINDOW_WIDTH)
      return { quantity: QUANTITY_FOR_MOBILE, more: MORE_QUANTITY_FOR_MOBILE };
  };
  const [moviesCount, setMoviesCount] = useState(
    moviesQuantity(window.innerWidth).quantity
  );

  useEffect(() => {
    const callbackWidth = () => {
      setTimeout(
        500,
        setMoviesCount(moviesQuantity(window.innerWidth).quantity)
      );
    };
    window.addEventListener("resize", callbackWidth);
    return () => {
      window.removeEventListener("resize", callbackWidth);
    };
  }, []);

  const handleMoreCards = () => {
    setMoviesCount(
      Number(moviesCount) + moviesQuantity(window.innerWidth).more
    );
  };

  return (
    <section className="movies-cards">
      <span
        className={`movies-card__message
        ${!isMoviesNotFound ? "movies-card__message_hidden" : ""} `}
      >
        Ничего не найдено
      </span>
      <span
        className={`movies-card__message
        ${!isErrorServer ? "movies-card__message_hidden" : ""} `}
      >
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </span>
      <span
        className={`movies-card__message
        ${
          pageSavedMovies && movies.length === 0 && !isMoviesNotFound
            ? ""
            : "movies-card__message_hidden"
        } `}
      >
        Вы еще не сохранили ни одного фильма
      </span>
      <ul className="movies-cards__list">
        {movies.slice(0, moviesCount).map((movie, i) => (
          <MoviesCard
            key={i}
            movie={movie}
            savedMovies={savedMovies}
            pageSavedMovies={pageSavedMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
          />
        ))}
      </ul>
      {!pageSavedMovies ? (
        <button
          className={`${
            movies.length > moviesCount
              ? "movies-cards__button"
              : "movies-cards__button_hidden"
          }`}
          type="button"
          onClick={handleMoreCards}
        >
          Ещё
        </button>
      ) : null}
    </section>
  );
}

export default MoviesCardList;
