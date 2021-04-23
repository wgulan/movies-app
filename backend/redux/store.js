const redux = require("redux");
const { default: logger } = require("redux-logger");
const movies = require("./reducers");
const { createStore, combineReducers, applyMiddleware } = redux

const rootReducer = combineReducers({movies});

const store = createStore(rootReducer, applyMiddleware());

module.exports = store;
