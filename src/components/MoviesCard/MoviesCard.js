import React, { useState, useEffect } from 'react';

import './MoviesCard.css';

function MoviesCard({movie, pageSavedMovies, onSaveMoviesCard, onDeleteMoviesCard, isMoviesLiked, savedMovies }) {
  const [isLiked, setIsLiked] = useState(false);

  const hoursDuration = Math.trunc(movie.duration / 60);
  const minutesDuration = movie.duration % 60;
  const durationMovie = `${hoursDuration > 0 ? hoursDuration + 'ч ' : ''}${minutesDuration > 0 ? minutesDuration + 'м' : ''}`;

  const card = {
    country: movie.country || 'Страна не указана',
    director: movie.director || 'Режиссер не указан',
    duration: movie.duration || 0,
    year: movie.year || 'Год не указан',
    description: movie.description || 'Описание отсутствует',
    image: `https://api.nomoreparties.co${movie.image.url}`,
    trailer: movie.trailerLink || 'https://youtube.ru',
    thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
    movieId: movie.id,
    nameRU: movie.nameRU || 'Нет названия',
    nameEN: movie.nameEN || 'Title not found',
  };

  const parseSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));

  const currentMovie = parseSavedMovies.find(
    (movieItem) => movieItem.nameRU === movie.nameRU
  );

  const handleLikeCard = () => {
    onSaveMoviesCard(card)
      .then(() => setIsLiked(true))
      .catch((err) => console.log(err));
  };

  const handleDislikeCard = () => {
    onDeleteMoviesCard(currentMovie._id)
      .then(() => setIsLiked(false))
      .catch((err) => console.log(err));
  };

  const handleDeleteCard = () => {
    onDeleteMoviesCard(movie._id)
      .then(() => setIsLiked(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isLiked && savedMovies) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [isLiked, savedMovies]);

  return (
    <li className="card">
      <a href={pageSavedMovies ? movie.trailer : movie.trailerLink}  target="_blank" rel="noreferrer">
        <img className="card__img" src={pageSavedMovies ? movie.image : `https://api.nomoreparties.co${movie.image.url}`} alt="обложка фильма" />
      </a>
      <div className="card__info">
        <h3 className="card__title">{movie.nameRU}</h3>
        {pageSavedMovies ? (
          <button className="card__delete-icon" type="button" aria-label="Удалить" onClick={handleDeleteCard} />
        ) : (
          <button className={`card__like-icon ${isMoviesLiked || isLiked ? "card__like-icon_active" : ''}`} type="button" aria-label="Лайк" onClick={isLiked ? handleDislikeCard : handleLikeCard} />
        )}
      </div>
      <p className="card__duration">{durationMovie}</p>
    </li>
  );
}

export default MoviesCard;
