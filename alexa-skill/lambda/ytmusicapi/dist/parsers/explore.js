"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRanking = exports.parseChartTrending = exports.parseChartArtist = exports.parseChartSong = void 0;
const _1 = require(".");
const browsing_1 = require("./browsing");
const songs_1 = require("./songs");
const utils_1 = require("./utils");
const TRENDS = {
    ARROW_DROP_UP: 'up',
    ARROW_DROP_DOWN: 'down',
    ARROW_CHART_NEUTRAL: 'neutral',
};
function parseChartSong(data) {
    let parsed = (0, browsing_1.parseSongFlat)(data);
    parsed = Object.assign(Object.assign({}, parsed), parseRanking(data));
    return parsed;
}
exports.parseChartSong = parseChartSong;
function parseChartArtist(data) {
    const flexItem = (0, utils_1.getFlexColumnItem)(data, 1);
    let subscribers = null;
    if (subscribers) {
        subscribers = (0, _1.nav)(flexItem, _1.TEXT_RUN_TEXT).split(' ')[0];
    }
    let parsed = {
        title: (0, _1.nav)((0, utils_1.getFlexColumnItem)(data, 0), _1.TEXT_RUN_TEXT),
        browseId: (0, _1.nav)(data, _1.NAVIGATION_BROWSE_ID),
        subscribers: subscribers,
        thumbnails: (0, _1.nav)(data, _1.THUMBNAILS),
    };
    parsed = Object.assign(Object.assign({}, parsed), parseRanking(data));
    return parsed;
}
exports.parseChartArtist = parseChartArtist;
function parseChartTrending(data) {
    var _a;
    if (data) {
        const flex_0 = (0, utils_1.getFlexColumnItem)(data, 0);
        const artists = (0, songs_1.parseSongArtists)(data, 1);
        if (artists) {
            const index = (0, utils_1.getDotSeperatorIndex)(artists);
            // last item is views for some reason
            const views = index == artists.length ? null : (_a = artists.pop()) === null || _a === void 0 ? void 0 : _a['name'].split(' ')[0];
            return {
                title: (0, _1.nav)(flex_0, _1.TEXT_RUN_TEXT),
                videoId: (0, _1.nav)(flex_0, [..._1.TEXT_RUN, ..._1.NAVIGATION_VIDEO_ID], null),
                playlistId: (0, _1.nav)(flex_0, [..._1.TEXT_RUN, ..._1.NAVIGATION_PLAYLIST_ID], null),
                artists: artists,
                thumbnails: (0, _1.nav)(data, _1.THUMBNAILS),
                views: views,
            };
        }
    }
    return null;
}
exports.parseChartTrending = parseChartTrending;
function parseRanking(data) {
    return {
        rank: (0, _1.nav)(data, [
            'customIndexColumn',
            'musicCustomIndexColumnRenderer',
            ..._1.TEXT_RUN_TEXT,
        ]),
        trend: TRENDS[(0, _1.nav)(data, [
            'customIndexColumn',
            'musicCustomIndexColumnRenderer',
            'icon',
            'iconType',
        ])],
    };
}
exports.parseRanking = parseRanking;
