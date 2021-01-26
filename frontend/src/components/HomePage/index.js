//Page for home. Three vertical divs containing navbar search, notes, and rich-text-editor
import React from 'react';
import { useSelector } from 'react-redux'
import './HomePage.css';
//import { Route, Switch, NavLink } from 'react-router-dom'
import ProfileButton from '../Navigation/ProfileButton'
import QuillEditor from '../QuillEditor'
import GlobalNotes from '../GlobalNotes'

function HomePage() {


  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="main-container">
      <div className="navbar-homepage">
        <span>
          <ProfileButton user={sessionUser} />
        CodeNote
        </span>

      </div>
      <div className="col-resize"></div>
      <div className="notes-homepage">
        <GlobalNotes />
      </div>
      <div className="col-resize"></div>
      <div className="text-editor-homepage">
        <QuillEditor />
      </div>
    </div>
  )
}


export default HomePage;
