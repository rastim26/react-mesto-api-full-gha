import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';
import Form from "./popups/Form";
import * as auth from "../utils/Auth";

const Login = ({handleLogin}) => {

  const [values, setValues] = React.useState({});
  const navigate = useNavigate();

  function handleNavClick () {
    navigate('/signup');
  }

  const handleChange = (event) => { 
    const { name, value } = event.target;
    setValues((prev) => ({ 
      ...prev, 
      [name]: value
    })) 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
    setValues({email: '', password: ''});
  } 


  return (
    <>
      <Header 
        handleNavClick={handleNavClick}
        navTitle='Регистрация' 
      />

      <Form 
        name=""
        isOpen=""
        title="Вход"
        buttonTitle="Войти"
        selector="auth"
        onSubmit={handleSubmit}
      >
        <input value={values.email || ''} onChange={handleChange} id="email" autoComplete="username" name="email" type="email" placeholder="Email" className="auth__input" required
          minLength="2" maxLength="40" />
        <span className="auth__error name-error">Вы пропустили это поле.</span>
        <input value={values.password || ''} onChange={handleChange} id="password" autoComplete="current-password" name="password" type="password" placeholder="Пароль" className="auth__input " required
          minLength="2" maxLength="200" />
        <span className="auth__error about-error">Вы пропустили это поле.</span>
      </Form>

      <p className="auth__suggestion">В первый раз? <Link to="/signup" className="auth__link">Регистрация</Link></p>

    </>
  )
}

export default Login;