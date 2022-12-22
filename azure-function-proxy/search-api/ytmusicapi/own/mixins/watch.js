"use strict";
/**
 * @module Watch
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchMixin = void 0;
const parsers_1 = require("../parsers");
const utils_1 = require("../parsers/utils");
const watch_1 = require("../parsers/watch");
const continuations_1 = require("../parsers/continuations");
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const WatchMixin = (Base) => {
    return class WatchMixin extends Base {
        /**
         * Get a watch list of tracks. This watch playlist appears when you press
         * play on a track in YouTube Music.
         * Please note that the `INDIFFERENT` likeStatus of tracks returned by this
         * endpoint may be either `INDIFFERENT` or `DISLIKE`, due to ambiguous data
         * returned by YouTube Music.
         *
         * @param videoId {string} videoId of the played video
         * @param playlistId {string} playlistId of the played playlist or album
         * @param limit {number} minimum number of watch playlist items to return
         * @param params only used internally by `getWatchPlaylistShuffle`
         * @return List of watch playlist items. The counterpart key is optional and only
         * appears if a song has a corresponding video counterpart (UI song/video switcher).
         * @example
         * {
         *   "tracks": [
         *      {
         *        "videoId": "9mWr4c_ig54",
         *        "title": "Foolish Of Me (feat. Jonathan Mendelsohn)",
         *        "length": "3:07",
         *        "thumbnail": [
         *          {
         *            "url": "https://lh3.googleusercontent.com/ulK2YaLtOW0PzcN7ufltG6e4ae3WZ9Bvg8CCwhe6LOccu1lCKxJy2r5AsYrsHeMBSLrGJCNpJqXgwczk=w60-h60-l90-rj",
         *            "width": 60,
         *            "height": 60
         *          }...
         *        ],
         *        "feedbackTokens": {
         *          "add": "AB9zfpIGg9XN4u2iJ...",
         *          "remove": "AB9zfpJdzWLcdZtC..."
         *        },
         *        "likeStatus": "INDIFFERENT",
         *        "artists": [
         *          {
         *            "name": "Seven Lions",
         *            "id": "UCYd2yzYRx7b9FYnBSlbnknA"
         *          },
         *          {
         *            "name": "Jason Ross",
         *            "id": "UCVCD9Iwnqn2ipN9JIF6B-nA"
         *          },
         *          {
         *            "name": "Crystal Skies",
         *            "id": "UCTJZESxeZ0J_M7JXyFUVmvA"
         *          }
         *        ],
         *        "album": {
         *          "name": "Foolish Of Me",
         *          "id": "MPREb_C8aRK1qmsDJ"
         *        },
         *        "year": "2020",
         *        "counterpart": {
         *          "videoId": "E0S4W34zFMA",
         *          "title": "Foolish Of Me [ABGT404] (feat. Jonathan Mendelsohn)",
         *          "length": "3:07",
         *          "thumbnail": [...],
         *          "feedbackTokens": null,
         *          "likeStatus": "LIKE",
         *          "artists": [
         *            {
         *              "name": "Jason Ross",
         *              "id": null
         *            },
         *            {
         *              "name": "Seven Lions",
         *              "id": null
         *            },
         *            {
         *              "name": "Crystal Skies",
         *              "id": null
         *            }
         *          ],
         *          "views": "6.6K"
         *        }
         *      },...
         *   ],
         *   "playlistId": "RDAMVM4y33h81phKU",
         *   "lyrics": "MPLYt_HNNclO0Ddoc-17"
         * }
         */
        async getWatchPlaylist(watchPlaylist) {
            let { playlistId } = watchPlaylist;
            const { videoId, limit = 25, params } = watchPlaylist;
            const body = {
                enablePersistentPlaylistPanel: true,
                isAudioOnly: true,
            };
            if (!videoId && !playlistId) {
                throw new Error('You must provide either a video id, a playlist id, or both');
            }
            if (videoId) {
                body['videoId'] = videoId;
                if (!playlistId) {
                    playlistId = 'RDAMVM' + videoId;
                }
                if (!params) {
                    body['watchEndpointMusicSupportedConfigs'] = {
                        watchEndpointMusicConfig: {
                            hasPersistentPlaylistPanel: true,
                            musicVideoType: 'MUSIC_VIDEO_TYPE_ATV',
                        },
                    };
                }
            }
            body['playlistId'] = (0, utils_1.validatePlaylistId)(playlistId);
            const isPlaylist = body['playlistId'].startsWith('PL') ||
                body['playlistId'].startsWith('OLA');
            if (params) {
                body['params'] = params;
            }
            const endpoint = 'next';
            const response = await this._sendRequest(endpoint, body);
            const watchNextRenderer = (0, parsers_1.nav)(response, [
                'contents',
                'singleColumnMusicWatchNextResultsRenderer',
                'tabbedRenderer',
                'watchNextTabbedResultsRenderer',
            ]);
            const lyricsBrowseId = (0, watch_1.getTabBrowseId)(watchNextRenderer, 1);
            const relatedBrowseId = (0, watch_1.getTabBrowseId)(watchNextRenderer, 1);
            //Waiting on bugfix for nav nested arrays objects
            const results = (0, parsers_1.nav)(watchNextRenderer, [
                ...parsers_1.TAB_CONTENT,
                'musicQueueRenderer',
                'content',
                'playlistPanelRenderer',
            ]);
            const playlist = results['contents']
                .map((x) => (0, parsers_1.nav)(x, ['playlistPanelVideoRenderer', ...parsers_1.NAVIGATION_PLAYLIST_ID], null))
                .filter((x) => !!x)[0];
            let tracks = (0, watch_1.parseWatchPlaylist)(results['contents']);
            if ('continuations' in results) {
                const request_func = (additionalParams) => this._sendRequest(endpoint, body, additionalParams);
                const parse_func = (contents) => (0, watch_1.parseWatchPlaylist)(contents);
                tracks = [
                    ...tracks,
                    ...(await (0, continuations_1.getContinuations)(results, 'playlistPanelContinuation', limit - tracks.length, request_func, parse_func, isPlaylist ? '' : 'Radio')),
                ];
            }
            return {
                tracks: tracks,
                playlistId: playlist,
                lyrics: lyricsBrowseId,
                related: relatedBrowseId,
            };
        }
        /**
         * Shuffle any playlist
         * @param videoId {string} Optional video id of the first video in the shuffled playlist
         * @param playlistId {string} Playlist id
         * @param limit {number} The number of watch playlist items to return @default 50
         * @returns A list of watch playlist items
         */
        async getWatchPlaylistShuffle(options) {
            return this.getWatchPlaylist(Object.assign(Object.assign({}, options), { params: 'wAEB8gECKAE%3D' }));
        }
    };
};
exports.WatchMixin = WatchMixin;
