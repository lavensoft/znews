import * as Articles from './Articles/actions';
import * as Bookmarks from './Bookmarks/actions';

export default {
    articles: Articles.actions,
    bookmarks: Bookmarks.actions
};

export const _onSuccess = action => action + '_SUCCESS';
export const _onFail = action => action + '_FAIL';
export const _onUnmount = action => action + '_UNMOUNT';