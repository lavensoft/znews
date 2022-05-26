import actions from './actions';
import { _onSuccess, _onFailed } from '../actions';

const initialState = {
    isLoading: false,
    data: [],
    page: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_BOOKMARKS:
            return {
                ...state,
                isLoading: true,
            }
        case _onSuccess(actions.FETCH_BOOKMARKS):
            return {
                ...state,
                isLoading: false,
                data: action.bookmarks
            }
        case actions.REFRESH_BOOKMARKS:
            return {
                ...state,
                isLoading: true,
                page: 0
            }
        case _onSuccess(actions.REFRESH_BOOKMARKS):
            return {
                ...state,
                isLoading: false,
                data: action.bookmarks
            }
        case actions.ADD_BOOKMARKS:
            return {
                ...state,
                isLoading: true
            }
        case _onSuccess(actions.ADD_BOOKMARKS):
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}
  