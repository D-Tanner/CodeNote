import ReactQuill from 'react-quill'
import './QuillEditor.css'
import { useEffect } from 'react';
import { getNoteById } from '../../store/notes'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//useParams here grab the noteId called id
function QuillEditor() {
  const { id } = useParams();
  const note = useSelector(state => state.notes.notes)
  const dispatch = useDispatch();
  // console.log(note)

  // console.log(id)

  // useEffect(() => {
  //   dispatch(getNoteById(id))
  // }, [dispatch, id])

  return (
    <ReactQuill theme="snow" />
  )
}

export default QuillEditor;
