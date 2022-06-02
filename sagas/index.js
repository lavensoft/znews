import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {all, fork} from 'redux-saga/effects';

import * as Articles from './Articles'; 
import * as Bookmarks from './Bookmarks';
import * as Settings from './Settings';
import * as Users from './Users';
import * as RSS from './RSS';
import * as Topics from './Topics';

export default function* rootSaga() {
  yield all([
    fork(Articles.rootSaga),
    fork(Bookmarks.rootSaga),
    fork(Settings.rootSaga),
    fork(Users.rootSaga),
    fork(RSS.rootSaga),
    fork(Topics.rootSaga),
  ]);
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const reducer = combineReducers({
  articles: Articles.reducer,
  bookmarks: Bookmarks.reducer,
  settings: Settings.reducer,
  users: Users.reducer,
  rss: RSS.reducer,
  topics: Topics.reducer,
})

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(rootSaga)

export {
    store
}
