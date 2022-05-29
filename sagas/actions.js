import * as Articles from './Articles/actions';
import * as Bookmarks from './Bookmarks/actions';
import * as Settings from './Settings/actions';
import * as Users from './Users/actions';

export default {
    articles: Articles.actions,
    bookmarks: Bookmarks.actions,
    settings: Settings.actions,
    users: Users.actions
};

export const _onSuccess = action => action + '_SUCCESS';
export const _onFail = action => action + '_FAIL';
export const _onUnmount = action => action + '_UNMOUNT';