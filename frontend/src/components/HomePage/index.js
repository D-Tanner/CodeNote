//Page for home. Three vertical divs containing navbar search, notes, and rich-text-editor
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, NavLink, useHistory } from 'react-router-dom'
import ProfileButton from '../Navigation/ProfileButton'
import QuillEditor from '../QuillEditor'
import GlobalNotes from '../GlobalNotes'
import PersonalNotes from '../PersonalNotes'
import Bookmarked from '../Bookmarked'
import { useNoteContext } from '../../context/search'
import SearchBar from "../SearchBar/SearchBar"
import { createNewNote } from '../../store/notes'
import { newBookmark } from '../../store/bookmark'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PublicIcon from '@material-ui/icons/Public';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from '@material-ui/icons/Description';
import { grey, green } from '@material-ui/core/colors';
import './HomePage.css'





function HomePage() {

  const bookmarkPage = window.location.href.includes('/bookmarked')
  const personalPage = window.location.href.includes('/personal')
  const globalPage = window.location.href.includes('/global')

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

        <div className="search-bar-container">
          <SearchBar />
        </div>
        <button type="button" class="new-note-button" onClick={handleNewNote}>
          <span><AddIcon /></span>
          <div id="button-label">New Note</div>
        </button>


        <div class={globalPage ? "route-selected route" : "route not-selected"}>
          <NavLink className="nav-link-tab" to="/global">
            <span><PublicIcon fontSize="small" /></span>
            <div id="note-tab-label">Global</div>
          </NavLink>
        </div>
        <div class={personalPage ? "route-selected route" : "route not-selected"}>
          <NavLink className="nav-link-tab" to="/personal">
            <span><DescriptionIcon fontSize="small" /></span>
            <div id="note-tab-label">Personal</div>
          </NavLink>
        </div>
        <div class={bookmarkPage ? "route-selected route" : "route not-selected"}>
          <NavLink className="nav-link-tab" to="/bookmarked">
            <span><BookmarkIcon fontSize="small" /></span>
            <div id="note-tab-label">Bookmarked</div>
          </NavLink>
        </div>


        <div className="social-links">
          <span class="social-icons"><a target="_blank" href="https://www.linkedin.com/in/dillon-tanner-a881951aa"><LinkedInIcon className="linkedin-hover" fontSize="large" style={{ color: grey[600] }} /></a></span>
          <span class="social-icons"><a target="_blank" href="https://github.com/D-Tanner"><GitHubIcon fontSize="large" className="github-hover" style={{ color: grey[600] }} /></a></span>
        </div>
      </div>

      <div className="notes-homepage">
        <Switch>
          <Route path="/global"><GlobalNotes /></Route>
          <Route path="/personal"><PersonalNotes /></Route>
          <Route path="/bookmarked"><Bookmarked /></Route>
        </Switch>
      </div>

      <div className="text-editor-homepage">

        <Switch>
          <Route path='/' exact> <QuillEditor /></Route>


          <Route path='/global/:id'>{areThereNotesOnPage && <QuillEditor />}</Route>

          <Route path='/bookmarked/:id'>{areThereNotesOnPage && <QuillEditor />}</Route>

          <Route path='/personal/:id'>{areThereNotesOnPage && <QuillEditor />}</Route>


        </Switch>

      </div>
    </div >
  )
}


export default HomePage;
