import Header from "./Header";
import React from "react";
import AuthForm from "./AuthForm";
import { Link} from "react-router-dom";
import * as auth from "../utils/auth";
import InfoToolTip from "./InfoToolTip";
import successImage from "../images/succes.svg";
import errorImage from "../images/error.svg";

function Register({onRegister}) {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(null);

  function handleSubmit(data) {
    const { email, password } = data;
    auth.register(email, password)
      .then(() => {
        setIsSuccess(true);
      })
      .catch(() => {
        setIsError(true);
      });
  }

  function closeErrorPopup() {
    setIsError(false);
  }

  function closeSuccessPopup() {
    setIsSuccess(false);
    onRegister()
  }

  return (
    <div className="page">
      <Header>
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      </Header>
      <AuthForm
        title="Регистрация"
        id="register"
        onSubmit={handleSubmit}
        name="register"
        submitText="Зарегистрироваться"
      >
        <Link className="unauth-main__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </AuthForm>
      {isSuccess && (
        <InfoToolTip
          imageLink={successImage}
          popupText="Вы успешно зарегистрировались!"
          id="info-tooltip-success"
          onClose={closeSuccessPopup}
          alt='Успешная регистрация'
        />
      )}
      {isError && (
        <InfoToolTip
          imageLink={errorImage}
          popupText="Что-то пошло не так! Попробуйте ещё раз."
          id="info-tooltip-error"
          onClose={closeErrorPopup}
          alt='Ошибка'
        />
      )}
    </div>
  );
}

export default Register;
