import { call, put, takeLatest } from 'redux-saga/effects'
import API from '../../api'
import Actions, {_onSuccess, _onFail} from '../actions';

function* fetchAllTopics(action) {
  try {
    const topics = yield call(API.Topics.getAll);
    yield put({type: _onSuccess(Actions.topics.FETCH_ALL_TOPICS), topics: topics.data});
  } catch (e) {
    yield put({type: _onFail(Actions.topics.FETCH_ALL_TOPICS), message: e.message});
  }
}

function* rootSaga() {
  yield takeLatest(Actions.topics.FETCH_ALL_TOPICS, fetchAllTopics);
}

export default rootSaga;