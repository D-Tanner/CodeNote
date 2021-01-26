//Page for home. Three vertical divs containing navbar search, notes, and rich-text-editor
import React from 'react';
import { useSelector } from 'react-redux'
import './HomePage.css';
import ProfileButton from '../Navigation/ProfileButton'
import QuillEditor from '../QuillEditor'

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <div className="main-container">
      <div className="navbar-homepage">
        You are now on the home page!
        <ProfileButton user={sessionUser} />
        {/* <AllNotes user={sessionUser} /> */}
      </div>
      <div className="col-resize"></div>
      <div className="notes-homepage">
        main notes
      </div>
      <div className="col-resize"></div>
      <div className="text-editor-homepage">
        <QuillEditor />
      </div>
    </div>
  )
}


export default HomePage;
