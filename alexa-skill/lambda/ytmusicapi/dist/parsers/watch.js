"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTabBrowseId = exports.parseWatchPlaylist = void 0;
const _1 = require(".");
const songs_1 = require("./songs");
function parseWatchPlaylist(results) {
    const tracks = [];
    const PPVWR = 'playlistPanelVideoWrapperRenderer';
    const PPVR = 'playlistPanelVideoRenderer';
    for (let result of results) {
        let counterpart = null;
        if (PPVWR in result) {
            counterpart =
                result[PPVWR]['counterpart'][0]['counterpartRenderer'][PPVR];
            result = result[PPVWR]['primaryRenderer'];
        }
        if (!(PPVR in result)) {
            continue;
        }
        const data = result['playlistPanelVideoRenderer'];
        if ('unplayableText' in data) {
            continue;
        }
        const track = parseWatchTrack(data);
        if (counterpart) {
            track['counterpart'] = parseWatchTrack(counterpart);
        }
        tracks.push(track);
    }
    return tracks;
}
exports.parseWatchPlaylist = parseWatchPlaylist;
function parseWatchTrack(data) {
    let [feedbackTokens, likeStatus] = [null, null];
    const _ = (0, _1.nav)(data, _1.MENU_ITEMS);
    if (_) {
        for (const item of _) {
            if (_1.TOGGLE_MENU in item) {
                const service = item[_1.TOGGLE_MENU]['defaultServiceEndpoint'];
                if ('feedbackEndpoint' in service) {
                    feedbackTokens = (0, songs_1.parseSongMenuTokens)(item);
                }
                if ('likeEndpoint' in service) {
                    likeStatus = (0, songs_1.parseLikeStatus)(service);
                }
            }
        }
    }
    const songInfo = (0, songs_1.parseSongRuns)(data['longBylineText']['runs']);
    const track = Object.assign({ videoId: data['videoId'], title: (0, _1.nav)(data, _1.TITLE_TEXT), length: (0, _1.nav)(data, ['lengthText', 'runs', 0, 'text'], null), thumbnail: (0, _1.nav)(data, _1.THUMBNAIL), feedbackTokens: feedbackTokens, likeStatus: likeStatus }, songInfo);
    return track;
}
function getTabBrowseId(watchNextRenderer, tab_id) {
    if (!('unselectable' in watchNextRenderer['tabs'][tab_id]['tabRenderer'])) {
        return watchNextRenderer['tabs'][tab_id]['tabRenderer']['endpoint']['browseEndpoint']['browseId'];
    }
    else {
        return null;
    }
}
exports.getTabBrowseId = getTabBrowseId;
