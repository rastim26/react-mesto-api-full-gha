import Header from "./Header";
import Main from "./Main";
import { useNavigate } from 'react-router-dom';

function Home ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  userEmail
}) {

  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/signin');
  }

  return (
    <>
      <Header 
        handleNavClick={signOut} 
        navTitle="Выйти" 
        email={userEmail}
      />
      <Main 
        onEditProfile={onEditProfile} 
        onAddPlace={onAddPlace} 
        onEditAvatar={onEditAvatar} 
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        cards={cards}
      />
    </>
)}

export default Home;