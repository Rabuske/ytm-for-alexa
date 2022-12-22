"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUploadedItems = void 0;
const _1 = require(".");
const helpers_1 = require("../helpers");
const songs_1 = require("./songs");
const utils_1 = require("./utils");
function parseUploadedItems(results) {
    const songs = [];
    for (const result of results) {
        const data = result[_1.MRLIR];
        if (!data['menu']) {
            continue;
        }
        const entityId = (0, _1.nav)(data, _1.MENU_ITEMS).slice(-1)[0]['menuNavigationItemRenderer']['navigationEndpoint']['confirmDialogEndpoint']['content']['confirmDialogRenderer']['confirmButton']['buttonRenderer']['command']['musicDeletePrivatelyOwnedEntityCommand']['entityId'];
        const videoId = (0, _1.nav)(data, [..._1.MENU_ITEMS, [0], ..._1.MENU_SERVICE])['queueAddEndpoint']['queueTarget']['videoId'];
        const title = (0, utils_1.getItemText)(data, 0);
        const like = (0, _1.nav)(data, _1.MENU_LIKE_STATUS);
        const thumbnails = 'thumbnail' in data ? (0, _1.nav)(data, _1.THUMBNAILS) : null;
        const duration = (0, utils_1.getFixedColumnItem)(data, 0)['text']['runs'][0]['text'];
        const song = {
            entityId: entityId,
            videoId: videoId,
            title: title,
            duration: duration,
            duration_seconds: (0, helpers_1.parseDuration)(duration),
            artists: (0, songs_1.parseSongArtists)(data, 1),
            album: (0, songs_1.parseSongAlbum)(data, 2),
            likeStatus: like,
            thumbnails: thumbnails,
        };
        songs.push(song);
    }
    return songs;
}
exports.parseUploadedItems = parseUploadedItems;
