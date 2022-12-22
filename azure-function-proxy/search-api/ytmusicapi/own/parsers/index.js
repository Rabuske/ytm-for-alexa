"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nav = exports.MTRIR = exports.MRLIR = exports.CATEGORY_PARAMS = exports.CATEGORY_TITLE = exports.RELOAD_CONTINUATION = exports.BADGE_LABEL = exports.FEEDBACK_TOKEN = exports.THUMBNAIL_CROPPED = exports.THUMBNAIL_RENDERER = exports.THUMBNAILS = exports.THUMBNAIL = exports.SUBTITLE3 = exports.SUBTITLE2 = exports.SUBTITLE = exports.TEXT_RUN_TEXT = exports.TEXT_RUN = exports.TEXT_RUNS = exports.TITLE_TEXT = exports.TITLE = exports.FRAMEWORK_MUTATIONS = exports.CAROUSEL_TITLE = exports.CAROUSEL_CONTENTS = exports.IMMERSIVE_CAROUSEL = exports.CAROUSEL = exports.DESCRIPTION = exports.DESCRIPTION_SHELF = exports.HEADER_DETAIL = exports.NAVIGATION_VIDEO_TYPE = exports.NAVIGATION_WATCH_PLAYLIST_ID = exports.NAVIGATION_PLAYLIST_ID = exports.NAVIGATION_VIDEO_ID = exports.PAGE_TYPE = exports.NAVIGATION_BROWSE_ID = exports.NAVIGATION_BROWSE = exports.PLAY_BUTTON = exports.TOGGLE_MENU = exports.MENU_SERVICE = exports.MENU_LIKE_STATUS = exports.MENU_ITEMS = exports.MENU = exports.GRID_ITEMS = exports.GRID = exports.MUSIC_SHELF = exports.ITEM_SECTION = exports.SECTION_LIST_ITEM = exports.SECTION_LIST = exports.SINGLE_COLUMN_TAB = exports.TAB_CONTENT = exports.RUN_TEXT = void 0;
exports.findObjectByKey = void 0;
//Equivalent to __init__.py
exports.RUN_TEXT = ['runs', 0, 'text'];
exports.TAB_CONTENT = ['tabs', 0, 'tabRenderer', 'content'];
exports.SINGLE_COLUMN_TAB = [
    'contents',
    'singleColumnBrowseResultsRenderer',
    ...exports.TAB_CONTENT,
];
exports.SECTION_LIST = ['sectionListRenderer', 'contents'];
exports.SECTION_LIST_ITEM = [
    'sectionListRenderer',
    'contents',
    0,
];
exports.ITEM_SECTION = ['itemSectionRenderer', 'contents', 0];
exports.MUSIC_SHELF = ['musicShelfRenderer'];
exports.GRID = ['gridRenderer'];
exports.GRID_ITEMS = [...exports.GRID, 'items'];
exports.MENU = ['menu', 'menuRenderer'];
exports.MENU_ITEMS = [...exports.MENU, 'items'];
exports.MENU_LIKE_STATUS = [
    ...exports.MENU,
    ...['topLevelButtons', 0, 'likeButtonRenderer', 'likeStatus'],
];
exports.MENU_SERVICE = [
    'menuServiceItemRenderer',
    'serviceEndpoint',
];
exports.TOGGLE_MENU = 'toggleMenuServiceItemRenderer';
exports.PLAY_BUTTON = [
    'overlay',
    'musicItemThumbnailOverlayRenderer',
    'content',
    'musicPlayButtonRenderer',
];
exports.NAVIGATION_BROWSE = [
    'navigationEndpoint',
    'browseEndpoint',
];
exports.NAVIGATION_BROWSE_ID = [...exports.NAVIGATION_BROWSE, 'browseId'];
exports.PAGE_TYPE = [
    'browseEndpointContextSupportedConfigs',
    'browseEndpointContextMusicConfig',
    'pageType',
];
exports.NAVIGATION_VIDEO_ID = [
    'navigationEndpoint',
    'watchEndpoint',
    'videoId',
];
exports.NAVIGATION_PLAYLIST_ID = [
    'navigationEndpoint',
    'watchEndpoint',
    'playlistId',
];
exports.NAVIGATION_WATCH_PLAYLIST_ID = [
    'navigationEndpoint',
    'watchPlaylistEndpoint',
    'playlistId',
];
exports.NAVIGATION_VIDEO_TYPE = [
    'watchEndpoint',
    'watchEndpointMusicSupportedConfigs',
    'watchEndpointMusicConfig',
    'musicVideoType',
];
exports.HEADER_DETAIL = ['header', 'musicDetailHeaderRenderer'];
exports.DESCRIPTION_SHELF = ['musicDescriptionShelfRenderer'];
exports.DESCRIPTION = ['description', ...exports.RUN_TEXT];
exports.CAROUSEL = ['musicCarouselShelfRenderer'];
exports.IMMERSIVE_CAROUSEL = [
    'musicImmersiveCarouselShelfRenderer',
];
exports.CAROUSEL_CONTENTS = [...exports.CAROUSEL, 'contents'];
exports.CAROUSEL_TITLE = [
    'header',
    'musicCarouselShelfBasicHeaderRenderer',
    'title',
    'runs',
    0,
];
exports.FRAMEWORK_MUTATIONS = [
    'frameworkUpdates',
    'entityBatchUpdate',
    'mutations',
];
exports.TITLE = ['title', 'runs', 0];
exports.TITLE_TEXT = ['title', ...exports.RUN_TEXT];
exports.TEXT_RUNS = ['text', 'runs'];
exports.TEXT_RUN = [...exports.TEXT_RUNS, 0];
exports.TEXT_RUN_TEXT = [...exports.TEXT_RUN, 'text'];
exports.SUBTITLE = ['subtitle', ...exports.RUN_TEXT];
exports.SUBTITLE2 = ['subtitle', 'runs', 2, 'text'];
exports.SUBTITLE3 = ['subtitle', 'runs', 4, 'text'];
exports.THUMBNAIL = ['thumbnail', 'thumbnails'];
exports.THUMBNAILS = [
    'thumbnail',
    'musicThumbnailRenderer',
    ...exports.THUMBNAIL,
];
exports.THUMBNAIL_RENDERER = [
    'thumbnailRenderer',
    'musicThumbnailRenderer',
    ...exports.THUMBNAIL,
];
exports.THUMBNAIL_CROPPED = [
    'thumbnail',
    'croppedSquareThumbnailRenderer',
    exports.THUMBNAIL,
];
exports.FEEDBACK_TOKEN = ['feedbackEndpoint', 'feedbackToken'];
exports.BADGE_LABEL = [
    'badges',
    0,
    'musicInlineBadgeRenderer',
    'accessibilityData',
    'accessibilityData',
    'label',
];
exports.RELOAD_CONTINUATION = [
    'continuations',
    0,
    'reloadContinuationData',
    'continuation',
];
exports.CATEGORY_TITLE = [
    'musicNavigationButtonRenderer',
    'buttonText',
    ...exports.RUN_TEXT,
];
exports.CATEGORY_PARAMS = [
    'musicNavigationButtonRenderer',
    'clickCommand',
    'browseEndpoint',
    'params',
];
exports.MRLIR = 'musicResponsiveListItemRenderer';
exports.MTRIR = 'musicTwoRowItemRenderer';
var nav_1 = require("@codyduong/nav");
Object.defineProperty(exports, "nav", { enumerable: true, get: function () { return nav_1.nav; } });
//These implementations are sketch...
function findObjectByKey(objectList, key, nested, isKey = false) {
    if (objectList) {
        for (let item of objectList) {
            if (nested) {
                item = item[nested];
            }
            if (key in item) {
                return isKey ? item[key] : item;
            }
        }
    }
    return null;
}
exports.findObjectByKey = findObjectByKey;
/** @deprecated Unused? */
// export function findObjectsByKey<T extends Array<Record<string, any>>>(
//   objectList: T | null,
//   key: string,
//   nested?: string
// ): Array<any> | null {
//   if (objectList) {
//     const objects = [];
//     for (let item of objectList) {
//       if (nested) {
//         item = item[nested];
//       }
//       if (key in item) {
//         objects.push(item);
//       }
//     }
//     return objects;
//   }
//   return null;
// }
