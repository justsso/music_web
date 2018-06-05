import { initialState } from '../store';

function HomeReducer(state = initialState.home, action) {

    switch (action.type) {
        case 'GET_NEW_SONG_SUC':

            return state = Object.assign({},
                state,
                {
                    isloading: false,
                    newSong: action.newSong
                }
            )

        case 'GET_HOT_SONG_SUC':
            return state = Object.assign({},
                state,
                {
                    isloading: false,
                    hotSong: action.hotSong
                }
            )
        case 'GET_MAY_BE_LIKE':
            return state = Object.assign({},
                state,
                {
                    mayBeLike: action.mayBeLike
                }
            )
        case 'GET_RECOMMEND':
            return state = Object.assign({},
                state,
                {
                    recommendSong: action.recommendSong
                }
            )
        case 'LOAD_SEARCH':
            return state = Object.assign({},
                state,
                {
                    loadingSearch: true
                })
        case 'SEARCH_DATA':
            return state = Object.assign({},
                state,
                {
                    loadingSearch: false,
                    PlayMusicList: action.data
                })
        default:
            return state;
    }
}

export default HomeReducer;