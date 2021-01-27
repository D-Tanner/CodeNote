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
  //use note.content

  const dispatch = useDispatch();
  // console.log(note)

  console.log(id)

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getNoteById(id))
    }
  }, [dispatch, id])

  return (
    <ReactQuill theme="snow" value={note ? note.title : ''} />
    // <ReactQuill theme="snow" />
  )
}

export default QuillEditor;
