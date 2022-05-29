import { call, put, takeLatest } from 'redux-saga/effects'
import API from '../../api'
import Actions, {_onSuccess, _onFail} from '../actions';

function* fetchAll(action) {
  try {
    const users = yield call(API.Users.getAll);
    yield put({type: _onSuccess(Actions.users.FETCH_ALL_USERS), payload: users.data});
  } catch (e) {
    yield put({type: _onFail(Actions.users.FETCH_ALL_USERS), message: e.message});
  }
}

function* rootSaga() {
  yield takeLatest(Actions.users.FETCH_ALL_USERS, fetchAll);
}

export default rootSaga;