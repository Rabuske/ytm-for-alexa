"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePlaylistItems = void 0;
const _1 = require(".");
const helpers_1 = require("../helpers");
const songs_1 = require("./songs");
const utils_1 = require("./utils");
function parsePlaylistItems(results, menuEntries) {
    const songs = [];
    let count = 1;
    for (const result of results) {
        count += 1;
        if (!result[_1.MRLIR]) {
            continue;
        }
        const data = result[_1.MRLIR];
        try {
            let [videoId, setVideoId, like, feedbackTokens] = Array(4).fill(null);
            // if the item has a menu, find its setVideoId
            if (data['menu']) {
                for (const item of (0, _1.nav)(data, _1.MENU_ITEMS)) {
                    if (item['menuServiceItemRenderer']) {
                        const menuService = (0, _1.nav)(item, _1.MENU_SERVICE);
                        if ('playlistEditEndpoint' in menuService) {
                            setVideoId =
                                menuService['playlistEditEndpoint']['actions'][0]['setVideoId'];
                            videoId =
                                menuService['playlistEditEndpoint']['actions'][0]['removedVideoId'];
                        }
                    }
                    if (_1.TOGGLE_MENU in item) {
                        feedbackTokens = (0, songs_1.parseSongMenuTokens)(item);
                    }
                }
            }
            // if item is not playable, the videoId was retrieved above
            if ('playNavigationEndpoint' in (0, _1.nav)(data, _1.PLAY_BUTTON)) {
                videoId = (0, _1.nav)(data, _1.PLAY_BUTTON)['playNavigationEndpoint']['watchEndpoint']['videoId'];
                if (data['menu']) {
                    like = (0, _1.nav)(data, _1.MENU_LIKE_STATUS, null);
                }
            }
            const title = (0, utils_1.getItemText)(data, 0);
            if (title == 'Song deleted')
                continue;
            const artists = (0, songs_1.parseSongArtists)(data, 1);
            const album = (0, songs_1.parseSongAlbum)(data, 2);
            let duration = null;
            if (data['fixedColumns']) {
                if ('simpleText' in (0, utils_1.getFixedColumnItem)(data, 0)['text']) {
                    duration = (0, utils_1.getFixedColumnItem)(data, 0)['text']['simpleText'];
                }
                else {
                    duration = (0, utils_1.getFixedColumnItem)(data, 0)['text']['runs'][0]['text'];
                }
            }
            let thumbnails = null;
            if (data['thumbnail']) {
                thumbnails = (0, _1.nav)(data, _1.THUMBNAILS);
            }
            let isAvailable = true;
            if (data['musicItemRendererDisplayPolicy']) {
                isAvailable =
                    data['musicItemRendererDisplayPolicy'] !=
                        'MUSIC_ITEM_RENDERER_DISPLAY_POLICY_GREY_OUT';
            }
            const isExplicit = !!(0, _1.nav)(data, _1.BADGE_LABEL, null);
            const song = {
                videoId: videoId,
                title: title,
                artists: artists,
                album: album,
                likeStatus: like,
                thumbnails: thumbnails,
                isAvailable: isAvailable,
                isExplicit: isExplicit,
            };
            if (duration) {
                song['duration'] = duration;
                song['duration_seconds'] = (0, helpers_1.parseDuration)(duration);
            }
            if (setVideoId) {
                song['setVideoId'] = setVideoId;
            }
            if (feedbackTokens) {
                song['feedbackTokens'] = feedbackTokens;
            }
            if (menuEntries) {
                for (const menuEntry of menuEntries) {
                    song[menuEntry.slice(undefined, -1)] = (0, _1.nav)(data, [
                        ..._1.MENU_ITEMS,
                        ...menuEntry,
                    ]);
                }
            }
            songs.push(song);
        }
        catch (e) {
            console.log(`Item ${count}: ${e}`);
        }
    }
    return songs;
}
exports.parsePlaylistItems = parsePlaylistItems;
