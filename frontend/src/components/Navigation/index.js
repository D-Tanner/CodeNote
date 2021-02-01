import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import image from './ImageWithText.PNG';
import imageMatrix from './Matrix.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

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
          <div class="login-signup-banner">
            <img class="login-signup-logo" src={image} />
          </div>
          <div class="element-container">
            <img class="matrix-image" src={imageMatrix} />

          </div>
          <div class="form-container">
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>

          </div>
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
