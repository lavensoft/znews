import { call, put, takeLatest } from 'redux-saga/effects'
import Actions, {_onSuccess, _onFail} from '../actions';
import {
    ToastAndroid,
    Platform,
    AlertIOS,
  } from 'react-native';
import API from '../../api';

function* saveBookmark(action) {
  const {payload} = action;

  try {
    const bookmarks = yield call(API.Bookmarks.add, payload.articleData);
    yield put({type: _onSuccess(Actions.bookmarks.ADD_BOOKMARKS), bookmarks: bookmarks.data});
  } catch (e) {
    yield put({type: _onFail(Actions.bookmarks.ADD_BOOKMARKS), message: e.message});
  }
}

function* fetchBookmark(action) {
  try {
    const bookmarks = yield call(API.Bookmarks.getAll);
    yield put({type: _onSuccess(Actions.bookmarks.FETCH_BOOKMARKS), bookmarks: bookmarks.data});
  } catch (e) {
    yield put({type: _onFail(Actions.bookmarks.FETCH_BOOKMARKS), message: e.message});
  }
}

function* refreshBookmark(action) {
  try {
    const bookmarks = yield call(API.Bookmarks.getAll);
    yield put({type: _onSuccess(Actions.bookmarks.REFRESH_BOOKMARKS), bookmarks: bookmarks.data});
  } catch (e) {
    yield put({type: _onFail(Actions.bookmarks.REFRESH_BOOKMARKS), message: e.message});
  }
}

function* rootSaga() {
  yield takeLatest(Actions.bookmarks.ADD_BOOKMARKS, saveBookmark);
  yield takeLatest(Actions.bookmarks.FETCH_BOOKMARKS, fetchBookmark);
  yield takeLatest(Actions.bookmarks.REFRESH_BOOKMARKS, refreshBookmark);
}

export default rootSaga;