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
  const userId = note.userId;
  console.log(userId === user)

  //use note.content

  const dispatch = useDispatch();
  //Quick Change
  // console.log(note)

  //console.log(id)

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getNoteById(id))
    }
  }, [dispatch, id])

  return (
    <ReactQuill theme="snow" value={note ? `<h1>${note.title}</h1><p>${note.content}</p>` : ''} readOnly={user !== userId} />
    // <ReactQuill theme="snow" />
  )
}

export default QuillEditor;
