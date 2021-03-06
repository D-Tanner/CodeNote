import ReactQuill from 'react-quill'
import './QuillEditor.css'
import './nav-bar-for-editor.css'
import { useEffect, useState } from 'react';
import { getNoteById, deleteNoteById, updateStatusById, editNoteById, makeFileCopyOfNote } from '../../store/notes'
import { getBookmark, updateBookmarkById, newBookmark } from '../../store/bookmark'
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import { green } from '@material-ui/core/colors';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import grey from '@material-ui/core/colors/grey';
import { getGlobalNotes, getPersonalNotes, getBookmarked, filterSearchedNotes } from "../../store/notes"


//useParams here grab the noteId called id
function QuillEditor() {



  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const note = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0] : '')
  const userIdNote = useSelector(state => (state.notes.currentNote !== undefined) ? state.notes.currentNote[0].userId : '')
  const stateOfBookmark = useSelector(state => (state.bookmark.currentBookmark !== undefined) ? state.bookmark.currentBookmark.isBookmarked : '')
  const user = useSelector(state => state.session.user.id)
  const toggleCheck = (user === userIdNote) ? true : null;
  const userId = (note !== undefined) ? note.userId : null;
  const [updated, setUpdated] = useState(false);
  const userSessionId = useSelector(state => state.session.user.id)
  const bookmarkPage = window.location.href.includes('/bookmarked')
  const personalPage = window.location.href.includes('/personal')
  const globalPage = window.location.href.includes('/global')

  const deleteNote = async (e) => {
    e.preventDefault();
    await dispatch(deleteNoteById(note.id))
  }

  const makeFileCopy = async (e) => {
    e.preventDefault();
    let copied = await dispatch(makeFileCopyOfNote(user, note.title, note.content))
    history.push(`/personal/${copied.data.id}`)
  }

  //for changing routes
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getNoteById(id))
      dispatch(getBookmark(user, id))
    }

  }, [dispatch, id])

  useEffect(() => {
    console.log(note.title)
  }, [updated])


  return (
    <>
      {  note && <div>
        <div className="rte-nav">

          {/* button to delete a note specific to the user */}
          {toggleCheck && <button type="button" className="delete-button" onClick={deleteNote}><DeleteIcon /></button>}

          {/* container for the public/private switch */}
          {toggleCheck && <div className="private-public-toggle">
            <div className="toggle-label">Private</div>
            <div className="onoffswitch2">
              <input type="checkbox"
                name="onoffswitch2"
                class="onoffswitch2-checkbox"
                id="myonoffswitch2"
                onClick={() => dispatch(updateStatusById(note.id))}
                checked={note.isPublic}>

              </input>
              <label class="onoffswitch2-label" for="myonoffswitch2">
              </label>
            </div>
            <div className="toggle-label">Public</div>
          </div>}


          {
            <div className="tooltip">
              <div>
                <button type="button" className="file-copy" onClick={makeFileCopy}><FileCopyIcon style={{ color: grey[400] }} /></button>
              </div>
              <div class="tooltiptext">Copy</div>
            </div>}

          {/* button for the bookmark logic */}
          <button className="bookmark-button" onClick={() => dispatch(updateBookmarkById(user, note.id))}>

            {(stateOfBookmark === true) && <BookmarkIcon style={{ color: green[500] }} />}
            {(stateOfBookmark === false) && <BookmarkBorderIcon style={{ color: green[500] }} />}
          </button>


        </div>
        {/* Determines either a readonly rte or editable rte */}
        {
          (user !== userId) && <ReactQuill theme="snow"
            value={note ? `<h1>${note.title}</h1><p>${note.content}</p>` : ''}
            readOnly={true}
          />
        }
        {
          (user === userId) && <ReactQuill theme="snow"
            value={note ? `<h1>${note.title}</h1><p>${note.content}</p>` : ''}
            onChange={(value, delta, source, editor) => {
              if (source === 'user') {
                if (value.length <= 102400) {
                  dispatch(editNoteById(note.id, value))
                  // setTimeout(() => {
                  //   if (globalPage) dispatch(getGlobalNotes())
                  //   if (personalPage) dispatch(getPersonalNotes(userSessionId))
                  //   if (bookmarkPage) dispatch(getBookmarked(userSessionId))
                  // }, 3000)
                } else {
                  window.alert('File size too large! Either delete an image or move it to another note.')
                }
              }
            }}

          />
        }
      </div>}
    </>
  )
}

export default QuillEditor;
