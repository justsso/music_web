import axios from 'axios';
import { getCookie } from '../lib/fun';
import {
    message
} from 'antd';
import { getNewSong, getHotSong, getMayBeLike } from './HomeAction';

// 添加收藏
export const addCollect = (song_id) => {
    const url = `/add_collect?song_id=${song_id}`;
    return dispatch => {
        axios.get(url).then(res => {
            if (res.data.code == true) {
                //    添加成功,给用户反馈
                message.success('收藏成功')
                dispatch(getNewSong())
                dispatch(getHotSong())
                dispatch(getMayBeLike())
            }
        }).catch(err => {
        })
    }
}

// 获取收藏
export const getCollect = () => {
    const url = `/get_user_collect`;
    return dispatch => {
        dispatch({
            type: 'GET_COLLECT_LODING',
            isloading: true
        })
        axios.get(url).then(res => {
            console.log(res)
            dispatch({
                type: 'GET_COLLECT',
                collect: res.data,
                isloading: false
            })
        }).catch(err => {

        })
    }
}

// 取消收藏
export const cancelCollect = ( song_id) => {
    const url = `/cancel_collect?song_id=${song_id}`;
    return dispatch => {

        axios.get(url).then(res => {
            console.log(res)
            message.success('取消成功');
            dispatch(getNewSong())
            dispatch(getHotSong())
            dispatch(getMayBeLike())
            dispatch(getCollect())
        }).catch(err => {

        })
    }
}

// 添加标签
export const addTag = (user_id, tag_name) => {
    const url = `/add_tag?user_id=${user_id}&tag_name=${tag_name}`;
    return dispatch => {
        axios.get(url).then(res => {
            if (res.data.code == true) {
                //    添加成功,给用户反馈
                message.success('创建成功')
            }
        }).then(() => {
            console.log('进行请求所有的tag')
            dispatch(getTag(user_id))
        }).catch(err => {

        })
    }
}

// 获取用户的标签
export const getTag = (user_id) => {
    const url = `/get_user_tag?user_id=${user_id}`;
    return dispatch => {

        dispatch({
            type: 'GET_TAG_LODING',
            loading: true
        })

        axios.get(url).then(res => {
            dispatch({
                type: 'GET_TAG',
                tags: res.data,
                loading: false
            })
        }).catch(err => {

        })
    }
}

// 删除用户的一个标签
export const deleteTag = (user_id, tag_name) => {
    const url = `/delete_tag?user_id=${user_id}&tag_name=${tag_name}`;
    return dispatch => {
        axios.get(url).then(res => {
            console.log(res)
            if (res.data.code == true) {
                message.success('删除成功!')
                dispatch(getTag(user_id))
            } else if (res.data.code == 'err') {
                message.warn('出错了')
            }
        }).catch(err => {

        })
    }
}

// 获取一个标签具体的信息
export const getTagItemInfo = (user_id, tag_name) => {
    const url = `/get_user_tag_info?user_id=${user_id}&tag_name=${tag_name}`;
    return dispatch => {
        dispatch({
            type: 'GET_TAG_ITEM_INFO_LOAD'
        })
        axios.get(url).then(res => {
            console.log(res)
            dispatch({
                type: 'GET_TAG_ITEM_INFO',
                tagItemInfo: res.data
            })
        }).catch(err => {

        })
    }
}

// 向一个标签里面增加歌曲
export const addUserTagInfo = (user_id, tag_name, song_id) => {
    const url = `/add_user_tag_info?user_id=${user_id}&tag_name=${tag_name}&song_id=${song_id}`;
    return dispatch => {
        axios.get(url).then(res => {
            if (res.data.code) {
                message.success('添加成功')
            }
        }).then(() => {
            getTagItemInfo(user_id, tag_name)
        })
    }
}
// 获取歌单
export const getSongList = (user_id) => {
    const url = `/get_user_song_list?user_id=${user_id}`;
    return dispatch => {
        dispatch({
            type: 'GET_SONG_SHEET_LOAD',
            isloading: true
        })
        axios.get(url).then(res => {
            console.log(res.data)
            if (res.status == 200) {
                dispatch({
                    type: 'GET_SONG_SHEET',
                    data: res.data,
                    isloading: false
                })
            }
        })
    }
}
// 获取一个歌单的内容
export const getSongSheetDetail = (user_id,song_sheet_name) => {
    var url = `/get_song_list_info?user_id=${user_id}&song_sheet_name=${song_sheet_name}`;
    return dispatch => {
        dispatch({
            type: 'GET_SONG_SHEET_INFO_LOAD',
            loading: true
        })
        axios.get(url).then(res => {
            console.log(res)
            if(res.status == 200){
                dispatch({
                    type: 'GET_SONG_SHEET_INFO',
                    data: res.data,
                    loading: false
                })
            }
            
        }).catch(err => {

        })
    }
}

// 删除歌单
export const deleteSongSheet = (user_id, song_sheet_name) => {
    const url = `/delete_song_sheet?user_id=${user_id}&song_sheet_name=${song_sheet_name}`;
    return dispatch => {
        axios.get(url).then(res => {
            console.log(res)
            if (res.data.code == true) {
                message.success('删除成功!')
                dispatch(getSongList(user_id))
            } else if (res.data.code == 'err') {
                message.warn('出错了')
            }
        }).catch(err => {

        })
    }
}

// 创建歌单
export const addSongList = (user_id, song_sheet_name) => {
    const url = `/add_song_list?user_id=${user_id}&song_sheet_name=${song_sheet_name}`;
    return dispatch => {
        axios.get(url).then(res => {
            console.log(res)
            if (res.data.code) {
                message.success('创建歌单成功')
            }
        }).then(() => {
            dispatch(getSongList(user_id))
        })
    }
}

// 往一个歌单里面添加歌曲
export const addSongSheetInfo = (user_id, song_sheet_name, song_id) => {
    const url = `/add_user_song_list_info?user_id=${user_id}&song_sheet_name=${song_sheet_name}&song_id=${song_id}`;
    return dispatch => {
        dispatch({
            type: 'ADD_SONG_SHEET_INFO_LOAD',
            isloading: true
        })
        axios.get(url).then(res => {
            console.log(res)
            if (res.data.code) {
                message.success('添加歌曲成功')
            }
        }).catch(err => {
            console.log(err)
        })
    }
}


// 添加播放记录
export const addRecord = (user_id, song_id, type2) => {
    const url = `/add_record?user_id=${user_id}&song_id=${song_id}&type2=${type2}`;
    return dispatch => {
        axios.get(url).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
    }
}

export const login = (user_id, password) => {
    var url = `/login?user_id=${user_id}&password=${password}`;
    return dispatch => {
        axios.get(url).then(res => {
            if (res.data.code === true) {
                message.success('登陆成功');
                dispatch({
                    type: 'LOAD_SUC',
                    userId: user_id
                })
                window.location.hash = '/'
            }else if(res.data.code === 0){
                message.error(`不存在${user_id}用户！`)
            }else if(res.data.code === '密码错误'){
                message.warn('密码错误')
            }
        })
    }
}


export const isLogin = (user_id) => {
    var url = `/is_login?user_id=${user_id}`
    axios.get(url).then(res => {
        if (res.data.code === true) {
            return true;
        } else {
            return false;
        }
    })
}

export const register = (user_id,password,email) => {
    var url = `/register?user_id=${user_id}&password=${password}&email=${email}`;
    axios.get(url).then(res => {
        if (res.data.code === true) {
            message.success('注册成功')
            window.location.hash = '/login'
        } else if(res.data.code === '账号重复请重试') {
            message.warn('用户名已被占用！')
            return false;
        }
    })
}

export const updateUser = () => {

}