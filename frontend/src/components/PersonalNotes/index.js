import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getPersonalNotes } from '../../store/notes';
//map over the notes and hav
function PersonalNotes() {

  const notes = useSelector(state => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalNotes())
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


export default PersonalNotes;
