import ArticlesAPI from './Articles';
import BookmarksAPI from './Bookmarks';
import SettingsAPI from './Settings';
import UsersAPI from './Users';
import FcmTokensAPI from './FcmTokens';
import RSSAPI from './RSS';

const API = {
    Articles: ArticlesAPI,
    Bookmarks: BookmarksAPI,
    Settings: SettingsAPI,
    Users: UsersAPI,
    FcmTokens: FcmTokensAPI,
    RSS: RSSAPI,
}

export default API;