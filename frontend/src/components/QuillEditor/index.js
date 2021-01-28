import ReactQuill from 'react-quill'
import './QuillEditor.css'
import './nav-bar-for-editor.css'
import { useEffect, useState } from 'react';
import { getNoteById, deleteNoteById } from '../../store/notes'
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import { green } from '@material-ui/core/colors';

//useParams here grab the noteId called id
function QuillEditor() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const note = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')
  const userIdNote = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0].userId : '')
  const stateOfBookmark = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')
  const user = useSelector(state => state.session.user.id)

  const toggleCheck = (user === userIdNote) ? true : null;
  // const bookmarked



  const userId = (note !== undefined) ? note.userId : null;
  const [togglePublic, setTogglePublic] = useState(true)
  const [bookmark, setBookmark] = useState(true)

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

        {/* button to delete a note specific to the user */}
        {toggleCheck && <button type="button" className="delete-button" onClick={deleteNote}><DeleteIcon /></button>}

        {/* container for the public/private switch */}
        {toggleCheck && <div className="private-public-toggle">
          <div className="toggle-label">Public</div>
          <div className="onoffswitch2">
            <input type="checkbox" name="onoffswitch2" class="onoffswitch2-checkbox" id="myonoffswitch2" onClick={() => setTogglePublic(!togglePublic)} checked={togglePublic}></input>
            <label class="onoffswitch2-label" for="myonoffswitch2">
            </label>
          </div>
          <div className="toggle-label">Private</div>
        </div>}

        {/* button for the bookmark logic */}


        <button className="bookmark-button" onClick={() => setBookmark(!bookmark)}>
          {(bookmark === true) && <BookmarkIcon style={{ color: green[500] }} />}
          {(bookmark === false) && <BookmarkBorderIcon style={{ color: green[500] }} />}
        </button>


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
