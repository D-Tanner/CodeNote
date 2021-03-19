import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import Moment from 'react-moment'

import { getBookmarked } from '../../store/notes';
import { NavLink } from 'react-router-dom';
import '../GlobalNotes/GlobalNotes.css'


function Bookmarked() {

  const notes = useSelector(state => state.notes.notes);
  const userId = useSelector(state => state.session.user.id);
  const noteId = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')

  const dispatch = useDispatch();
  const [userAuthor, setUserAuthor] = useState("");

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


export default Bookmarked;
