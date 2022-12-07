"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLibrarySongs = exports.parseLibraryArtists = exports.parseAlbums = exports.parseLibraryAlbums = exports.parseArtists = void 0;
const _1 = require(".");
const pyLibraryMock_1 = require("../pyLibraryMock");
const playlists_1 = require("./playlists");
const utils_1 = require("./utils");
const continuations_1 = require("./continuations");
function parseArtists(results, uploaded = false) {
    var _a;
    const artists = [];
    for (const result of results) {
        const data = result[_1.MRLIR];
        const artist = {};
        artist['browseId'] = (0, _1.nav)(data, _1.NAVIGATION_BROWSE_ID);
        artist['artist'] = (0, utils_1.getItemText)(data, 0);
        (0, utils_1.parseMenuPlaylists)(data, artist);
        if (uploaded) {
            artist['songs'] = (_a = (0, utils_1.getItemText)(data, 1)) === null || _a === void 0 ? void 0 : _a.split(' ')[0];
        }
        else {
            const subtitle = (0, utils_1.getItemText)(data, 1);
            if (subtitle) {
                artist['subscribers'] = subtitle.split(' ')[0];
            }
        }
        artist['thumbnails'] = (0, _1.nav)(data, _1.THUMBNAILS, null);
        artists.push(artist);
    }
    return artists;
}
exports.parseArtists = parseArtists;
async function parseLibraryAlbums(response, requestFunc, limit) {
    let results = (0, _1.findObjectByKey)((0, _1.nav)(response, [..._1.SINGLE_COLUMN_TAB, ..._1.SECTION_LIST]), 'itemSectionRenderer');
    results = (0, _1.nav)(results, _1.ITEM_SECTION);
    if (!results['gridRenderer']) {
        return [];
    }
    results = (0, _1.nav)(results, _1.GRID);
    let albums = parseAlbums(results['items']);
    if (results['continuations']) {
        const parseFunc = (contents) => parseAlbums(contents);
        albums = [
            ...albums,
            ...(await (0, continuations_1.getContinuations)(results, 'gridContinuation', limit - albums.length, requestFunc, parseFunc)),
        ];
    }
    return albums;
}
exports.parseLibraryAlbums = parseLibraryAlbums;
function parseAlbums(results) {
    const albums = [];
    for (const result of results) {
        const data = result[_1.MTRIR];
        const album = {};
        album['browseId'] = (0, _1.nav)(data, [..._1.TITLE, ..._1.NAVIGATION_BROWSE_ID]);
        album['title'] = (0, _1.nav)(data, _1.TITLE_TEXT);
        album['thumbnails'] = (0, _1.nav)(data, _1.THUMBNAIL_RENDERER);
        if ('runs' in data['subtitle']) {
            const runCount = data['subtitle']['runs'].length;
            let hasArtists = false;
            if (runCount == 1) {
                album['year'] = (0, _1.nav)(data, _1.SUBTITLE);
            }
            else {
                album['type'] = (0, _1.nav)(data, _1.SUBTITLE);
            }
            if (runCount == 3) {
                if ((0, pyLibraryMock_1.isDigit)((0, _1.nav)(data, _1.SUBTITLE2))) {
                    album['year'] = (0, _1.nav)(data, _1.SUBTITLE2);
                }
                else {
                    hasArtists = true;
                }
            }
            else if (runCount > 3) {
                album['year'] = (0, _1.nav)(data, _1.SUBTITLE3);
                hasArtists = true;
            }
            if (hasArtists) {
                const subtitle = data['subtitle']['runs'][2];
                album['artists'] = [];
                album['artists'].push({
                    name: subtitle['text'],
                    id: (0, _1.nav)(subtitle, _1.NAVIGATION_BROWSE_ID, null),
                });
            }
        }
        albums.push(album);
    }
    return albums;
}
exports.parseAlbums = parseAlbums;
async function parseLibraryArtists(response, requestFunc, limit) {
    let results = (0, _1.findObjectByKey)((0, _1.nav)(response, [..._1.SINGLE_COLUMN_TAB, ..._1.SECTION_LIST]), 'itemSectionRenderer');
    results = (0, _1.nav)(results, _1.ITEM_SECTION);
    if (!results['musicShelfRenderer'])
        return [];
    results = results['musicShelfRenderer'];
    let artists = parseArtists(results['contents']);
    if (results['continuations']) {
        const parseFunc = (contents) => parseArtists(contents);
        artists = [
            ...artists,
            ...(await (0, continuations_1.getContinuations)(results, 'musicShelfContinuation', limit - artists.length, requestFunc, parseFunc)),
        ];
    }
    return artists;
}
exports.parseLibraryArtists = parseLibraryArtists;
function parseLibrarySongs(response) {
    let results = (0, _1.findObjectByKey)((0, _1.nav)(response, [..._1.SINGLE_COLUMN_TAB, ..._1.SECTION_LIST]), 'itemSectionRenderer');
    results = (0, _1.nav)(results, _1.ITEM_SECTION);
    const songs = { results: [], parsed: [] };
    if (results['musicShelfRenderer']) {
        songs['results'] = results['musicShelfRenderer'];
        songs['parsed'] = (0, playlists_1.parsePlaylistItems)(songs['results']['contents'].slice(1));
    }
    return songs;
}
exports.parseLibrarySongs = parseLibrarySongs;
