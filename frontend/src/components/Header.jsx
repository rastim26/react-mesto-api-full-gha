import logo from '../images/header__logo.svg';

function Header({
  handleNavClick,
  navTitle,
  email,
}) {
  return (
    <header className="header">
        <img src={logo} alt="место лого" className="header__logo" />
        <div className="header__nav">
          {email && <p className="header__email">{email}</p>}
          <button onClick={handleNavClick} className="header__nav-link">{navTitle}</button>
        </div>
    </header>
  );
}

export default Header;