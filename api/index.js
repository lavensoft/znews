import ArticlesAPI from './Articles';
import BookmarksAPI from './Bookmarks';
import SettingsAPI from './Settings';
import UsersAPI from './Users';
import FcmTokensAPI from './FcmTokens';
import RSSAPI from './RSS';
import AnalyticsAPI from './Analytics';
import TopicsAPI from './Topics';
import NewsFeedAPI from './NewsFeed';

const API = {
    Articles: ArticlesAPI,
    Bookmarks: BookmarksAPI,
    Settings: SettingsAPI,
    Users: UsersAPI,
    FcmTokens: FcmTokensAPI,
    RSS: RSSAPI,
    Analytics: AnalyticsAPI,
    Topics: TopicsAPI,
    NewsFeed: NewsFeedAPI
}

export default API;