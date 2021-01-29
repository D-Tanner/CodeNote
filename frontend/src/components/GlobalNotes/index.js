import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getGlobalNotes } from '../../store/notes';
import { NavLink } from 'react-router-dom';

import './GlobalNotes.css'
//map over the notes and hav
function GlobalNotes() {

  const notes = useSelector(state => state.notes.notes);

  const dispatch = useDispatch();
  // const {id} = useParams();
  useEffect(() => {
    dispatch(getGlobalNotes())
  }, [dispatch])

  //console.log(notes)
  return (
    <div>
      <h1>Global Notes</h1>
      <div className="all-notes">
        {notes.map((note, idx) => {
          return (
            <>
              <NavLink to={`/global/${note.id}`} className="nav-link" key={idx}>
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


export default GlobalNotes;
