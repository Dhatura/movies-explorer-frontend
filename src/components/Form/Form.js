import React from 'react';
import { Link } from 'react-router-dom';

import './Form.css';

function Form({ title, isRegisterPage, btnText, btnCaptionText, btnLinkPath, btnCaptionLinkText}) {
  return (
    <section className="form form_container">
      <h1 className="form__title">{title}</h1>
      <form className="form__form">
        <label className={`form__label ${isRegisterPage ? '' : 'form__label_hidden'}`}>
          Имя
          <input className="form__input form__input_name" type="text" id="name" minLength="2" maxLength="30" placeholder="Имя" required />
          <span className="form__input-error"></span>
        </label>
        <label className="form__label" htmlFor="email">
          E-mail
          <input className="form__input form__input_e-mail" type="email" id="email" minLength="2" maxLength="30" placeholder="E-mail" required />
          <span className="form__input-error"></span>
        </label>
        <label className="form__label" htmlFor="password">
          Пароль
          <input className="form__input form__input_password" type="password" id="password" minLength="2" maxLength="30" placeholder="Пароль" required />
          <span className="form__input-error">Что-то пошло не так...</span>
        </label>
        <button className={`form__btn ${isRegisterPage ? '' : 'form__label_register'}`}>{btnText}</button>
        <div className="form__btn-caption">
          <span className="form__btn-caption_text">{btnCaptionText}</span>
          <span className="form__btn-caption_link">
            <Link className="form__link" to={btnLinkPath}>{btnCaptionLinkText}</Link>
          </span>
        </div>
      </form>
    </section>
  );
}

export default Form;
