import { call, put, takeLatest } from 'redux-saga/effects'
import API from '../../api'
import Actions, {_onSuccess, _onFail} from '../actions';

function* fetchAllArticles(action) {
  const { page } = action;

  try {
    const articles = yield call(API.Articles.getAt, page);
    yield put({type: _onSuccess(Actions.articles.FETCH_ALL_ARTICLES), articles: articles.data});
  } catch (e) {
    yield put({type: _onFail(Actions.articles.FETCH_ALL_ARTICLES), message: e.message});
  }
}

function* fetchAllArticlesOfTopic(action) {
  const { page, topic } = action;

  try {
    const articles = yield call(API.Articles.getAtWithTopic, topic, page);
    yield put({type: _onSuccess(Actions.articles.FETCH_ALL_ARTICLES_OF_TOPIC), articles: articles.data});
  } catch (e) {
    yield put({type: _onFail(Actions.articles.FETCH_ALL_ARTICLES_OF_TOPIC), message: e.message});
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
  const {keywords, page} = action.payload;

  try {
    const articles = yield call(API.Articles.search, keywords, page);
    yield put({type: _onSuccess(Actions.articles.SEARCH_ARTICLES), articles: articles.data, keywords, page});
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

function* refreshArticlesOfTopic(action) {
  const { topic } = action;

  try {
    const articles = yield call(API.Articles.getAtWithTopic, topic, 0);
    yield put({type: _onSuccess(Actions.articles.REFRESH_ARTICLES_OF_TOPIC), articles: articles.data});
  } catch (e) {
    yield put({type: _onFail(Actions.articles.REFRESH_ARTICLES_OF_TOPIC), message: e.message});
  }
}

function* refreshSearchArticles(action) {
  const {keywords} = action.payload;

  try {
    const articles = yield call(API.Articles.search, keywords, 0);
    yield put({type: _onSuccess(Actions.articles.REFRESH_SEARCH_ARTICLES), articles: articles.data, keywords});
  } catch (e) {
    yield put({type: _onFail(Actions.articles.REFRESH_SEARCH_ARTICLES), message: e.message});
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

function* saveState(action) {
  const {payload, state} = action;

  try {
    const response = yield call(API.Articles.saveState, payload.articleData, state);
    yield put({type: _onSuccess(Actions.articles.SAVE_ARTICLE_STATE), response: response.data});
  } catch (e) {
    yield put({type: _onFail(Actions.articles.SAVE_ARTICLE_STATE), message: e.message});
  }
}

function* fetchStates(action) {
  try {
    const states = yield call(API.Articles.getAllState);
    yield put({type: _onSuccess(Actions.articles.FETCH_ARTICLES_STATE), states: states.data});
  } catch (e) {
    yield put({type: _onFail(Actions.articles.FETCH_ARTICLES_STATE), message: e.message});
  }
}

function* rootSaga() {
  yield takeLatest(Actions.articles.FETCH_ALL_ARTICLES, fetchAllArticles);
  yield takeLatest(Actions.articles.FETCH_ALL_ARTICLES_OF_TOPIC, fetchAllArticlesOfTopic);

  yield takeLatest(Actions.articles.REFRESH_ARTICLES, refreshArticles);
  yield takeLatest(Actions.articles.REFRESH_ARTICLES_OF_TOPIC, refreshArticlesOfTopic);
  yield takeLatest(Actions.articles.REFRESH_SEARCH_ARTICLES, refreshSearchArticles);

  yield takeLatest(Actions.articles.SEARCH_ARTICLES, searchArticles);

  yield takeLatest(Actions.articles.FETCH_STORIES, fetchStories);

  yield takeLatest(Actions.articles.UPDATE_ARTICLES_VIEW, updateArticlesView);
  yield takeLatest(Actions.articles.SAVE_ARTICLE_STATE, saveState);
  yield takeLatest(Actions.articles.FETCH_ARTICLES_STATE, fetchStates);
}

export default rootSaga;