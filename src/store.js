import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'

import createHistory from "history/createHashHistory";
export const routerHistory = createHistory();
const middleware = routerMiddleware(routerHistory);

const loggerMiddleware = createLogger()

const rootReducer = combineReducers({
  router: routerReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let store = null;
if (composeEnhancers) {
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, middleware)));
} else {
    store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware)
        , applyMiddleware(middleware)
    )
}

export default store

