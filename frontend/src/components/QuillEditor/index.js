import ReactQuill from 'react-quill'
import './QuillEditor.css'
import './nav-bar-for-editor.css'
import { useEffect, useState } from 'react';
import { getNoteById, deleteNoteById, updateBookmarkById, updateStatusById, editNoteById } from '../../store/notes'
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
  // const note = useSelector(state => (state.notes.currentNote !== undefined && state.notes.currentNote !== []) ? state.notes.currentNote[0] : '')
  const userIdNote = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0].userId : '')
  //const userIdNote = useSelector(state => (state.notes.currentNote) ? state.notes.currentNote[0].userId : '')
  //const stateOfBookmark = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0].isBookmarked : '')
  const user = useSelector(state => state.session.user.id)
  //const [valueState, setValueState] = useState('')

  // const toggleCheck = (user === 1) ? true : null;
  const toggleCheck = (user === userIdNote) ? true : null;

  let valueState = '';

  const userId = (note !== undefined) ? note.userId : null;
  //const [saveButton, setSaveButton] = useState(false)

  //use note.content
  const deleteNote = async (e) => {
    e.preventDefault();

    await dispatch(deleteNoteById(note.id))
    // console.log('delete successful')
    // console.log(note)
    history.push(`/personal`)
  }
  //hello
  //update value of rte
  const setValueState = (value) => {
    valueState = value
    console.log(valueState)

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

        {/* Button for saving feature */}
        {toggleCheck && <button onClick={() => {
          //console.log('before', valueState)
          //setSaveButton(false);
          dispatch(editNoteById(note.id, valueState))
          valueState = '';
          window.location.reload(false);
          //console.log('after', note)
        }}>Save</button>}
        {/* container for the public/private switch */}
        {toggleCheck && <div className="private-public-toggle">
          <div className="toggle-label">Private</div>
          <div className="onoffswitch2">
            <input type="checkbox" name="onoffswitch2" class="onoffswitch2-checkbox" id="myonoffswitch2" onClick={() => dispatch(updateStatusById(note.id))} checked={note.isPublic}></input>
            {/* <input type="checkbox" name="onoffswitch2" class="onoffswitch2-checkbox" id="myonoffswitch2" onClick={() => dispatch(updateStatusById(note.id))} checked={true}></input> */}
            <label class="onoffswitch2-label" for="myonoffswitch2">
            </label>
          </div>
          <div className="toggle-label">Public</div>
        </div>}

        {/* button for the bookmark logic */}


        <button className="bookmark-button" onClick={() => dispatch(updateBookmarkById(note.id))}>
          {/* {(stateOfBookmark === true) && <BookmarkIcon style={{ color: green[500] }} />} */}
          {/* {(stateOfBookmark === false) && <BookmarkBorderIcon style={{ color: green[500] }} />} */}
        </button>


      </div>
      {/* Determines either a readonly rte or editable rte */}
      {(user !== userId) && <ReactQuill theme="snow"
        value={note ? `<h1>${note.title}</h1><p>${note.content}</p>` : ''}
        readOnly={true}
      />}
      {(user === userId) && <ReactQuill theme="snow"
        value={note ? `<h1>${note.title}</h1><p>${note.content}</p>` : ''}
        onChange={(value) => {
          setValueState(value);
          //setSaveButton(true)
        }}
      // onKeyUp={() => setSaveButton(true)}

      />}
    </div >

  )
}

export default QuillEditor;
