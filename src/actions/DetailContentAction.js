import axios from 'axios';


export const getTagContent = (user_id,tag_name) => {
    const url = `/get_user_tag_info?user_id=${user_id}&tag_name=${tag_name}`;
    return dispatch => {
        axios.get(url).then( res => {
            console.log(res)
            dispatch({
                type: 'GET_TAG_CONTENT',
                DetailContent: res
            })
        }).catch( err => {

        })
    }
}
