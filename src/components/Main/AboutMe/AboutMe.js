import React from 'react';

import './AboutMe.css';

import MyPhoto from '../../../images/me.jpeg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студентка</h2>
      <div className="about-me__container">
        <article className="about-me__wrapper">
          <div className="about-me__info">
            <h3 className="about-me__name">Александра</h3>
            <p className="about-me__prof">Front-end developer, 23 года</p>
            <p className="about-me__text">
              Я родилась в городе Фрязино, окончила университет по специальности геология, успешно работала в данной области, но приняла решение развиваться
              дальше. Идея стать программистом давно засела в голове, ведь свой первый сайт я сделала еще в школе.
              Решив не откладывать на потом, я стала грызть гранит Веб-разработки и учиться серфить на волнах всезнающего Google,
              дабы встать на этот увлекательный путь и достигнуть просвещения в IT :)
            </p>
          </div>
          <ul className="about-me__links">
            <li className="about-me__links-item">
              <a className="about-me__link" href="https://www.linkedin.com/in/alexandra-hahina-4581931a3/" target="_blank" rel="noreferrer">Linkedin</a>
            </li>
            <li className="about-me__links-item">
              <a className="about-me__link" href="https://github.com/Dhatura" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </article>
        <img className="about-me__photo" src={MyPhoto} alt="Фотография студента" />
      </div>
    </section>
  );
}

export default AboutMe;
