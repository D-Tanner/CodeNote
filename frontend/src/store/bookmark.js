import { fetch } from './csrf'



//slice of state
const CURRENT_BOOKMARK = 'session/currentBookmarkd'
const ALL_BOOKMARKS = 'session/allBookmarks'
const UPDATE_BOOKMARK = 'session/updateBookmark'
const NEW_BOOKMARK = 'session/newBookmark'
const DELETE_BOOKMARK = 'session/deleteBookmark'
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

const updateBookmark = (bookmark) => {
  return {
    type: UPDATE_BOOKMARK,
    bookmark
  }
}

const newBookmarkCreate = (bookmark) => {
  return {
    type: NEW_BOOKMARK,
    bookmark
  }
}

const destroyBookmark = (bookmark) => {
  return {
    type: DELETE_BOOKMARK,
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

export const updateBookmarkById = (userId, noteId) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/update/${userId}/${noteId}`, {
    method: "PATCH"
  })
  //console.log("response in store", response)
  dispatch(updateBookmark(response))
  return response;
}

export const newBookmark = (userId, noteId) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/new/${userId}/${noteId}`, {
    method: "POST"
  })
  dispatch(newBookmarkCreate(response))
  return response;
}

export const deleteBookmark = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/delete/${noteId}`, {
    method: "DELETE"
  })
  dispatch(newBookmarkCreate(response))
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

      return newState;
    case UPDATE_BOOKMARK:
      newState = { ...state }
      newState.currentBookmark = action.bookmark.data
      return newState;
    case NEW_BOOKMARK:
      newState = { ...state }
      newState.currentBookmark = action.bookmark.data
      return newState;
    case DELETE_BOOKMARK:
      newState = { ...state }
      return newState;
    default:
      return state;

  }
}

export default bookmarkReducer;
