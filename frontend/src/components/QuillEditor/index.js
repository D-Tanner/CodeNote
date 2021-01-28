import ReactQuill from 'react-quill'
import './QuillEditor.css'
//import './nav-bar-for-editor.css'
import { useEffect } from 'react';
import { getNoteById, deleteNoteById } from '../../store/notes'
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { green } from '@material-ui/core/colors';
//useParams here grab the noteId called id
function QuillEditor() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const note = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')
  const user = useSelector(state => state.session.user.id)
  const userId = (note !== undefined) ? note.userId : null;


  //use note.content
  const deleteNote = async (e) => {
    e.preventDefault();

    await dispatch(deleteNoteById(note.id))
    console.log('delete successful')
    history.push(`/personal`)
  }


  useEffect(() => {
    if (id !== undefined) {
      dispatch(getNoteById(id))
    }
  }, [dispatch, id])

  return (
    <div>
      <div className="rte-nav">
        <button type="button" onClick={deleteNote}>Delete Note</button>
        {/* {isBookmard && icon || isBookmar} */}

        <BookmarkIcon style={{ color: green[500] }} />
        <BookmarkBorderIcon style={{ color: green[500] }} />
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
