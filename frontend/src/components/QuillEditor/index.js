import ReactQuill from 'react-quill'
import './QuillEditor.css'
import './nav-bar-for-editor.css'
import { useEffect, useState } from 'react';
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
  const toggleCheck = useSelector(state => (state.session.user.id === state.notes.currentNote[0].userId))
  // const toggleCheck = useSelector(state => (console.log(state.session.user.id, state.notes.currentNote[0].userId)))

  const userId = (note !== undefined) ? note.userId : null;
  const [toggle, setToggle] = useState(true)
  const [hiddenToggle, setHiddenToggle] = useState(false)
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
        {toggleCheck && <div className="private-public-toggle">
          <div className="toggle-label">Public</div>
          <div className="onoffswitch2">
            <input type="checkbox" name="onoffswitch2" class="onoffswitch2-checkbox" id="myonoffswitch2" onClick={() => setToggle(!toggle)} checked={toggle}></input>
            <label class="onoffswitch2-label" for="myonoffswitch2">
            </label>
          </div>
          <div className="toggle-label">Private</div>
        </div>}

        <BookmarkIcon style={{ color: green[500] }} />
        <BookmarkBorderIcon style={{ color: green[500] }} />
      </div>
      <ReactQuill theme="snow"
        value={note ? `<h1>${note.title}</h1><p>${note.content}</p>` : ''}
        readOnly={user !== userId}
      //dispatch onkeyevent updateNote
      // onChange={console.log('hello')}
      />
    </div >

  )
}

export default QuillEditor;
