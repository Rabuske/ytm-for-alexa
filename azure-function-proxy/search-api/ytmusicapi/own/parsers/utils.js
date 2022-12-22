"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDotSeperatorIndex = exports.validatePlaylistId = exports.getBrowseId = exports.getFixedColumnItem = exports.getFlexColumnItem = exports.getItemText = exports.parseMenuPlaylists = void 0;
const nav_1 = require("@codyduong/nav");
const index_1 = require("./index");
function parseMenuPlaylists(data, result) {
    var _a;
    // What... @CODYDUONG discovery
    // const watchMenu = findObjectByKey(
    //   nav(data, MENU_ITEMS),
    //   'menuNavigationItemRenderer'
    // );
    const watchMenu = (_a = (0, nav_1.nav)(data, index_1.MENU_ITEMS)) === null || _a === void 0 ? void 0 : _a['menuNavigationItemRenderer'];
    if (watchMenu) {
        for (const item of watchMenu.map((x) => x['menuNavigationItemRenderer'])) {
            const icon = (0, nav_1.nav)(item, ['icon', 'iconType']);
            let watchKey;
            if (icon == 'MUSIC_SHUFFLE') {
                watchKey = 'shuffleId';
            }
            else if (icon == 'MIX') {
                watchKey = 'radioId';
            }
            else {
                continue;
            }
            let watchId = (0, nav_1.nav)(item, ['navigationEndpoint', 'watchPlaylistEndpoint', 'playlistId'], null);
            if (!watchId) {
                watchId = (0, nav_1.nav)(item, ['navigationEndpoint', 'watchEndpoint', 'playlistId'], null);
            }
            if (watchId) {
                result[watchKey] = watchId;
            }
        }
    }
}
exports.parseMenuPlaylists = parseMenuPlaylists;
function getItemText(item, index, run_index = 0, none_if_absent = false) {
    const column = getFlexColumnItem(item, index);
    if (!column) {
        return null;
    }
    if (none_if_absent && column['text']['runs'].length < run_index + 1) {
        return null;
    }
    return column['text']['runs'][run_index]['text'];
}
exports.getItemText = getItemText;
function getFlexColumnItem(item, index) {
    if (item['flexColumns'].length <= index ||
        !('text' in
            item['flexColumns'][index]['musicResponsiveListItemFlexColumnRenderer']) ||
        !('runs' in
            item['flexColumns'][index]['musicResponsiveListItemFlexColumnRenderer']['text'])) {
        return null;
    }
    return item['flexColumns'][index]['musicResponsiveListItemFlexColumnRenderer'];
}
exports.getFlexColumnItem = getFlexColumnItem;
function getFixedColumnItem(item, index) {
    if (!item['fixedColumns'][index]['musicResponsiveListItemFixedColumnRenderer']['text'] ||
        !item['fixedColumns'][index]['musicResponsiveListItemFixedColumnRenderer']['text']['runs'])
        return null;
    return item['fixedColumns'][index]['musicResponsiveListItemFixedColumnRenderer'];
}
exports.getFixedColumnItem = getFixedColumnItem;
function getBrowseId(item, index) {
    if (!item['text']['runs'][index]['navigationEndpoint']) {
        return null;
    }
    else {
        return (0, nav_1.nav)(item['text']['runs'][index], index_1.NAVIGATION_BROWSE_ID);
    }
}
exports.getBrowseId = getBrowseId;
function validatePlaylistId(playlistId) {
    return !(playlistId === null || playlistId === void 0 ? void 0 : playlistId.startsWith('VL'))
        ? playlistId !== null && playlistId !== void 0 ? playlistId : null
        : playlistId.slice(2);
}
exports.validatePlaylistId = validatePlaylistId;
function getDotSeperatorIndex(runs) {
    let index = runs.length;
    // cheap workaround rather than deep equality
    const indexOf = runs.findIndex((v) => v['text'] == ' • ');
    if (indexOf !== -1) {
        index = indexOf;
    }
    return index;
}
exports.getDotSeperatorIndex = getDotSeperatorIndex;
