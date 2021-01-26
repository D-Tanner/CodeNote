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

  console.log(notes)
  return (
    <div>
      {/* {notes.map((notes, idx) => {
        return (
          <>
            <div>{notes.title}</div>
            <div>{notes.content}</div>
          </>
        )
      })} */}
    </div>
  )
}


export default GlobalNotes;
