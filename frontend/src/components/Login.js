import Header from "./Header";
import React from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth";

function Login({onLoggedIn}) {

  function handleSubmit({ email, password }) {

    if (!email || !password) {
      return;
    }
    auth.authorize(email, password).then(() => {
        onLoggedIn({ email });
    }).catch(err => console.log(err))
  }

  return (
    <div className="page">
      <Header>
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      </Header>
      <AuthForm
        title="Вход"
        id="login"
        onSubmit={handleSubmit}
        name="login"
        submitText="Войти"
      />
    </div>
  );
}

export default Login;
