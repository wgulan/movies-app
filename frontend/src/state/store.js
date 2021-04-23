import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createMiddleware } from "redux-api-middleware";
import moviesReducers from "./movies/reducers"

const rootReducer = combineReducers({...moviesReducers});
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, createMiddleware()))
);

export default store;