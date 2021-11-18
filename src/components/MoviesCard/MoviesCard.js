import './MoviesCard.css';

function MoviesCard({movie, savedMovies, pageSavedMovies, handleSaveMovie, handleDeleteMovie, }) {
  const hoursDuration = Math.trunc(movie.duration / 60);
  const minutesDuration = movie.duration % 60;
  const durationMovie = `${hoursDuration > 0 ? hoursDuration + 'ч ' : ''}${minutesDuration > 0 ? minutesDuration + 'м' : ''}`;

  const isSaved = savedMovies.some((i) => i.movieId === movie.id);

  const onLike = () => {
    isSaved ? handleDeleteMovie(movie, pageSavedMovies) : handleSaveMovie(movie);
  };

  const onDelete = () => {
    handleDeleteMovie(movie, pageSavedMovies);
  };

  return (
    <li className="card">
      <a href={pageSavedMovies ? movie.trailer : movie.trailerLink}  target="_blank" rel="noreferrer">
        <img className="card__img" src={pageSavedMovies ? movie.image : `https://api.nomoreparties.co${movie.image.url}`} alt="обложка фильма" />
      </a>
      <div className="card__info">
        <h3 className="card__title">{movie.nameRU}</h3>
        {pageSavedMovies ? (
          <button className="card__delete-icon" type="button" aria-label="Удалить" onClick={onDelete} />
        ) : (
          <button className={`card__like-icon ${isSaved ? "card__like-icon_active" : ''}`} type="button" aria-label="Лайк" onClick={onLike} />
        )}
      </div>
      <p className="card__duration">{durationMovie}</p>
    </li>
  );
}

export default MoviesCard;
