import { call, put, takeLatest } from 'redux-saga/effects'
import API from '../../api'
import Actions, {_onSuccess, _onFail} from '../actions';

function* fetchAllRSS(action) {
  try {
    const rsses = yield call(API.RSS.getAll);
    yield put({type: _onSuccess(Actions.rss.FETCH_ALL_RSS), rsses: rsses.data});
  } catch (e) {
    yield put({type: _onFail(Actions.rss.FETCH_ALL_RSS), message: e.message});
  }
}

function* rootSaga() {
  yield takeLatest(Actions.rss.FETCH_ALL_RSS, fetchAllRSS);
}

export default rootSaga;