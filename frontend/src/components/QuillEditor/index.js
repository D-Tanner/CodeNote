import ReactQuill from 'react-quill'
import './QuillEditor.css'
import { useEffect } from 'react';
import { getNoteById } from '../../store/notes'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//useParams here grab the noteId called id
function QuillEditor() {
  const { id } = useParams();
  const note = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')
  const user = useSelector(state => state.session.user.id)
  const userId = (note !== undefined) ? note.userId : null;


  //use note.content

  const dispatch = useDispatch();


  useEffect(() => {
    if (id !== undefined) {
      dispatch(getNoteById(id))
    }
  }, [dispatch, id])

  return (
    <div>
      <div className="rte-nav">
        <button type="button">Delete Note</button>
      </div>
      <ReactQuill theme="snow"
        value={note ? `<h1>${note.title}</h1><p>${note.content}</p>` : ''}
        readOnly={user !== userId}
      //dispatch onkeyevent updateNote
      // onChange={console.log('hello')}
      />
    </div>

  )
}

export default QuillEditor;
