import actions from './actions';
import { _onSuccess, _onFailed } from '../actions';

const initialState = {
    isLoading: false,
    data: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_NEWSFEED:
            return {
                ...state,
                isLoading: true,
            }
        case _onSuccess(actions.FETCH_NEWSFEED):
            return {
                ...state,
                isLoading: false,
                data: action.newsfeed
            }
        case actions.REFRESH_NEWSFEED:
            return {
                ...state,
                isLoading: true,
            }
        case _onSuccess(actions.REFRESH_NEWSFEED):
            return {
                ...state,
                isLoading: false,
                data: action.newsfeed
            }
        default:
            return state
    }
}
  