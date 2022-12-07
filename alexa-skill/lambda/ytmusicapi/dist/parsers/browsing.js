"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRelatedArtist = exports.parsePlaylist = exports.parseVideo = exports.parseSongFlat = exports.parseContentList = exports.Parser = void 0;
//This file is functionally complete (except for locales)
const pyLibraryMock_1 = require("../pyLibraryMock");
const index_1 = require("./index");
const songs_1 = require("./songs");
const utils_1 = require("./utils");
const i18next_1 = __importDefault(require("i18next"));
class Parser {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    parseSearchResults(results, resultType, category) {
        var _a, _b, _c;
        const searchResults = [];
        const defaultOffset = !resultType ? 2 : 0;
        for (const result of results) {
            const data = result[index_1.MRLIR];
            let searchResult = { category: category };
            if (!resultType) {
                resultType =
                    (_b = (_a = (0, utils_1.getItemText)(data, 1)) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : null;
                const resultTypes = [
                    'artist',
                    'playlist',
                    'song',
                    'video',
                    'station',
                ];
                const resultTypesLocal = [
                    i18next_1.default.t('artist'),
                    i18next_1.default.t('playlist'),
                    i18next_1.default.t('song'),
                    i18next_1.default.t('video'),
                    i18next_1.default.t('station'),
                ];
                // default to album since it's labeled with multiple values ('Single', 'EP', etc.)
                if (resultType && !resultTypesLocal.includes(resultType)) {
                    resultType = 'album';
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    resultType = resultTypes[resultTypesLocal.indexOf(resultType)];
                }
            }
            searchResult['resultType'] = resultType;
            if (resultType != 'artist') {
                searchResult['title'] = (0, utils_1.getItemText)(data, 0);
            }
            if (resultType == 'artist') {
                searchResult['artist'] = (0, utils_1.getItemText)(data, 0);
                (0, utils_1.parseMenuPlaylists)(data, searchResult);
            }
            else if (resultType == 'album') {
                searchResult['type'] = (0, utils_1.getItemText)(data, 1);
            }
            else if (resultType == 'playlist') {
                const flexItem = (_c = (0, utils_1.getFlexColumnItem)(data, 1)) === null || _c === void 0 ? void 0 : _c['text']['runs'];
                const hasAuthor = (flexItem === null || flexItem === void 0 ? void 0 : flexItem.length) == defaultOffset + 3;
                searchResult['itemCount'] =
                    flexItem &&
                        (0, index_1.nav)(flexItem, [
                            defaultOffset + (hasAuthor ? 2 : 0),
                            'text',
                        ]).split(' ')[0];
                searchResult['author'] = !hasAuthor
                    ? null
                    : (0, index_1.nav)(flexItem, [defaultOffset, 'text']);
            }
            else if (resultType == 'station') {
                searchResult['videoId'] = (0, index_1.nav)(data, index_1.NAVIGATION_VIDEO_ID);
                searchResult['playlistId'] = (0, index_1.nav)(data, index_1.NAVIGATION_PLAYLIST_ID);
            }
            else if (resultType == 'song') {
                searchResult['album'] = null;
                if ('menu' in data) {
                    const toggleMenu = (0, index_1.findObjectByKey)((0, index_1.nav)(data, index_1.MENU_ITEMS, null), //@codyduong this isn't nullable in the py library? todo discovery why...
                    index_1.TOGGLE_MENU);
                    if (toggleMenu) {
                        searchResult['feedbackTokens'] = (0, songs_1.parseSongMenuTokens)(toggleMenu);
                    }
                }
            }
            else if (resultType == 'video') {
                searchResult['views'] = null;
            }
            else if (resultType == 'upload') {
                const browseId = (0, index_1.nav)(data, index_1.NAVIGATION_BROWSE_ID, null);
                if (!browseId) {
                    // song result
                    const flexItems = [0, 1].map((i) => (0, index_1.nav)((0, utils_1.getFlexColumnItem)(data, i), ['text', 'runs'], null));
                    if (flexItems[0]) {
                        searchResult['videoId'] = (0, index_1.nav)(flexItems[0][0], index_1.NAVIGATION_VIDEO_ID, null);
                        searchResult['playlistId'] = (0, index_1.nav)(flexItems[0][0], index_1.NAVIGATION_PLAYLIST_ID, null);
                    }
                    if (flexItems[1]) {
                        searchResult = Object.assign(Object.assign({}, searchResult), (0, songs_1.parseSongRuns)(flexItems[1]));
                    }
                    searchResult['resultType'] = 'song';
                }
                else {
                    //artist or album result
                    searchResult['browseId'] = browseId;
                    if (searchResult['browseId'].includes('artist')) {
                        searchResult['resultType'] = 'artist';
                    }
                    else {
                        const flexItem2 = (0, utils_1.getFlexColumnItem)(data, 1);
                        // const runs = [
                        //     run['text'] for i, run in enumerate(flex_item2['text']['runs'])
                        //     if i % 2 == 0
                        // ]
                        const runs = flexItem2 === null || flexItem2 === void 0 ? void 0 : flexItem2['text']['runs'].map((value, index) => {
                            if (index % 2 == 0) {
                                return value['text'];
                            }
                        });
                        if (runs && runs.length > 1) {
                            searchResult['artist'] = runs[1];
                        }
                        if (runs && runs.length > 2) {
                            //# date may be missing
                            searchResult['releaseDate'] = runs[2];
                        }
                        searchResult['resultType'] = 'album';
                    }
                }
            }
            if (['song', 'video'].includes(resultType)) {
                searchResult['videoId'] = (0, index_1.nav)(data, [
                    ...index_1.PLAY_BUTTON,
                    'playNavigationEndpoint',
                    'watchEndpoint',
                    'videoId',
                ], null);
                searchResult['videoType'] = (0, index_1.nav)(data, [...index_1.PLAY_BUTTON, 'playNavigationEndpoint', ...index_1.NAVIGATION_VIDEO_TYPE], null);
            }
            if (['song', 'video', 'album'].includes(resultType)) {
                searchResult['duration'] = null;
                searchResult['year'] = null;
                const hasOffset = resultType == 'album' || (defaultOffset && !!searchResult['videoId']);
                const flexItem = (0, utils_1.getFlexColumnItem)(data, 1);
                const runs = flexItem === null || flexItem === void 0 ? void 0 : flexItem['text']['runs'].slice(hasOffset ? 2 : 0);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const songInfo = (0, songs_1.parseSongRuns)(runs);
                searchResult = Object.assign(Object.assign({}, searchResult), songInfo);
            }
            if (['artist', 'album', 'playlist'].includes(resultType)) {
                searchResult['browseId'] = (0, index_1.nav)(data, index_1.NAVIGATION_BROWSE_ID, null);
                if (!searchResult['browseId'])
                    continue;
            }
            if (['song', 'album'].includes(resultType))
                searchResult['isExplicit'] = (0, index_1.nav)(data, index_1.BADGE_LABEL, null) != null;
            searchResult['thumbnails'] = (0, index_1.nav)(data, index_1.THUMBNAILS, null);
            searchResults.push(searchResult);
        }
        return searchResults;
    }
    parseArtistContents(results) {
        const categories = ['albums', 'singles', 'videos', 'playlists', 'related'];
        const categories_local = [
            i18next_1.default.t('albums'),
            i18next_1.default.t('singles'),
            i18next_1.default.t('videos'),
            i18next_1.default.t('playlists'),
            i18next_1.default.t('related'),
        ];
        const categories_parser = [
            parseAlbum,
            parseSingle,
            parseVideo,
            parsePlaylist,
            parseRelatedArtist,
        ];
        const artist = {};
        categories.forEach((category, i) => {
            const data = results
                .map((r) => {
                if (r['musicCarouselShelfRenderer'] &&
                    (0, index_1.nav)(r, [...index_1.CAROUSEL, ...index_1.CAROUSEL_TITLE])['text'].toLowerCase() ==
                        categories_local[i])
                    return r['musicCarouselShelfRenderer'];
            })
                .filter((x) => x);
            if (data[0]) {
                //@ts-expect-error: We set this later in flow
                artist[category] = { browseId: null, results: [] };
                if ('navigationEndpoint' in (0, index_1.nav)(data[0], index_1.CAROUSEL_TITLE)) {
                    artist[category]['browseId'] = (0, index_1.nav)(data[0], [
                        ...index_1.CAROUSEL_TITLE,
                        ...index_1.NAVIGATION_BROWSE_ID,
                    ]);
                    if (category === 'albums' ||
                        category === 'singles' ||
                        category === 'playlists') {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        artist[category].params = (0, index_1.nav)(data[0], index_1.CAROUSEL_TITLE)['navigationEndpoint']['browseEndpoint']['params'];
                    }
                }
                //@ts-expect-error: It tries it's best LOL.
                artist[category]['results'] = parseContentList(data[0]['contents'], categories_parser[i]);
            }
        });
        return artist;
    }
    parseMixedContent(rows) {
        const items = [];
        for (const row of rows) {
            let [title, contents] = ['', []];
            if (index_1.DESCRIPTION_SHELF[0] in row) {
                const results = (0, index_1.nav)(row, index_1.DESCRIPTION_SHELF);
                title = (0, index_1.nav)(results, ['header', ...index_1.RUN_TEXT]);
                contents = (0, index_1.nav)(results, index_1.DESCRIPTION);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                const results = (function* () {
                    yield* Object.values(row);
                })().next().value;
                if (!('contents' in results)) {
                    continue;
                }
                title = (0, index_1.nav)(results, [...index_1.CAROUSEL_TITLE, 'text']);
                contents = [];
                for (const result of results['contents']) {
                    const data = (0, index_1.nav)(result, [index_1.MTRIR], null);
                    let content = null;
                    if (data) {
                        const pageType = (0, index_1.nav)(data, [...index_1.TITLE, ...index_1.NAVIGATION_BROWSE, ...index_1.PAGE_TYPE], null);
                        if (pageType === null) {
                            content = parseSong(data);
                        }
                        else if (pageType === 'MUSIC_PAGE_TYPE_ALBUM') {
                            content = parseAlbum(data);
                        }
                        else if (pageType === 'MUSIC_PAGE_TYPE_ARTIST') {
                            content = parseRelatedArtist(data);
                        }
                        else if (pageType === 'MUSIC_PAGE_TYPE_PLAYLIST') {
                            content = parsePlaylist(data);
                        }
                    }
                    else {
                        const data2 = (0, index_1.nav)(result, [index_1.MRLIR]);
                        content = parseSongFlat(data2);
                    }
                    contents.push(content);
                }
            }
            items.push({ title: title, contents: contents });
        }
        return items;
    }
}
exports.Parser = Parser;
function parseContentList(results, parse_func, key = index_1.MTRIR) {
    const contents = [];
    for (const result of results) {
        contents.push(parse_func(result[key]));
    }
    return contents;
}
exports.parseContentList = parseContentList;
function parseAlbum(result) {
    return {
        title: (0, index_1.nav)(result, index_1.TITLE_TEXT, null),
        year: (0, index_1.nav)(result, index_1.SUBTITLE2, null),
        browseId: (0, index_1.nav)(result, [...index_1.TITLE, ...index_1.NAVIGATION_BROWSE_ID]),
        thumbnails: (0, index_1.nav)(result, index_1.THUMBNAIL_RENDERER),
    };
}
function parseSingle(result) {
    return {
        title: (0, index_1.nav)(result, index_1.TITLE_TEXT),
        year: (0, index_1.nav)(result, index_1.SUBTITLE, null),
        browseId: (0, index_1.nav)(result, [...index_1.TITLE, ...index_1.NAVIGATION_BROWSE_ID]),
        thumbnails: (0, index_1.nav)(result, index_1.THUMBNAIL_RENDERER),
    };
}
function parseSong(result) {
    return Object.assign({ title: (0, index_1.nav)(result, index_1.TITLE_TEXT), videoId: (0, index_1.nav)(result, index_1.NAVIGATION_VIDEO_ID), playlistId: (0, index_1.nav)(result, index_1.NAVIGATION_PLAYLIST_ID, null), thumbnails: (0, index_1.nav)(result, index_1.THUMBNAIL_RENDERER) }, (0, songs_1.parseSongRuns)(result['subtitle']['runs']));
}
function parseSongFlat(data) {
    var _a;
    const columns = ((_a = data === null || data === void 0 ? void 0 : data['flexColumns']) !== null && _a !== void 0 ? _a : []).map((_, i) => (0, utils_1.getFlexColumnItem)(data, i));
    const song = {
        title: (0, index_1.nav)(columns[0], index_1.TEXT_RUN_TEXT),
        videoId: (0, index_1.nav)(columns[0], [...index_1.TEXT_RUN, ...index_1.NAVIGATION_VIDEO_ID], null),
        artists: (0, songs_1.parseSongArtists)(data, 1),
        thumbnails: (0, index_1.nav)(data, index_1.THUMBNAILS),
        isExplicit: (0, index_1.nav)(data, index_1.BADGE_LABEL, null) !== null,
        album: null,
    };
    if (columns.length > 2 &&
        columns[2] !== null &&
        'navigationEndpoint' in (0, index_1.nav)(columns[2], index_1.TEXT_RUN)) {
        song['album'] = {
            name: (0, index_1.nav)(columns[2], index_1.TEXT_RUN_TEXT),
            id: (0, index_1.nav)(columns[2], [...index_1.TEXT_RUN, ...index_1.NAVIGATION_BROWSE_ID]),
        };
    }
    else {
        song['views'] = (0, index_1.nav)(columns[1], ['text', 'runs', -1, 'text']).split(' ')[0];
    }
    return song;
}
exports.parseSongFlat = parseSongFlat;
function parseVideo(result) {
    const runs = result['subtitle']['runs'];
    const artistsLen = (0, utils_1.getDotSeperatorIndex)(runs);
    const video = {
        title: (0, index_1.nav)(result, index_1.TITLE_TEXT),
        videoId: (0, index_1.nav)(result, index_1.NAVIGATION_VIDEO_ID),
        artists: (0, songs_1.parseSongArtistsRuns)(runs.slice(0, artistsLen)),
        playlistId: (0, index_1.nav)(result, index_1.NAVIGATION_PLAYLIST_ID, null),
        thumbnails: (0, index_1.nav)(result, index_1.THUMBNAIL_RENDERER, null),
    };
    video['views'] = runs[runs.length - 1]['text'].split(' ')[0];
    return video;
}
exports.parseVideo = parseVideo;
function parsePlaylist(data) {
    const playlist = {
        title: (0, index_1.nav)(data, index_1.TITLE_TEXT),
        playlistId: (0, index_1.nav)(data, [...index_1.TITLE, ...index_1.NAVIGATION_BROWSE_ID]).slice(2),
        thumbnails: (0, index_1.nav)(data, index_1.THUMBNAIL_RENDERER),
    };
    const subtitle = data['subtitle'];
    if ('runs' in subtitle) {
        //[run['text'] for run in subtitle['runs']]
        const runText = subtitle['runs'].map((run) => run['text']);
        playlist['description'] = runText.join('');
        if (subtitle['runs'].length == 3 &&
            pyLibraryMock_1.re.search(/\d+ /, (0, index_1.nav)(data, index_1.SUBTITLE2))) {
            playlist['count'] = (0, index_1.nav)(data, index_1.SUBTITLE2).split(' ')[0];
            playlist['author'] = (0, songs_1.parseSongArtistsRuns)(subtitle['runs'].slice(0, 1));
        }
    }
    return playlist;
}
exports.parsePlaylist = parsePlaylist;
function parseRelatedArtist(data) {
    let subscribers = (0, index_1.nav)(data, index_1.SUBTITLE, null);
    if (subscribers) {
        subscribers = subscribers.split(' ')[0];
    }
    return {
        title: (0, index_1.nav)(data, index_1.TITLE_TEXT),
        browseId: (0, index_1.nav)(data, [...index_1.TITLE, ...index_1.NAVIGATION_BROWSE_ID]),
        subscribers: subscribers,
        thumbnails: (0, index_1.nav)(data, index_1.THUMBNAIL_RENDERER),
    };
}
exports.parseRelatedArtist = parseRelatedArtist;
