// import { fetch } from './csrf'

// //slice of state for notes
// const SET_NOTES = 'session/setNotes';
// //action type
// //set notes
// const setNotes = (notes) => {
//   return {
//     type: SET_NOTES,
//     notes
//   }
// }
// //three thunk functions
// //Global - userId passed in to async funciton. Get request method. Findall where userid === notes
// // /api/notes/global
// export const getGlobalNotes = (userId) => async (dispatch) => {
//   const response = await fetch('/api/notes/global');
//   dispatch(setNotes(response.notes))
//   return response;
// }
// //Personal
// // /api/notes/personal
// export const getPersonalNotes = (userId) => async (dispatch) => {
//   const response = await fetch('/api/notes/personal');
//   dispatch(setNotes(response.notes))
//   return response;
// }


// //Bookmarked.
// // /api/notes/saved

// //after getting notes in each of these, we need one action creator set notes.
// //case SET_NOTES (user) type: setNOTES, notes
// const initialNote = { notes: null }

// const notesReducer = (state = initialNote, action) => {
//   let newState;
//   switch (action.type) {
//     case SET_NOTES:
//       newState = Object.assign({}, state);
//       newState.notes = action.notes;
//       return newState;
//     default:
//       return state;
//   }
// }

// export default notesReducer;
// //when we return something from reducer, we set the state of that slice, which is in our root reducer as notes key
