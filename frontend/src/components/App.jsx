// import './App.css';
import { api } from "../utils/api";
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import ImagePopup from "./popups/ImagePopup";
import EditProfilePopup from "./popups/EditProfilePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import ConfirmPopup from "./popups/ConfirmPopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./popups/InfoTooltip";
import Home from "./Home";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/Auth";



function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  const [tooltipData, setTooltipData] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentCard, setCurrentCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  
  const navigate = useNavigate();

  React.useEffect(() => {
    tokenCheck(); // настало время проверить токен
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleConfirmClick(card) {
    setConfirmPopupOpen(true);
    setCurrentCard(card);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({});
    setTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);   // Снова проверяем, есть ли уже лайк на этой карточке
    (!isLiked ? api.likeCard(card._id) : api.unlikeCard(card._id))    // Отправляем запрос в API и получаем обновлённые данные карточки
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleUpdateUser(userData) {
    api.patchUserInfo(userData)
    .then((resUserData) => {
      setCurrentUser(resUserData);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleUpdateAvatar({avatar}) {
    api.uploadAvatar(avatar)
    .then(() => {
      currentUser.avatar = avatar;
      setCurrentUser({avatar, ...currentUser})
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
    .then((resCard) => {
      setCards([resCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  const handleLogin = ({ email, password }) => {
    auth.authorize(email, password)
    .then((data) => {
      if (data.token) {
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/', {replace: true});
      }
    })
    .catch(err => {
      showTooltip(false, err)
      console.log(err)
    });
  } 

  const handleRegister = ({ email, password }) => {
    auth.register(email, password)
    .then(() => {
      showTooltip(true, "Вы успешно зарегистрировались!")
      navigate('/singin', {replace: true});
    })
    .catch((err) => {
      showTooltip(false, err);
      console.log(err)
    });
  }

  const showTooltip = (isSuccess, message) => {
    setTooltipOpen(true);
    setTooltipData({isSuccess, message});
  }

  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');

      if (jwt){ 
        auth.getContent(jwt) // проверим токен
        .then((res) => {
          if (res){
            setLoggedIn(true);  // авторизуем пользователя
            navigate("/", {replace: true});
            setUserEmail(res.email);
          }
        })
        .catch(err => console.log(err))
      }
    }
  } 

    
  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page__container">
        <Routes>
          <Route path="/" 
            element={<ProtectedRouteElement 
              element={Home} 
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmClick}
              cards={cards}
              loggedIn={loggedIn}
              userEmail={userEmail}
            /> } 
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} showTooltip={showTooltip} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} showTooltip={showTooltip} />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>

        <Footer />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup  
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        
        <ConfirmPopup 
          isOpen={isConfirmPopupOpen}
          currentCard={currentCard}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
        />
  
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip 
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          title={tooltipData.message}
        >
            <svg className="popup__icon" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
              {tooltipData.isSuccess ? <path fillRule="evenodd" clipRule="evenodd" d="M117 60C117 91.4802 91.4802 117 60 117C28.5198 117 3 91.4802 3 60C3 28.5198 28.5198 3 60 3C91.4802 3 117 28.5198 117 60ZM120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60ZM57.5502 76.888L86.7676 48.888L81.2324 43.112L54.4277 68.7999L39.3496 57.8561L34.6504 64.3305L52.433 77.2372L55.1375 79.2001L57.5502 76.888Z" fill="black" /> : <path fillRule="evenodd" clipRule="evenodd" d="M60 117C91.4802 117 117 91.4802 117 60C117 28.5198 91.4802 3 60 3C28.5198 3 3 28.5198 3 60C3 91.4802 28.5198 117 60 117ZM60 120C93.1371 120 120 93.1371 120 60C120 26.8629 93.1371 0 60 0C26.8629 0 0 26.8629 0 60C0 93.1371 26.8629 120 60 120ZM55.0503 60.707L36.6655 42.3223L42.3224 36.6654L60.7071 55.0502L78.3848 37.3726L84.0416 43.0294L66.364 60.707L83.3346 77.6776L77.6777 83.3345L60.7071 66.3639L43.0294 84.0416L37.3726 78.3848L55.0503 60.707Z" fill="#FD0707"/>}
            </svg>
        </InfoTooltip>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
