import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session'
import notesReducer from './notes'
import bookmarkReducer from './bookmark'

const rootReducer = combineReducers({
  // add reducer functions here
  //slices of state
  session: sessionReducer,
  //Need to add notes reducer and set it to a key of notes
  notes: notesReducer,
  bookmark: bookmarkReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
