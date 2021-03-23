import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormPage from '../LoginFormPage'
import image from './ImageWithText.PNG';
import imageMatrix from './Matrix.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      // <ProfileButton user={sessionUser} />
      <div></div>
    );
  } else {
    sessionLinks = (
      <>
        <div class="main-container">
          <div class="login-signup-banner" onClick={() => history.push("/")}>
            <img className="login-signup-logo" src={image} />
          </div>
          <div class="element-container">
            <img class="matrix-image" src={imageMatrix} />

          </div>
          <div class="nav-container">
            {/* <LoginFormPage /> */}
            <NavLink to="/login" className="login-button"><div>Login</div></NavLink>
            <NavLink to="/signup" className="register-button">Sign Up</NavLink>
          </div>
          <div></div>
        </div>
      </>
    );
  }

  return (
    <div>

      {isLoaded && sessionLinks}
    </div>

  );
}

export default Navigation;
