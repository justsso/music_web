import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'

export const history = createHistory()
const middleware = routerMiddleware(history)

const rootReducer = combineReducers({
  
  router: routerReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let store = null;
if (composeEnhancers) {
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, middleware)));
} else {
    store = createStore(rootReducer, applyMiddleware(thunk)
        , applyMiddleware(middleware)
    )
}

export default store
