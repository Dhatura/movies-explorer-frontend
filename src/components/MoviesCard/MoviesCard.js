import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

import './MoviesCard.css';

import FilmImg from '../../images/film.png';

function MoviesCard() {
  const [saveMovie, setSaveMovie] = useState(false);
  const { pathname } = useLocation();

  const saveButtonHandler = () => {
    setSaveMovie(!saveMovie);
  }

  return (
    <li className="card">
      <img className="card__img" src={FilmImg} alt="обложка фильма" />
      <div className="card__info">
        <h3 className="card__title">Бег это свобода</h3>
        {
          pathname === "/movies" ?
          <button className={`card__like-icon ${saveMovie ? "card__like-icon_active" : ''}`} onClick={saveButtonHandler} />
          :
          <button className="card__delete-icon" />
        }
      </div>
      <p className="card__duration">1ч 44м</p>
    </li>
  );
}

export default MoviesCard;
