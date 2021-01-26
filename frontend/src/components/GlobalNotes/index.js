import { useSelector } from 'react-redux'

//map over the notes and hav
function GlobalNotes() {
  const notes = useSelector(state => state.notes);
  return (
    <div>
      {/* {notes.map((note, idx) => {
        return (
          <div>
            <div>{note.title}</div>
            <div>{note.content}<div />

            </div>
        )
      })} */}
      {notes}
    </div>
  )
}


export default GlobalNotes;
