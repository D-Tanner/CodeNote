import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getPersonalNotes } from '../../store/notes';
import { NavLink } from 'react-router-dom';
import '../GlobalNotes/GlobalNotes.css'

//map over the notes and hav
function PersonalNotes() {

  let notes = useSelector(state => state.notes.notes);
  const userId = useSelector(state => state.session.user.id);
  const noteId = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')

  //adds the new note at the top instead of at the bottom
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

  //console.log("notes", notes)
  return (
    <div>
      <h1>Personal Notes</h1>
      <div className="all-notes">
        {notes.map((note, idx) => {
          return (
            <>
              <NavLink to={`/personal/${note.id}`} className="nav-link" key={idx}>
                <div className={(noteId.id === note.id) ? "selected-note each-note" : "each-note"}>
                  <div className="title">{note.title}</div>
                  <div className="content">{note.content}</div>
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
