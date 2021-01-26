import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getGlobalNotes } from '../../store/notes';
//map over the notes and hav
function GlobalNotes() {

  const notes = useSelector(state => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGlobalNotes())
  }, [dispatch])

  //console.log(notes)
  return (
    <div>
      {notes.map((note, idx) => {
        return (
          <>
            <div>
              <div>{note.title}</div>
              <div>{note.content}</div>
            </div>
          </>
        )
      })}
    </div>
  )
}


export default GlobalNotes;
