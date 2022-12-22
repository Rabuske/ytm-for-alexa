"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAlbumHeader = void 0;
const _1 = require(".");
const helpers_1 = require("../helpers");
const songs_1 = require("./songs");
function parseAlbumHeader(response) {
    const header = (0, _1.nav)(response, _1.HEADER_DETAIL);
    let album = {
        title: (0, _1.nav)(header, _1.TITLE_TEXT),
        type: (0, _1.nav)(header, _1.SUBTITLE),
        thumbnails: (0, _1.nav)(header, _1.THUMBNAIL_CROPPED),
    };
    if ('description' in header) {
        album['description'] = header['description']['runs'][0]['text'];
    }
    const albumInfo = (0, songs_1.parseSongRuns)(header['subtitle']['runs'].slice(2));
    album = Object.assign(Object.assign({}, album), albumInfo);
    if (header['secondSubtitle']['runs'].length > 1) {
        album['trackCount'] = (0, helpers_1.toInt)(header['secondSubtitle']['runs'][0]['text']);
        album['duration'] = header['secondSubtitle']['runs'][2]['text'];
    }
    else {
        album['duration'] = header['secondSubtitle']['runs'][0]['text'];
    }
    // add to library/uploaded
    const menu = (0, _1.nav)(header, _1.MENU);
    const toplevel = menu['topLevelButtons'];
    album['audioPlaylistId'] = (0, _1.nav)(toplevel, [0, 'buttonRenderer', ..._1.NAVIGATION_WATCH_PLAYLIST_ID], null);
    if (!album['audioPlaylistId']) {
        album['audioPlaylistId'] = (0, _1.nav)(toplevel, [0, 'buttonRenderer', ..._1.NAVIGATION_PLAYLIST_ID], null);
    }
    const service = (0, _1.nav)(toplevel, [1, 'buttonRenderer', 'defaultServiceEndpoint'], null);
    if (service) {
        album['likeStatus'] = (0, songs_1.parseLikeStatus)(service);
    }
    return album;
}
exports.parseAlbumHeader = parseAlbumHeader;
