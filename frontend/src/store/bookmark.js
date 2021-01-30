import { fetch } from './csrf'


//slice of state
const CURRENT_BOOKMARK = 'session/currentBookmarkd';
const ALL_BOOKMARKS = 'session/allBookmarks'

//action type
const currentBookmark = (bookmark) => {
  return {
    type: CURRENT_BOOKMARK,
    bookmark
  }
}

const allBookmarks = (bookmark) => {
  return {
    type: ALL_BOOKMARKS,
    bookmark
  }
}

export const getBookmark = (userId, noteId) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/${userId}/${noteId}`)
  dispatch(currentBookmark(response.data))
  return response;
}

export const getAllBookmarkByUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/all/${userId}`);
  //check dev tools
  //console.log(response)
  dispatch(allBookmarks(response.data))
  //Do not do anything with this response, it only updates the store
  return response;
}

const initialState = { allbookmarks: {} }

const bookmarkReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case CURRENT_BOOKMARK:
      newState = { ...state }
      //console.log(action.bookmark[0])
      //newState = Object.assign({}, state)
      newState.currentBookmark = action.bookmark[0]
      return newState;
    case ALL_BOOKMARKS:
      newState = { ...state }
      // newState.allBookmarks = action
      return newState;
    default:
      return state;

  }
}

export default bookmarkReducer;
