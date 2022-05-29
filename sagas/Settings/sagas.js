import { call, put, takeLatest } from 'redux-saga/effects'
import Actions, {_onSuccess, _onFail} from '../actions';
import {
    ToastAndroid,
    Platform,
    AlertIOS,
  } from 'react-native';
import API from '../../api';

function* fetchAll(action) {
    try {
        const response = yield call(API.Settings.getAll, action.payload);
        yield put({type: _onSuccess(Actions.settings.FETCH_SETTINGS), payload: response.data});
    } catch (e) {
        yield put({type: _onFail(Actions.settings.FETCH_SETTINGS), message: e.message});
    }
}

function* update(action) {
    const {key, value} = action.payload;

    try {
        const response = yield call(API.Settings.set, key, value);
        yield put({type: _onSuccess(Actions.settings.UPDATE_SETTING), payload: response.data});
    } catch (e) {
        yield put({type: _onFail(Actions.settings.UPDATE_SETTING), message: e.message});
    }
}

function* restoreDefault(action) {
    try {
        const response = yield call(API.Settings.setDefault);
        yield put({type: _onSuccess(Actions.settings.SET_DEFAULT_SETTINGS), payload: response.data});
    } catch (e) {
        yield put({type: _onFail(Actions.settings.SET_DEFAULT_SETTINGS), message: e.message});
    }
}

function* rootSaga() {
  yield takeLatest(Actions.settings.FETCH_SETTINGS, fetchAll);
  yield takeLatest(Actions.settings.UPDATE_SETTING, update);
  yield takeLatest(Actions.settings.SET_DEFAULT_SETTINGS, restoreDefault);
}

export default rootSaga;