import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';
import Form from "./popups/Form";


const Register = ({onRegister}) => {

  const [values, setValues] = React.useState({});
  const navigate = useNavigate();

  function handleNavClick () {
    navigate('/signin');
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
    onRegister(values);
  } 

  return (
    <>
      <Header 
        handleNavClick={handleNavClick}
        navTitle='Войти'
      />

      <Form 
        name=""
        isOpen=""
        title="Регистрация"
        buttonTitle="Зарегистрироваться"
        selector="auth"
        onSubmit={handleSubmit}
      >
        <input value={values.email || ''} onChange={handleChange} id="username" autoComplete="username" name="email" type="email" placeholder="Email" className="auth__input" required
          minLength="2" maxLength="40" />
        <span className="auth__error name-error">Вы пропустили это поле.</span>
        <input value={values.password || ''} onChange={handleChange} id="password" autoComplete="current-password" name="password" type="password" placeholder="Пароль" className="auth__input " required
          minLength="2" maxLength="200" />
        <span className="auth__error about-error">Вы пропустили это поле.</span>
      </Form>

      <p className="auth__suggestion">Уже зарегистрированы? <Link to="/signin" className="auth__link">Войти</Link></p>

    </>
  )
}

export default Register;