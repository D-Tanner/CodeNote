import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getGlobalNotes } from '../../store/notes';
import { NavLink, useParams } from 'react-router-dom';
import { getBookmark, newBookmark } from '../../store/bookmark'
import Moment from 'react-moment'

import './GlobalNotes.css'
//map over the notes and hav
function GlobalNotes() {
  const { id } = useParams();
  const notes = useSelector(state => state.notes.notes);
  const noteId = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')
  const note = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')
  const user = useSelector(state => state.session.user.id)

  const dispatch = useDispatch();
  // const {id} = useParams();
  useEffect(() => {
    dispatch(getGlobalNotes())
  }, [dispatch])

  const checkForBookmark = async (note) => {

    let currentBookmark = await dispatch(getBookmark(user, note.id))
    //console.log("HERERERE", currentBookmark)
    if (currentBookmark.data.length === 0) {
      await dispatch(newBookmark(user, note.id))
    }
  }


  //console.log(notes)
  return (
    <div>
      <h1 class="note-page-title">Global Notes</h1>
      <div className="all-notes">
        {notes.map((note, idx) => {
          return (
            <>
              <NavLink to={`/global/${note.id}`} className="nav-link" key={idx} onClick={() => checkForBookmark(note)}>
                <div className={(noteId.id === note.id) ? "selected-note each-note" : "each-note"}>
                  <div className="title">{note.title}</div>
                  {/* <div className="content">{note.content}</div> */}
                  <div className="note-info-container">

                    {note.User && <div className="note-user">{note.User.username}</div>}
                    <div className="notes-date"><Moment format="MMM D" date={note.updatedAt} /></div>
                  </div>
                </div>
              </NavLink>
            </>
          )
        })}
      </div>
    </div>
  )
}


export default GlobalNotes;
