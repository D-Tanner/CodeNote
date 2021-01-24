// frontend/src/store/session.js
import { fetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
//Action type
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};
//Action creator

export const restoreUser = () => async (dispatch) => {
  const response = await fetch('/api/session');
  dispatch(setUser(response.data.user))
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
  dispatch(setUser(response.data.user))
  return response;
}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

//Connects with session.js backend post route
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await fetch('/api/session', {
    method: 'POST',
    //part of user
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  //goes to sessionReducer
  dispatch(setUser(response.data.user));
  return response;
};

const initialState = { user: null };

//ThunkActionCreator
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;


      // const initialState = { user: null }


      // const sessionReducer = (state = initialState, action) => {

      //   const newState = {
      //     ...state,
      //   }

      //   switch (action.type) {

      //     default:
      //       return newState;
      //   }
      // }

      // export default sessionReducer;
