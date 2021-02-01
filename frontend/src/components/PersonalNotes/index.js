import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getPersonalNotes } from '../../store/notes';
import { getBookmark, newBookmark } from '../../store/bookmark'
import { NavLink } from 'react-router-dom';
import '../GlobalNotes/GlobalNotes.css'

//map over the notes and hav
function PersonalNotes() {

  let notes = useSelector(state => state.notes.notes);
  const userId = useSelector(state => state.session.user.id);
  const noteId = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')
  const user = useSelector(state => state.session.user.id)
  //adds the new note at the top instead of at the bottom and makes sure there are at least 3
  if (notes.length >= 3) {
    if (notes[notes.length - 2].updatedAt < notes[notes.length - 1].updatedAt) {
      let shifted = notes.pop();
      notes.unshift(shifted)
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalNotes(userId))
  }, [dispatch, userId])

  const checkForBookmark = async (note) => {

    let currentBookmark = await dispatch(getBookmark(user, note.id))
    //console.log("HERERERE", currentBookmark)
    if (currentBookmark.data.length === 0) {
      await dispatch(newBookmark(user, note.id))
    }
  }

  //console.log("notes", notes)
  return (
    <div>
      <h1 class="note-page-title">Personal</h1>
      <div className="all-notes">
        {notes.map((note, idx) => {
          return (
            <>
              <NavLink to={`/personal/${note.id}`} className="nav-link" key={idx} onClick={() => checkForBookmark(note)}>
                <div className={(noteId.id === note.id) ? "selected-note each-note" : "each-note"}>
                  <div className="title">{note.title}</div>
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


export default PersonalNotes;
