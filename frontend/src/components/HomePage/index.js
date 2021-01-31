//Page for home. Three vertical divs containing navbar search, notes, and rich-text-editor
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './HomePage.css';
import { Route, Switch, NavLink, useHistory } from 'react-router-dom'
import ProfileButton from '../Navigation/ProfileButton'
import QuillEditor from '../QuillEditor'
import GlobalNotes from '../GlobalNotes'
import PersonalNotes from '../PersonalNotes'
import Bookmarked from '../Bookmarked'
import { createNewNote } from '../../store/notes'
import { newBookmark } from '../../store/bookmark'

import './HomePage.css'


function HomePage() {

  const areThereNotesOnPage = useSelector(state => (state.notes.notes.length !== 0) ? true : false)

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const note = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')
  const userId = (note !== undefined) ? note.userId : null;


  const handleNewNote = async (e) => {
    e.preventDefault();
    history.push(`/personal`)
    let newNote = await dispatch(createNewNote(sessionUser.id))
    await dispatch(newBookmark(userId, newNote.data.id))

    history.push(`/personal/${newNote.data.id}`)
    //I want to be redirected to /personal page/:newNoteId
  }

  return (
    <div className="main-container">
      <div className="navbar-homepage">
        <span><ProfileButton user={sessionUser} />CodeNote</span>

        <div>
          <div><button type="button" onClick={handleNewNote}>New Note</button></div>
          <div><NavLink className="nav-link" to="/global">Global Notes</NavLink></div>
          <div><NavLink className="nav-link" to="/personal">Personal Notes</NavLink></div>
          <div><NavLink className="nav-link" to="/bookmarked">Bookmarked</NavLink></div>
        </div>

      </div>
      {/* <div className="col-resize"></div> */}
      <div className="notes-homepage">
        <Switch>
          <Route path="/global"><GlobalNotes /></Route>
          <Route path="/personal"><PersonalNotes /></Route>
          <Route path="/bookmarked"><Bookmarked /></Route>
        </Switch>
      </div>
      {/* <div className="col-resize"></div> */}
      <div className="text-editor-homepage">

        <Switch>
          <Route path='/' exact> <QuillEditor /></Route>


          {/* {areThereNotesOnPage && <div>
            <Route path='/global' exact><QuillEditor /></Route>
            <Route path='/global/:id'><QuillEditor /></Route>
          </div>} */}

          {/* {areThereNotesOnPage && <div>
            <Route path='/personal' exact><QuillEditor /></Route>
          <Route path='/personal/:id'><QuillEditor /></Route>
          </div>} */}

          {/* {areThereNotesOnPage && <div>
            <Route path='/bookmarked' exact><QuillEditor /></Route>
            <Route path='/bookmarked/:id'><QuillEditor /></Route>
          </div>} */}

          {/* {(!areThereNotesOnPage) && <div>
            <Route path='/bookmarked' exact><Bookmarked /></Route>
            <Route path='/bookmarked/:id'><Bookmarked /></Route>
          </div>} */}



          {/* <Route path='/global' exact><QuillEditor /></Route>
          <Route path='/global/:id'><QuillEditor /></Route> */}



          {/* <Route path='/personal' exact><QuillEditor /></Route>
          <Route path='/personal/:id'><QuillEditor /></Route> */}


          {/* <Route path='/bookmarked' exact><QuillEditor /></Route>
          <Route path='/bookmarked/:id'><QuillEditor /></Route> */}

          <Route path='/global' exact>{areThereNotesOnPage && <QuillEditor />}</Route>
          <Route path='/global/:id'>{areThereNotesOnPage && <QuillEditor />}</Route>

          <Route path='/bookmarked' exact>{areThereNotesOnPage && <QuillEditor />}</Route>
          <Route path='/bookmarked/:id'>{areThereNotesOnPage && <QuillEditor />}</Route>

          <Route path='/personal' exact>{areThereNotesOnPage && <QuillEditor />}</Route>
          <Route path='/personal/:id'>{areThereNotesOnPage && <QuillEditor />}</Route>


        </Switch>
      </div>
    </div>
  )
}


export default HomePage;
