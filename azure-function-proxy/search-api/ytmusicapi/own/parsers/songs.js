"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLikeStatus = exports.parseSongMenuTokens = exports.parseSongAlbum = exports.parseSongRuns = exports.parseSongArtistsRuns = exports.parseSongArtists = void 0;
const _1 = require(".");
const helpers_1 = require("../helpers");
const pyLibraryMock_1 = require("../pyLibraryMock");
const utils_1 = require("./utils");
function parseSongArtists(data, index) {
    const flexItem = (0, utils_1.getFlexColumnItem)(data, index);
    if (!flexItem) {
        return null;
    }
    else {
        const runs = flexItem['text']['runs'];
        return parseSongArtistsRuns(runs);
    }
}
exports.parseSongArtists = parseSongArtists;
function parseSongArtistsRuns(runs) {
    const artists = [];
    for (let j = 0; j < Math.trunc(runs.length / 2) + 1; j++) {
        artists.push({
            name: runs[j * 2]['text'],
            id: (0, _1.nav)(runs[j * 2], _1.NAVIGATION_BROWSE_ID, null),
        });
    }
    return artists;
}
exports.parseSongArtistsRuns = parseSongArtistsRuns;
function parseSongRuns(runs) {
    const parsed = { artists: [] };
    for (const [i, run] of runs.entries()) {
        if (i % 2 == 0)
            continue;
        const text = run['text'];
        if (run['navigationEndpoint']) {
            const item = {
                name: text,
                id: (0, _1.nav)(run, _1.NAVIGATION_BROWSE_ID, null),
            };
            if ((item.id && item.id.startsWith('MPRE')) || item.id.release_detail) {
                parsed['album'] = item;
            }
            else {
                parsed['artists'].push(item);
            }
        }
        else {
            if (pyLibraryMock_1.re.match(/^\d([^ ])* [^ ]*$/, text)) {
                parsed['views'] = text.split(' ')[0];
            }
            else if (pyLibraryMock_1.re.match(/^(\d+:)*\d+:\d+$/, text)) {
                parsed['duration'] = text;
                parsed['duration_seconds'] = (0, helpers_1.parseDuration)(text);
            }
            else if (pyLibraryMock_1.re.match(/^\d{4}$/, text)) {
                parsed['year'] = text;
            }
            else {
                // artist without id
                parsed['artists'].push({ name: text, id: null });
            }
        }
    }
    return parsed;
}
exports.parseSongRuns = parseSongRuns;
function parseSongAlbum(data, index) {
    const flexItem = (0, utils_1.getFlexColumnItem)(data, index);
    return !flexItem
        ? null
        : {
            name: (0, utils_1.getItemText)(data, index),
            id: (0, utils_1.getBrowseId)(flexItem, 0),
        };
}
exports.parseSongAlbum = parseSongAlbum;
function parseSongMenuTokens(item) {
    const toggleMenu = item[_1.TOGGLE_MENU];
    const serviceType = toggleMenu['defaultIcon']['iconType'];
    let libraryAddToken = (0, _1.nav)(toggleMenu, ['defaultServiceEndpoint', ..._1.FEEDBACK_TOKEN], null);
    let libraryRemoveToken = (0, _1.nav)(toggleMenu, ['toggledServiceEndpoint', ..._1.FEEDBACK_TOKEN], null);
    if (serviceType == 'LIBRARY_REMOVE') {
        // swap if already in library
        [libraryAddToken, libraryRemoveToken] = [
            libraryRemoveToken,
            libraryAddToken,
        ];
    }
    return { add: libraryAddToken, remove: libraryRemoveToken };
}
exports.parseSongMenuTokens = parseSongMenuTokens;
function parseLikeStatus(service) {
    const status = ['LIKE', 'INDIFFERENT'];
    return status[status.indexOf(service['likeEndpoint']['status']) - 1];
}
exports.parseLikeStatus = parseLikeStatus;
