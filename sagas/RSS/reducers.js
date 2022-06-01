import actions from './actions';
import { _onSuccess, _onFailed } from '../actions';

const initialState = {
    isLoading: false,
    data: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_ALL_RSS:
            return {
                ...state,
                isLoading: true
            }
        case _onSuccess(actions.FETCH_ALL_RSS):
            return {
                ...state,
                isLoading: false,
                data: action.rsses
            }
        default:
            return state
    }
}
  