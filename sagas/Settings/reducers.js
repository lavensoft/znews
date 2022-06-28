import actions from './actions';
import { _onSuccess, _onFailed } from '../actions';

const initialState = {
    isLoading: false,
    data: [],
    page: 0,
    contentScores: []
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
        case actions.ADD_CONTENT_SCORE:
            return {
                ...state,
                isLoading: true,
            }
        case _onSuccess(actions.ADD_CONTENT_SCORE):
            return {
                ...state,
                isLoading: false,
                contentScores: action.payload
            }
        case actions.FETCH_CONTENT_SCORE:
            return {
                ...state,
                isLoading: true,
            }
        case _onSuccess(actions.FETCH_CONTENT_SCORE):
            return {
                ...state,
                isLoading: false,
                contentScores: action.payload
            }
        default:
            return state
    }
}
  