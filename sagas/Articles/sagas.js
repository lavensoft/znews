import { call, put, takeLatest } from 'redux-saga/effects'
import API from '../../api'
import Actions, {_onSuccess, _onFail} from '../actions';

function* fetchAllArticles(action) {
  const {page} = action;

  try {
    const articles = yield call(API.Articles.getAt, page);
    yield put({type: _onSuccess(Actions.articles.FETCH_ALL_ARTICLES), articles: articles.data});
  } catch (e) {
    yield put({type: _onFail(Actions.articles.FETCH_ALL_ARTICLES), message: e.message});
  }
}

function* fetchStories(action) {
  try {
    const stories = yield call(API.Articles.getStories);
    yield put({type: _onSuccess(Actions.articles.FETCH_STORIES), stories: stories.data});
  } catch (e) {
    yield put({type: _onFail(Actions.articles.FETCH_STORIES), message: e.message});
  }
}

function* searchArticles(action) {
  const {keywords} = action;

  try {
    const articles = yield call(API.Articles.search, keywords);
    yield put({type: _onSuccess(Actions.articles.SEARCH_ARTICLES), articles: articles.data});
  } catch (e) {
    yield put({type: _onFail(Actions.articles.SEARCH_ARTICLES), message: e.message});
  }
}

function* refreshArticles(action) {
  try {
    const articles = yield call(API.Articles.getAt, 0);
    yield put({type: _onSuccess(Actions.articles.REFRESH_ARTICLES), articles: articles.data});
  } catch (e) {
    yield put({type: _onFail(Actions.articles.REFRESH_ARTICLES), message: e.message});
  }
}

function* updateArticlesView(action) {
  const {id} = action;

  try {
    const response = yield call(API.Articles.updateView, id);
    yield put({type: _onSuccess(Actions.articles.UPDATE_ARTICLES_VIEW), response: response.data});
  } catch (e) {
    yield put({type: _onFail(Actions.articles.UPDATE_ARTICLES_VIEW), message: e.message});
  }
}

function* rootSaga() {
  yield takeLatest(Actions.articles.FETCH_ALL_ARTICLES, fetchAllArticles);
  yield takeLatest(Actions.articles.REFRESH_ARTICLES, refreshArticles);
  yield takeLatest(Actions.articles.SEARCH_ARTICLES, searchArticles);
  yield takeLatest(Actions.articles.FETCH_STORIES, fetchStories);
  yield takeLatest(Actions.articles.UPDATE_ARTICLES_VIEW, updateArticlesView);
}

export default rootSaga;