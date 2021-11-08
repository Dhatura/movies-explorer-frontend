import React from 'react';

import './FilterCheckbox.css';

function FilterCheckbox() {
  function handlerCheckbox() {
    const btnBall = document.querySelector('.checkbox__ball');
    const checkbox = document.querySelector('.checkbox__input');
    btnBall.classList.toggle('checkbox__ball_active');

    if (btnBall.classList.contains('checkbox__ball_active')) {
      checkbox.setAttribute('checked', true);
    } else {
      checkbox.removeAttribute('checked');
    }
  }


  return (
    <div className="checkbox">
      <input className="checkbox__input" type="checkbox" name="checkbox" />
      <button onClick={handlerCheckbox} className="checkbox__btn">
        <span className="checkbox__ball"></span>
      </button>
      <label className="checkbox__label" htmlFor="checkbox">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
