
import {
    GET_NEWS, GET_NEWS_SUCCESS
} from '../actions'

function customer(state = {
    data: [],
    loading: false
}, action) {
    switch (action.type) {
        case GET_NEWS:
            return {
                ...state,
                loading: true,
            }
        case GET_NEWS_SUCCESS:
            return {
                ...state,
                data: action.news,
                loading: false
            }
        default:
            return state
    }
}

export default customer;