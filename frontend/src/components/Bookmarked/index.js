import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getBookmarked } from '../../store/notes';
import { NavLink } from 'react-router-dom';
import '../GlobalNotes/GlobalNotes.css'
//map over the notes and hav
function Bookmarked() {

  const notes = useSelector(state => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarked())
  }, [dispatch])
  //Hello
  //console.log(notes)
  return (
    <div>
      <h1>Bookmarked</h1>
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


export default Bookmarked;
