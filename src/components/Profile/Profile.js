import React from 'react';

import './Profile.css';

function Profile() {
  return (
    <section className="profile profile_container">
      <h1 className="profile__title">Привет, Друг!</h1>
      <form className="profile__form">
        <label className="profile__label" htmlFor="name">
          Имя
          <input className="profile__input" id="name" placeholder="name" defaultValue="Друг" />
        </label>
        <label className="profile__label" htmlFor="email">
          E-mail
          <input className="profile__input" id="email" placeholder="email" defaultValue="pochta@yandex.ru" />
        </label>
        <button className="profile__btn" type="submit">Редактировать</button>
        <button className="profile__btn profile__btn_red" type="button">Выйти из аккаунта</button>
      </form>
    </section>
  );
}

export default Profile;
