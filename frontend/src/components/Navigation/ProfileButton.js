import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import image from './Logo.PNG'

function ProfileButton({ user }) {
  const username = useSelector(state => state.session.user.username)
  const history = useHistory("/");
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
  };

  return (
    <>
      <button onClick={openMenu} class="logo-button">

        <img src={image} class="logo-image" />
        <div id="user-email" >{username}</div>
      </button>

      {showMenu && (
        <div class="profile-dropdown">
          <div class="profile-info">{user.username}</div>
          <div class="profile-info">{user.email}</div>
          <div class="profile-info">
            <button class="logout-button" onClick={logout}><div id="logout-label">Log Out</div></button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
