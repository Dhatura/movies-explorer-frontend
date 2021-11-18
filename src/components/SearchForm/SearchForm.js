import React, { useState } from "react";

import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useValidForm from "../../hooks/useValidForm";

function SearchForm({ handleSearchSubmit, toggleCheckbox, checkboxOn }) {
  const { values, handleChange, errors, isValid } = useValidForm();
  const [searchFormError, setSearchFormError] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      setSearchFormError("");
      handleSearchSubmit(values.keyword);
    } else if (values.keyword.length > 0) {
      setSearchFormError(errors.keyword);
    } else {
      setSearchFormError("Нужно ввести ключевое слово");
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
            value={values.keyword || ""}
            placeholder="Фильм"
            required
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
