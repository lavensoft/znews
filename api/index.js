import ArticlesAPI from './Articles';
import BookmarksAPI from './Bookmarks';
import SettingsAPI from './Settings';
import UsersAPI from './Users';
import FcmTokensAPI from './FcmTokens';

const API = {
    Articles: ArticlesAPI,
    Bookmarks: BookmarksAPI,
    Settings: SettingsAPI,
    Users: UsersAPI,
    FcmTokens: FcmTokensAPI
}

export default API;