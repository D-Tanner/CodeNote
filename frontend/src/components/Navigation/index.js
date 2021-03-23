import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormPage from '../LoginFormPage'
import image from './ImageWithText.PNG';
import imageMatrix from './Matrix.png';
import { useNoteContext } from "../../context/search"
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { grey, green } from '@material-ui/core/colors';

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  const loginPage = window.location.href.includes('/login')
  const signupPage = window.location.href.includes('/signup')
  // const [homePage, setHomePage] = useState(!loginPage && !signupPage)
  const { homePage, setHomePage } = useNoteContext();

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
          <div class="login-signup-banner" onClick={() => {
            setHomePage(true)
            history.push("/")
          }}>
            <img className="login-signup-logo" src={image} />
          </div>
          <div class="element-container">
            <img class="matrix-image" src={imageMatrix} />

          </div>
          <div class="nav-container">
            <NavLink to="/login" onClick={() => setHomePage(false)} className="login-button"><div>Login</div></NavLink>
            <NavLink to="/signup" onClick={() => setHomePage(false)} className="register-button">Sign Up</NavLink>
          </div>
          {homePage && <div class="homepage-banner">
            <div className="banner-title">
              Accomplish more. Remember your code and share!
            </div>
            <div>
              <button
                className="get-started"
                onClick={() => {
                  setHomePage(false)
                  history.push("/login")
                }
                }>Get Started</button>
            </div>
            <div className="links-container">
              <span class="social-icons"><a target="_blank" href="https://www.linkedin.com/in/dillon-tanner-a881951aa"><LinkedInIcon className="linkedin-hover" fontSize="large" style={{ color: grey[600] }} /></a></span>
              <span class="social-icons"><a target="_blank" href="https://github.com/D-Tanner"><GitHubIcon fontSize="large" className="github-hover" style={{ color: grey[600] }} /></a></span>
            </div>

          </div>}
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
