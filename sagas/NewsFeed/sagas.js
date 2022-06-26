import { call, put, takeLatest } from 'redux-saga/effects'
import API from '../../api'
import Actions, {_onSuccess, _onFail} from '../actions';

function* fetchNewsFeed(action) {
  try {
    const newsfeed = yield call(API.NewsFeed.getAll);
    yield put({type: _onSuccess(Actions.newsfeed.FETCH_NEWSFEED), newsfeed: newsfeed.data});
  } catch (e) {
    yield put({type: _onFail(Actions.newsfeed.FETCH_NEWSFEED), message: e.message});
  }
}

function* refreshNewsFeed(action) {
  try {
    const newsfeed = yield call(API.NewsFeed.getAll);
    yield put({type: _onSuccess(Actions.newsfeed.REFRESH_NEWSFEED), newsfeed: newsfeed.data});
  } catch (e) {
    yield put({type: _onFail(Actions.newsfeed.REFRESH_NEWSFEED), message: e.message});
  }
}

function* rootSaga() {
  yield takeLatest(Actions.newsfeed.FETCH_NEWSFEED, fetchNewsFeed);
  yield takeLatest(Actions.newsfeed.REFRESH_NEWSFEED, refreshNewsFeed);
}

export default rootSaga;