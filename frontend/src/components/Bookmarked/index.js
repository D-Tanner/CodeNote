import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getBookmarked } from '../../store/notes';
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
      {notes.map((note, idx) => {
        return (
          <>
            <div>{note.title}</div>
            <div>{note.content}</div>
          </>
        )
      })}
    </div>
  )
}


export default Bookmarked;
