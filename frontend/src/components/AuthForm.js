import React from 'react';
import "../styles/unauth.css";

function AuthForm({title, id, onSubmit, name, submitText, children}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    function handleEmailChange (e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange (e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({email, password})
    }

return(
    <section className='unauth-main'>
      <h2 className="unauth-main__heading">{title}</h2>
      <form className="unauth-main__form" id={`${id}-form`} onSubmit={handleSubmit} name={name} noValidate>
      <input
        className="unauth-main__input"
        id={`${id}-email`}
        type="email"
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={handleEmailChange}
      />
            <input
        className="unauth-main__input"
        id={`${id}-password`}
        type="password"
        name="password"
        placeholder="Пароль"
        required
        value={password}
        onChange={handlePasswordChange}
      />
        <button className="unauth-main__button" type="submit">
          {submitText}
        </button>
        {children}
      </form>
  </section>
)
}

export default AuthForm;