import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import Moment from 'react-moment'

import { getBookmarked } from '../../store/notes';
import { NavLink } from 'react-router-dom';
import '../GlobalNotes/GlobalNotes.css'
//map over the notes and hav
function Bookmarked() {

  const notes = useSelector(state => state.notes.notes);
  const userId = useSelector(state => state.session.user.id);
  const noteId = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getBookmarked(userId))
  }, [dispatch, userId])

  return (
    <div>
      <h1 class="note-page-title">Bookmarked</h1>
      <div className="all-notes">
        {notes.map((note, idx) => {
          return (
            <>
              <NavLink to={`/bookmarked/${note.id}`} className="nav-link" key={idx}>
                <div className={(noteId.id === note.id) ? "selected-note each-note" : "each-note"}>
                  <div className="title">{note.title}</div>
                  <div className="notes-date"><Moment format="MMM D" date={note.updatedAt} /></div>

                  {/* <div className="content">{note.content}</div> */}
                </div>
              </NavLink>
            </>
          )
        })}
      </div>
    </div>
  )
}


export default Bookmarked;
