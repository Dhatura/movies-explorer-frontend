import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Form from "../Form/Form";
import useValidForm from "../../hooks/useValidForm";

function Login({ onLogin, setError, setIsDataSent, isError, isDataSent }) {
  const { values, handleChange, errors, isValid } = useValidForm();
  const history = useHistory();

  useEffect(() => {
    setError(false);
  }, [history, setError]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsDataSent(true);
    onLogin(values.email, values.password);
  };

  return (
    <Form
      title={"Рады видеть!"}
      handleSubmit={handleSubmit}
      isRegisterPage={false}
      values={values}
      handleChange={handleChange}
      errors={errors}
      isError={isError}
      isValid={isValid}
      isDataSent={isDataSent}
      submitErrorText={"При авторизации произошла ошибка"}
      btnText={"Войти"}
      btnCaptionText={"Ещё не зарегистрированы?"}
      btnLinkPath={"/signup"}
      btnCaptionLinkText={"Регистрация"}
      addRequired={false}
    />
  );
}

export default Login;
