import React from 'react';
import { Link } from 'react-router-dom';

import './Form.css';

function Form({ title, handleSubmit, isRegisterPage, values, handleChange, errors, isError, submitErrorText, isValid, isDataSent, btnText, btnCaptionText, btnLinkPath, btnCaptionLinkText, addRequired }) {
  return (
    <section className="form form_container">
      <h1 className="form__title">{title}</h1>
      <form className="form__form" onSubmit={handleSubmit}>
        {addRequired ? (
          <label className={`form__label ${isRegisterPage ? '' : 'form__label_hidden'}`}>
            Имя
            <input className="form__input form__input_name" type="text" id="name" name="name" minLength="2" maxLength="30" pattern="[а-яА-Яa-zA-ZёË\- ]{2,30}" autoFocus autoComplete="off" placeholder="Имя" required value={values.name || ''} onChange={handleChange} />
            {errors.name ? (
              <span className="form__input-error">{errors.name}</span>
            ) : null}
        </label>
        ) : (
        <label className={`form__label ${isRegisterPage ? '' : 'form__label_hidden'}`}>
          Имя
          <input className="form__input form__input_name" type="text" id="name" name="name" minLength="2" maxLength="30" pattern="[а-яА-Яa-zA-ZёË\- ]{2,30}" autoComplete="off" placeholder="Имя" value={values.name || ''} onChange={handleChange} />
          {errors.name ? (
            <span className="form__input-error">{errors.name}</span>
          ) : null}
        </label>
        )}
        <label className="form__label" htmlFor="email">
          E-mail
          <input className="form__input form__input_e-mail" type="email" id="email" name="email" minLength="2" maxLength="30" autoFocus autoComplete="off" placeholder="E-mail" required value={values.email || ''} onChange={handleChange} />
          {errors.email ? (
            <span className="form__input-error">{errors.email}</span>
          ) : null}
        </label>
        <label className="form__label" htmlFor="password">
          Пароль
          <input className="form__input form__input_password" type="password" id="password" name="password" minLength="8" maxLength="30" autoComplete="off" placeholder="Пароль" required value={values.password || ''} onChange={handleChange} />
          {errors.password ? (
            <span className="form__input-error">{errors.password}</span>
          ) : null}
        </label>
        {isError ? (
          <span className="form__submit-error">
            {isError.message ? isError.message : submitErrorText}
          </span>
        ) : null}
        <button className={`form__btn ${isRegisterPage ? '' : 'form__label_register'}
          ${isValid && !isDataSent ? '' : 'form__btn_disabled'}`}
          type={isValid && !isDataSent ? 'submit' : 'button'}>
          {btnText}
        </button>
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
