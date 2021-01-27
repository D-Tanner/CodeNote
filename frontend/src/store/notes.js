import { fetch } from './csrf'

//slice of state for notes
const SET_NOTES = 'session/setNotes';
const CURRENT_NOTE = 'session/currentNote'
const NEW_NOTE = 'session/newNote';
const REMOVE_NOTE = 'session/removeNote'

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
//three thunk functions
//Global - userId passed in to async funciton. Get request method. Findall where userid === notes
// /api/notes/global
export const getGlobalNotes = () => async (dispatch) => {
  const response = await fetch('/api/notes/global');
  //check dev tools
  //console.log(response)
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
  console.log(response)
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


//after getting notes in each of these, we need one action creator set notes.
//case SET_NOTES (user) type: setNOTES, notes
const initialNote = { notes: [] }

const notesReducer = (state = initialNote, action) => {
  let newState;
  switch (action.type) {
    case SET_NOTES:
      newState = Object.assign({}, state);
      newState.notes = action.notes;
      return newState;
    case CURRENT_NOTE:
      return { ...state, currentNote: action.note }
    case NEW_NOTE:
      return { notes: [...state.notes, { [action.note.id]: action.note },], currentNote: action.note }
    case REMOVE_NOTE:
      newState = { ...state }

      // newState.notes.delete(action.noteId)
      const newNote = [];

      newState.notes.forEach(note => {
        //console.log(note.id, action.noteId)
        if (note.id !== Number(action.noteId)) {
          return newNote.push(note)
        }
      })
      //console.log(newNote)
      // // console.log(action.noteId)
      // //filter so the new state contains everything but the action.noteId
      // //console.log(deleteNote)
      // console.log('delete', newNote)
      newState.notes = newNote
      return newState;
    default:
      return state;
  }
}

export default notesReducer;
//when we return something from reducer, we set the state of that slice, which is in our root reducer as notes key
