import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getPersonalNotes } from '../../store/notes';
import { NavLink } from 'react-router-dom';
import '../GlobalNotes/GlobalNotes.css'
//map over the notes and hav
function PersonalNotes() {

  const notes = useSelector(state => state.notes.notes);
  const userId = useSelector(state => state.session.user.id);
  //console.log(userId)
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
              <NavLink to={`/bookmarked/${note.id}`} className="nav-link">
                <div className="each-note">
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
