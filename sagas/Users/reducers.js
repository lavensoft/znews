import actions from './actions';
import { _onSuccess, _onFailed } from '../actions';

const initialState = {
    isLoading: false,
    data: [],
    searchData: [],
    articlesState: [],
    page: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_ALL_USERS:
            return {
                ...state,
                isLoading: true,
            }
        case _onSuccess(actions.FETCH_ALL_USERS):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        default:
            return state
    }
}
  