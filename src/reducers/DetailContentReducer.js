import {initialState} from '../store';
// var user_id = req.query.user_id || null;
// var tag_name = req.query.tag_name||null;
// var song_id =req.query.song_id||null;

function DetailContentReducer(  state = initialState.detail, action   ) {
    switch (action.type) {

        case "GET_TAG_CONTENT":
            return state = Object.assign({},
                state,
                {
                    detailContent: action.detailContent
                }
            )

        break;


    }
}



export default DetailContentReducer;