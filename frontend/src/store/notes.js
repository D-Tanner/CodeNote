import { fetch } from './csrf'

//slice of state for notes
const SET_NOTES = 'session/setNotes';
const CURRENT_NOTE = 'session/currentNote'
const NEW_NOTE = 'session/newNote';
const REMOVE_NOTE = 'session/removeNote'
const UPDATE_BOOKMARK = 'session/updateBookmark'
const UPDATE_STATUS = 'session/updateStatus'
const EDIT_NOTE = 'session/editNote'
//action type
//set notes
const setNotes = (notes) => {
  return {
    type: SET_NOTES,
    notes
  }
}

const currentNote = (note) => {
  return {
    type: CURRENT_NOTE,
    note
  }
}

const newNote = (note) => {
  return {
    type: NEW_NOTE,
    note
  }
}

const removeNote = (noteId) => {
  return {
    type: REMOVE_NOTE,
    noteId
  }
}

const updateBookmark = (noteId) => {
  return {
    type: UPDATE_BOOKMARK,
    noteId
  }
}

const updateStatus = (noteId) => {
  return {
    type: UPDATE_STATUS,
    noteId
  }
}

const editNote = (noteId, content) => {
  return {
    type: EDIT_NOTE,
    noteId,
    content
  }
}
//three thunk functions
//Global - userId passed in to async funciton. Get request method. Findall where userid === notes
// /api/notes/global
export const getGlobalNotes = () => async (dispatch) => {
  const response = await fetch('/api/notes/global');
  //check dev tools
  console.log("getglobalnotes", response)
  dispatch(setNotes(response.data))
  //Do not do anything with this response, it only updates the store
  return response;
}
//Personal
// /api/notes/personal
export const getPersonalNotes = (userId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${userId}/personal`);
  dispatch(setNotes(response.data))
  return response;
}

//
//Bookmarked.
// /api/notes/saved
export const getBookmarked = (userId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${userId}/bookmarked`);
  //check dev tools
  //console.log(response)
  dispatch(setNotes(response.data))
  //Do not do anything with this response, it only updates the store
  return response;
}

export const getNoteById = (id) => async (dispatch) => {
  const response = await fetch(`/api/notes/${id}`);
  //console.log(response)
  //check dev tools
  //console.log(response)
  dispatch(currentNote(response.data))
  //Do not do anything with this response, it only updates the store
  return response;
}

export const createNewNote = (userId) => async (dispatch) => {
  const response = await fetch(`/api/notes/new`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId }),
  });

  dispatch(newNote(response.data))
  return response;
}

//delete note
export const deleteNoteById = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/delete/${noteId}`, {
    method: "DELETE"
  })
  //console.log("response in store", response)
  dispatch(removeNote(response.data))
  return response;
}

export const updateBookmarkById = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/bookmark/update/${noteId}`, {
    method: "PATCH"
  })
  //console.log("response in store", response)
  dispatch(updateBookmark(response.data))
  return response;
}

//updates either public or private
export const updateStatusById = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/status/update/${noteId}`, {
    method: "PATCH"
  })
  //console.log("response in store", response)
  dispatch(updateStatus(response.data))
  return response;
}

export const editNoteById = (noteId, content) => async (dispatch) => {
  // console.log("!!!!!!!!!!!!!!!", noteId, content)
  const response = await fetch(`api/notes/${noteId}/edit`, {
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content)
  })
  console.log(response)
  dispatch(editNote(response.data))
  return response;
}

//after getting notes in each of these, we need one action creator set notes.
//case SET_NOTES (user) type: setNOTES, notes
const initialState = { notes: [] }

const notesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_NOTES:
      newState = Object.assign({}, state);
      newState.notes = action.notes;
      if (action.notes) {
        newState.currentNote = [action.notes[0]]
      }
      return newState;
    case CURRENT_NOTE:
      return { ...state, currentNote: action.note }
    case NEW_NOTE:
      const addedNote = { notes: [...state.notes, action.note], currentNote: [action.note] }
      //console.log(addedNote);
      return addedNote;
    case REMOVE_NOTE:
      newState = { ...state }
      const newNote = [];
      //filter notes that have been deleted
      newState.notes.forEach(note => {
        if (note.id !== Number(action.noteId)) {
          return newNote.push(note)
        }
      })
      newState.notes = newNote
      return newState;
    case UPDATE_BOOKMARK:
      return { ...state, currentNote: [action.noteId] };
    case UPDATE_STATUS:
      return { ...state, currentNote: [action.noteId] }
    default:
      return state;
  }
}

export default notesReducer;
//when we return something from reducer, we set the state of that slice, which is in our root reducer as notes key
