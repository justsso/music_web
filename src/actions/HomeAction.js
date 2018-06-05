import axios from 'axios';
import {isLogin} from './UserAction';

export const getNewSong = () => {
    const url = `/get_new_song`;
    return dispatch => {
        dispatch ( {
            type: 'GET_NEW_SONG',
            isloading : true
        })
        axios.get(url)
        .then ( res =>{
            console.log( res.cookies )
            dispatch({
                type: 'GET_NEW_SONG_SUC',
                newSong: res.data,
                isloading : false
            })
        })
    }
}

export const getHotSong = () => {
    const url = `/get_hot_song`;
    return dispatch => {
        dispatch ({
            type: 'GET_HOT_SONG',
            isloading : true
        })
        axios.get(url)
        .then ( res =>{
            console.log( res.data)
            dispatch({
                type: 'GET_HOT_SONG_SUC',
                hotSong: res.data,
                isloading : false
            })
        })
    }
}


export const getMayBeLike = () => {
    const url = `/maybe_you_like`;
    return dispatch => {
        axios.get(url).then(res => {
            dispatch({
                type: 'GET_MAY_BE_LIKE',
                mayBeLike: res.data
            })
        }).catch(err => {
    
        })       
    }
}

export const getRecommend = () => {
    const url = `/recommendation`;
    return dispatch => {
        axios.get(url).then(res => {
            if(res.status === 200){
                dispatch({
                    type: 'GET_RECOMMEND',
                    recommendSong: res.data
                })
            }
        }).catch(err => {
    
        })       
    }
}

export const search = (text) => {
    var url = `/search?text=${text}`;
    return dispatch => {
        dispatch({
            type: 'LOAD_SEARCH',
            loading: true
        })
        axios.get(url).then( res => {
            if(res.status == 200){
                dispatch({
                    type: 'SEARCH_DATA',
                    data: res.data.songs
                })
            }
        }).catch(err => {
            if(err){
                console.log(err)
            }
        })
    }
}