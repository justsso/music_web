import { initialState } from '../store';
function UserReducer(state = initialState.user, action) {
    // console.log(initialState.user)
    // console.log(action.type)
    switch (action.type) {
        case 'LOAD_SUC':
            return state = Object.assign({}, { 
                userId: action.userId
            })
        
        case 'GET_NEW_SONG_SUC':
            return state = Object.assign({},
                state,
                {
                    isloading: false,
                    newSong: action.newSong
                }
            )
        case 'GET_COLLECT_LODING':
            return state = Object.assign({},
                state,
                {
                    loadingCollect: action.isloading
                })
        case 'GET_COLLECT':
            return state = Object.assign({},
                state,
                {
                    collect: action.collect,
                    loadingCollect: action.isloading
                }
            )
        case 'CREATE_TAG':
            return state = Object.assign({},
                state, {
                    tags: action.tags
                })
        case 'GET_TAG_LODING':
            return state = Object.assign({},
                state, {
                    loadingTags: action.loading
                })
        case 'GET_TAG':
            return state = Object.assign({},
                state,
                {
                    tags: action.tags,
                    loadingTags: action.loading
                }
            )
        case 'GET_TAG_ITEM_INFO_LOAD':
            return state = Object.assign({},
                state,
                {
                    loadingDetailContentInfo: true
                })
        case 'GET_TAG_ITEM_INFO':
            return state = Object.assign({},
                state,
                {
                    detailContentInfo: action.tagItemInfo,
                    loadingDetailContentInfo: false
                }
            )
        case 'GET_SONG_SHEET_LOAD':
            return state = Object.assign({},
            state,
            {
                loadingSongSheet: action.isloading
            })

        case 'GET_SONG_SHEET':
            return state = Object.assign({},
                state,
                {
                    songSheets: action.data,
                    loadingSongSheet: action.isloading
                }
            )
        case 'GET_SONG_SHEET_INFO_LOAD':
            return state = Object.assign({},
            state,
            {
                loadingDetailContentInfo: action.loading
            })
        case 'GET_SONG_SHEET_INFO':
            return state = Object.assign({},
            state,
            {
                loadingDetailContentInfo: action.loading,
                detailContentInfo: action.data
            })
        default:
            return state;
    }
}

export default UserReducer;