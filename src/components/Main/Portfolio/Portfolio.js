import React from 'react';

import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__navigation">
        <ul className="portfolio__links">
          <li className="portfolio__links-item">
            <a className="portfolio__link" href="https://github.com/Dhatura/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a>
          </li>
          <li className="portfolio__links-item">
            <a className="portfolio__link" href="https://dhatura.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт</a>
          </li>
          <li className="portfolio__links-item">
            <a className="portfolio__link" href="https://github.com/Dhatura/react-mesto-api-full" target="_blank" rel="noreferrer">Одностраничное приложение</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
