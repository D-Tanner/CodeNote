//Page for home. Three vertical divs containing navbar search, notes, and rich-text-editor
import React from 'react';
import { useSelector } from 'react-redux'
import './HomePage.css';
import ProfileButton from '../Navigation/ProfileButton'

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <div>You are now on the home page.
      <ProfileButton user={sessionUser} />
    </div>
  )
}


export default HomePage;
