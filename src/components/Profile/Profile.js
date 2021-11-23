import React, { useEffect, useState, useContext } from "react";

import "./Profile.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useValidForm from "../../hooks/useValidForm";

function Profile({
  handleSignOut,
  onEditUserInfo,
  isComplitedUpdate,
  setComplitedUpdate,
  isError,
  setError,
}) {
  const { values, handleChange, setValues, resetForm } = useValidForm();

  const currentUser = useContext(CurrentUserContext);
  const defaultName = currentUser.name;
  const defaultEmail = currentUser.email;

  const [isChanges, setIsChanges] = useState(false);

  useEffect(() => {
    resetForm();
    setValues({
      name: defaultName,
      email: defaultEmail,
    });
  }, [resetForm, currentUser, setValues, defaultName, defaultEmail]);

  useEffect(() => {
    setIsChanges(
      !(values.name === defaultName) || !(values.email === defaultEmail)
    );
  }, [values.name, values.email, defaultName, defaultEmail]);

  const handleEditUserProfile = (evt) => {
    evt.preventDefault();
    setComplitedUpdate("");
    setError("");
    onEditUserInfo(values.name, values.email);
  };

  return (
    <section className="profile profile_container">
      <h1 className="profile__title">Привет, {defaultName}!</h1>
      <form className="profile__form" onSubmit={handleEditUserProfile}>
        <label className="profile__label" htmlFor="name">
          Имя
          <input
            className="profile__input"
            type="text"
            id="name"
            name="name"
            placeholder="name"
            minLength="2"
            maxLength="30"
            pattern="[а-яА-Яa-zA-ZёË\- ]{2,30}"
            autoComplete="off"
            required
            value={values.name || ""}
            onChange={handleChange}
          />
        </label>
        <label className="profile__label" htmlFor="email">
          E-mail
          <input
            className="profile__input"
            type="email"
            id="email"
            name="email"
            placeholder="email"
            minLength="2"
            maxLength="30"
            autoComplete="off"
            required
            value={values.email || ""}
            onChange={handleChange}
          />
        </label>
        {isComplitedUpdate ? (
          <span className="profile_submit-sucsess">
            Обновление профиля прошло успешно!
          </span>
        ) : null}
        {isError ? (
          <span className="profile_submit-error">
            При обновлении профиля произошла ошибка
          </span>
        ) : null}
        <button className="profile__btn" type="submit" disabled={!isChanges}>
          Редактировать
        </button>
        <button
          className="profile__btn profile__btn_red"
          type="button"
          onClick={handleSignOut}
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
