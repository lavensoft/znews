import actions from './actions';
import { _onSuccess, _onFailed } from '../actions';

const initialState = {
    isLoading: false,
    data: [],
    searchData: [],
    page: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_ALL_ARTICLES:
            return {
                ...state,
                isLoading: true,
                page: state.page + 1
            }
        case _onSuccess(actions.FETCH_ALL_ARTICLES):
            return {
                ...state,
                isLoading: false,
                data: [...state.data, ...action.articles]
            }
        case actions.REFRESH_ARTICLES:
            return {
                ...state,
                isLoading: true,
                page: 0
            }
        case _onSuccess(actions.REFRESH_ARTICLES):
            return {
                ...state,
                isLoading: false,
                data: action.articles
            }
        case actions.FETCH_STORIES:
            return {
                ...state,
                isLoading: true
            }
        case _onSuccess(actions.FETCH_STORIES):
            return {
                ...state,
                isLoading: false,
                stories: action.stories
            }
        case actions.SEARCH_ARTICLES:
            return {
                ...state,
            }
        case _onSuccess(actions.SEARCH_ARTICLES):
            return {
                ...state,
                searchData: action.articles
            }
        default:
            return state
    }
}
  