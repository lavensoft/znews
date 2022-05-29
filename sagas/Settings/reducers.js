import actions from './actions';
import { _onSuccess, _onFailed } from '../actions';

const initialState = {
    isLoading: false,
    data: [],
    page: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_SETTINGS:
            return {
                ...state,
                isLoading: true,
            }
        case _onSuccess(actions.FETCH_SETTINGS):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case actions.UPDATE_SETTING:
            return {
                ...state,
                isLoading: true,
            }
        case _onSuccess(actions.UPDATE_SETTING):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case actions.SET_DEFAULT_SETTINGS:
            return {
                ...state,
                isLoading: true,
            }
        case _onSuccess(actions.SET_DEFAULT_SETTINGS):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        default:
            return state
    }
}
  