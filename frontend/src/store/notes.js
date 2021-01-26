import { fetch } from './csrf'

//slice of state for notes
const SET_NOTES = 'session/setNotes';
//action type
//set notes
const setNotes = (notes) => {
  return {
    type: SET_NOTES,
    notes
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
  const response = await fetch('/api/notes/personal');
  dispatch(setNotes(response.notes))
  return response;
}

//
//Bookmarked.
// /api/notes/saved
export const getBookmarked = () => async (dispatch) => {
  const response = await fetch('/api/notes/bookmarked');
  //check dev tools
  //console.log(response)
  dispatch(setNotes(response.data))
  //Do not do anything with this response, it only updates the store
  return response;
}

//after getting notes in each of these, we need one action creator set notes.
//case SET_NOTES (user) type: setNOTES, notes
const initialNote = { notes: null }

const notesReducer = (state = initialNote, action) => {
  let newState;
  switch (action.type) {
    case SET_NOTES:
      newState = Object.assign({}, state);
      newState.notes = action.notes;
      return newState;
    default:
      return state;
  }
}

export default notesReducer;
//when we return something from reducer, we set the state of that slice, which is in our root reducer as notes key
