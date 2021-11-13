import React from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ isSaved, movies }) {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {movies.map(item => {
          return <MoviesCard key={item} num={item} />
          })
        }
      </ul>
      <button className={`movies-cards__button ${isSaved && "movies-cards__button_hidden"}`} type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;
