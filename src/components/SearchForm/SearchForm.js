import React from 'react';

import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return(
    <>
      <form className="search-form">
        <div className="search-form__container">
          <input className="search-form__input" type="text" placeholder="Фильм" required />
          <button className="search-form__btn" type="submit">
            Поиск
          </button>
        </div>
      </form>
      <div className="search-form__checkbox-wrapper">
        <FilterCheckbox />
      </div>
    </>
  );
}

export default SearchForm;
