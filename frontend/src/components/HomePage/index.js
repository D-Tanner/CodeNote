//Page for home. Three vertical divs containing navbar search, notes, and rich-text-editor
import React from 'react';
import { useSelector } from 'react-redux'
import './HomePage.css';
import { Route, Switch, NavLink } from 'react-router-dom'
import ProfileButton from '../Navigation/ProfileButton'
import QuillEditor from '../QuillEditor'
import GlobalNotes from '../GlobalNotes'
import PersonalNotes from '../PersonalNotes'
import Bookmarked from '../Bookmarked'

function HomePage() {


  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="main-container">
      <div className="navbar-homepage">
        <span>
          <ProfileButton user={sessionUser} />
        CodeNote
        </span>
        <div>
          <div><NavLink to="/global">Global Notes</NavLink></div>
          <div><NavLink to="/personal">Personal Notes</NavLink></div>
          <div><NavLink to="/bookmarked">Bookmarked</NavLink></div>
        </div>

      </div>
      <div className="col-resize"></div>
      <div className="notes-homepage">
        {/* create a switch component in react, have route for each component */}
        {/* <GlobalNotes /> */}
        {/* <PersonalNotes /> */}
        {/* <Bookmarked /> */}
        <Switch>
          <Route path="/global"><GlobalNotes /></Route>
          <Route path="/personal"><PersonalNotes /></Route>
          <Route path="/bookmarked"><Bookmarked /></Route>
        </Switch>
      </div>
      <div className="col-resize"></div>
      <div className="text-editor-homepage">
        <QuillEditor />
      </div>
    </div>
  )
}


export default HomePage;
