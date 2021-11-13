import React from 'react';

import Form from '../Form/Form';

function Register() {
  return(
    <Form
      title={'Добро пожаловать!'}
      isRegisterPage={true}
      btnText={'Зарегистрироваться'}
      btnCaptionText={'Уже зарегистрированы?'}
      btnLinkPath={'/signin'}
      btnCaptionLinkText={'Войти'}
    />
  );
}

export default Register;
