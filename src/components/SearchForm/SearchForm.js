import React, { useState } from "react";

import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleSearchSubmit, toggleCheckbox, checkboxOn }) {
  const [inputValue, setInputValue] = useState("");
  const [searchFormError, setSearchFormError] = useState("");

  const handleChange = (evt) => {
    setSearchFormError("");
    setInputValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!inputValue) {
      setSearchFormError("Нужно ввести ключевое слово");
    } else {
      handleSearchSubmit(inputValue);
    }
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__container">
          <input
            className="search-form__input"
            type="text"
            name="keyword"
            value={inputValue || ""}
            placeholder="Фильм"
            onChange={handleChange}
          />
          <span className="search-form__error">{searchFormError}</span>
          <button className="search-form__btn" type="submit">
            Поиск
          </button>
        </div>
      </form>
      <div className="search-form__checkbox-wrapper">
        <FilterCheckbox
          toggleCheckbox={toggleCheckbox}
          checkboxOn={checkboxOn}
        />
      </div>
    </>
  );
}

export default SearchForm;
