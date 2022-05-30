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
        case actions.FETCH_ALL_ARTICLES:
            return {
                ...state,
                isLoading: true,
                page: action.page
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
        case actions.UPDATE_ARTICLES_VIEW:
            return {
                ...state,
            }
        case _onSuccess(actions.UPDATE_ARTICLES_VIEW):
            return {
                ...state,
            }
        case actions.SAVE_ARTICLE_STATE:
            return {
                ...state,
            }
        case _onSuccess(actions.SAVE_ARTICLE_STATE):
            return {
                ...state,
            }
        case actions.FETCH_ARTICLES_STATE:
            return {
                ...state,
                isLoading: true
            }
        case _onSuccess(actions.FETCH_ARTICLES_STATE):
            return {
                ...state,
                isLoading: false,
                articlesState: action.states
            }
        default:
            return state
    }
}
  