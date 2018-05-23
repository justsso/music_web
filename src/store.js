// import {combineReducers, createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';


// import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'


// const rootReducer = combineReducers({
//   router: routerReducer
// });
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// let store = null;
// if (composeEnhancers) {
//     store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// } else {
//     store = createStore(rootReducer, applyMiddleware(thunk)
      
//     )
// }

// export default store


import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { routerReducer, routerMiddleware, push} from 'react-router-redux'


var reducers = combineReducers({
    reducer: routerReducer
})


const store = createStore(reducers);
export default store;