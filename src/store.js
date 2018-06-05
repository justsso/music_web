import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'

import createHistory from "history/createHashHistory";
import HomeReducer from './reducers/HomeReducer';
import UserReducer from './reducers/UserReducer';
import DetailContentReducer from './reducers/DetailContentReducer';
export const routerHistory = createHistory();
const middleware = routerMiddleware(routerHistory);
const loggerMiddleware = createLogger()


export const initialState = {
    home: {
        newSong: [],
        hotSong: [],
        mayBeLike: [],
        recommendSong: [],
        PlayMusicList: [],
        loadingSearch: false
    },
    user: {
        collect: [],
        userId: null,
        tags: [],
        detailContentInfo: [],
        tagItemInfo: [],
        songSheets: [],
        songSheetInfo: [],
        songSheetItemInfo:[],
        PlayMusicList: [],
        loadingTags: false,
        loadingCollect: false,
        loadingSongSheet: false,
        loadingSongSheetItem: false,
        loadingDetailContentInfo: false,
        loadingPlayMusic: false
    }
}


const rootReducer = combineReducers({
    router: routerReducer,
    home: HomeReducer,
    user: UserReducer,
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

