import React from 'react';

import Form from '../Form/Form';

function Login() {
  return(
    <Form
      title={'Рады видеть!'}
      isRegisterPage={false}
      btnText={'Войти'}
      btnCaptionText={'Ещё не зарегистрированы?'}
      btnLinkPath={'/signup'}
      btnCaptionLinkText={'Регистрация'}
    />
  );
}

export default Login;
