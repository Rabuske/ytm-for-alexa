"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryMixin = void 0;
const _utils_1 = require("./_utils");
const parsers_1 = require("../parsers");
const browsing_1 = require("../parsers/browsing");
const library_1 = require("../parsers/library");
const playlists_1 = require("../parsers/playlists");
const continuations_1 = require("../parsers/continuations");
/**
 * @module Library
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const LibraryMixin = (Base) => {
    return class LibraryMixin extends Base {
        /**
         * Retrieves the playlists in the user's library.
         * @param {number} [limit = 25] Number of playlists to retrieve.
         * @return Array of owned playlists.
         * @example <caption>Each item is in the following format</caption>
         * {
         *   'playlistId': 'PLQwVIlKxHM6rz0fDJVv_0UlXGEWf-bFys',
         *   'title': 'Playlist title',
         *   'thumbnails: [...],
         *   'count': 5
         * }
         */
        async getLibraryPlaylists(limit = 25) {
            this._checkAuth();
            const body = { browseId: 'FEmusic_liked_playlists' };
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            let results = (0, parsers_1.findObjectByKey)((0, parsers_1.nav)(response, [...parsers_1.SINGLE_COLUMN_TAB, ...parsers_1.SECTION_LIST]), 'itemSectionRenderer');
            results = (0, parsers_1.nav)(results, [...parsers_1.ITEM_SECTION, ...parsers_1.GRID]);
            let playlists = (0, browsing_1.parseContentList)(results['items'].slice(1), browsing_1.parsePlaylist);
            if ('continuations' in results) {
                const requestFunc = async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams);
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                const parseFunc = (contents) => (0, browsing_1.parseContentList)(contents, browsing_1.parsePlaylist);
                playlists = [
                    ...playlists,
                    ...(await (0, continuations_1.getContinuations)(results, 'gridContinuation', limit - playlists.length, requestFunc, parseFunc)),
                ];
            }
            return playlists;
        }
        /**
         * Gets the songs in the user's library (liked videos are not included).
         * To get liked songs and videos, use `getLikedSongs`.
         * @param {Object} [options=]
         * @param {number} [options.limit = 25] Limit number of songs to retrieve.
         * @param {boolean} [options.validateResponse = false] Flag indicating if responses from YTM should be validated and retried in case when some songs are missing.
         * @param {lt.Order} [options.order=] Order of songs to return. Allowed values: 'a_to_z', 'z_to_a', 'recently_added'.
         * @return List of songs. Same format as `getPlaylist`
         */
        async getLibrarySongs(options) {
            this._checkAuth();
            const { limit = 25, validateResponse = false, order } = options !== null && options !== void 0 ? options : {};
            const body = { browseId: 'FEmusic_liked_videos' };
            (0, _utils_1.validateOrderParameters)(order);
            if (order) {
                body['params'] = (0, _utils_1.prepareOrderParams)(order);
            }
            const endpoint = 'browse';
            const perPage = 25;
            const requestFunc = async (_additionalParams) => await this._sendRequest(endpoint, body); //additionalParams doesnt do anything? @codyduong PR this.
            const parseFunc = (rawResponse) => (0, library_1.parseLibrarySongs)(rawResponse);
            let response;
            if (validateResponse) {
                const validateFunc = (parsed) => (0, continuations_1.validateResponse)(parsed, perPage, limit, 0);
                response = await (0, continuations_1.resendRequestUntilParsedResponseIsValid)(requestFunc, null, parseFunc, validateFunc, 3);
            }
            else {
                response = parseFunc(await requestFunc(null));
            }
            const results = response['results'];
            let songs = response['parsed'];
            if ('continuations' in results) {
                const requestContinuationsFunc = async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams);
                const parseContinuationsFunc = (contents) => (0, playlists_1.parsePlaylistItems)(contents);
                if (validateResponse) {
                    songs = [
                        ...songs,
                        ...(await (0, continuations_1.getValidatedContinuations)(results, 'musicShelfContinuation', limit - songs.length, perPage, requestContinuationsFunc, parseContinuationsFunc)),
                    ];
                }
                else {
                    songs = [
                        ...songs,
                        ...(await (0, continuations_1.getContinuations)(results, 'musicShelfContinuation', limit - songs.length, requestContinuationsFunc, parseContinuationsFunc)),
                    ];
                }
            }
            return songs;
        }
        /**
         * Gets the albums in the user's library.
         * @param {Object} [options=]
         * @param {number} [options.limit = 25] Number of albums to return.
         * @param {lt.Order} [options.order=] Order of albums to return. Allowed values: 'a_to_z', 'z_to_a', 'recently_added'.
         * @return List of albums.
         * @example <caption>Each item is in the following format</caption>
         * {
         *   "browseId": "MPREb_G8AiyN7RvFg",
         *   "title": "Beautiful",
         *   "type": "Album",
         *   "thumbnails": [...],
         *   "artists": [{
         *     "name": "Project 46",
         *     "id": "UCXFv36m62USAN5rnVct9B4g"
         *   }],
         *     "year": "2015"
         * }
         */
        async getLibraryAlbums(options) {
            this._checkAuth();
            const { limit = 25, order } = options !== null && options !== void 0 ? options : {};
            const body = { browseId: 'FEmusic_liked_albums' };
            if (order) {
                body['params'] = (0, _utils_1.prepareOrderParams)(order);
            }
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            return await (0, library_1.parseLibraryAlbums)(response, async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams), limit);
        }
        /**
         * Gets the artists of the songs in the user's library.
         * @param {Object} [options=]
         * @param {number} [options.limit = 25] Number of artists to return.
         * @param {lt.Order} [options.order=] Order of artists to return.
         * @return List of artists.
         * @example <caption>Each item is in the following format</caption>
         * {
         *   "browseId": "UCxEqaQWosMHaTih-tgzDqug",
         *   "artist": "WildVibes",
         *   "subscribers": "2.91K",
         *   "thumbnails": [...]
         * }
         */
        async getLibraryArtists(options) {
            this._checkAuth();
            const body = { browseId: 'FEmusic_library_corpus_track_artists' };
            const { limit = 25, order } = options !== null && options !== void 0 ? options : {};
            (0, _utils_1.validateOrderParameters)(order);
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            return await (0, library_1.parseLibraryArtists)(response, async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams), limit);
        }
        /**
         * Gets the artists the user has subscribed to.
         * @param options
         * @param {number} [options.limit=25] Number of artists to return.
         * @param {lt.Order} [options.order=]  Order of artists to return. Allowed values: 'a_to_z', 'z_to_a', 'recently_added'.
         * @return List of artists. Same format as `getLibraryArtists`
         */
        async getLibrarySubscriptions(options) {
            this._checkAuth();
            const { limit = 25, order } = options !== null && options !== void 0 ? options : {};
            const body = {
                browseId: 'FEmusic_library_corpus_artists',
            };
            (0, _utils_1.validateOrderParameters)(order);
            if (order) {
                body['params'] = (0, _utils_1.prepareOrderParams)(order);
            }
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            return (0, library_1.parseLibraryArtists)(response, async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams), limit);
        }
        /**
         * Gets playlist items for the 'Liked Songs' playlist.
         * @param {number} [limit=100] How many items to return.
         * @return List of playlistItem dictionaries. See `getPlaylist`
         */
        async getLikedSongs(limit = 100) {
            return await this.getPlaylist('LM', limit);
        }
        /**
         * Gets your play history in reverse chronological order.
         *
         * @return List of playlistItems, see `getPlaylist`.
         *
         * The additional property ``played`` indicates when the playlistItem was played.
         *
         * The additional property ``feedbackToken`` can be used to remove items with `removeHistoryItems`.
         */
        async getHistory() {
            this._checkAuth();
            const body = { browseId: 'FEmusic_history' };
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            const results = (0, parsers_1.nav)(response, [...parsers_1.SINGLE_COLUMN_TAB, ...parsers_1.SECTION_LIST]);
            let songs = [];
            for (const content of results) {
                const data = (0, parsers_1.nav)(content, [...parsers_1.MUSIC_SHELF, 'contents'], null);
                if (!data) {
                    const error = (0, parsers_1.nav)(content, ['musicNotifierShelfRenderer', ...parsers_1.TITLE], null);
                    throw new Error(error);
                }
                const menuEntries = [[-1, ...parsers_1.MENU_SERVICE, ...parsers_1.FEEDBACK_TOKEN]];
                const songlist = (0, playlists_1.parsePlaylistItems)(data, menuEntries);
                for (const song of songlist) {
                    song['played'] = (0, parsers_1.nav)(content['musicShelfRenderer'], parsers_1.TITLE_TEXT);
                }
                songs = [...songs, ...songlist];
            }
            return songs;
        }
        /**
         * Remove an item from the account's history. This method does currently not work with brand accounts.
         * @param feedbackTokens  Token to identify the item to remove, obtained from `getHistory`.
         * @return Full response.
         */
        async removeHistoryItems(feedbackTokens) {
            this._checkAuth();
            const body = { feedbackTokens };
            const endpoint = 'feedback';
            const response = await this._sendRequest(endpoint, body);
            return response;
        }
        /**
         * Rates a song ("thumbs up"/"thumbs down" interactions on YouTube Music).
         * @param {string} [videoId] Video id.
         * @param {string} [rating='INDIFFERENT'] One of 'LIKE', 'DISLIKE', 'INDIFFERENT'.
         * 'INDIFFERENT' removes the playlist/album from the library
         * @return Full response.
         */
        async rateSong(videoId, rating = 'INDIFFERENT') {
            this._checkAuth();
            const body = { target: { videoId } };
            const endpoint = (0, _utils_1.prepareLikeEndpoint)(rating);
            if (!endpoint) {
                throw new Error('Invalid rating provided');
            }
            return await this._sendRequest(endpoint, body);
        }
        /**
         * Adds or removes a song from your library depending on the token provided.
         * @param {string[]} [feedbackTokens] List of feedbackTokens obtained from authenticated requests
         * to endpoints that return songs (i.e. `get_album`).
         * @return Full response.
         */
        async editSongLibraryStatus(feedbackTokens) {
            this._checkAuth();
            const body = { feedbackTokens };
            const endpoint = 'feedback';
            return await this._sendRequest(endpoint, body);
        }
        /**
         * Rates a playlist/album ("Add to library"/"Remove from library" interactions on YouTube Music)
         * You can also dislike a playlist/album, which has an effect on your recommendations
         * @param {string} [videoId] Playlist id.
         * @param {string} [rating='INDIFFERENT'] One of 'LIKE', 'DISLIKE', 'INDIFFERENT'.
         * 'INDIFFERENT' removes the playlist/album from the library.
         * @return Full response.
         */
        async ratePlaylist(playlistId, rating = 'INDIFFERENT') {
            this._checkAuth();
            const body = { target: { playlistId } };
            const endpoint = (0, _utils_1.prepareLikeEndpoint)(rating);
            if (!endpoint) {
                throw new Error('Invalid rating provided');
            }
            return await this._sendRequest(endpoint, body);
        }
        /**
         * Subscribe to artists. Adds the artists to your library.
         * @param channelIds Artist channel ids.
         * @return Full response.
         */
        async subscribeArtists(channelIds) {
            this._checkAuth();
            const body = { channelIds };
            const endpoint = 'subscription/subscribe';
            return await this._sendRequest(endpoint, body);
        }
        /**
         * Unsubscribe to artists. Removes the artists to your library.
         * @param channelIds Artist channel ids.
         * @return Full response.
         */
        async unsubscribeArtists(channelIds) {
            this._checkAuth();
            const body = { channelIds: channelIds };
            const endpoint = 'subscription/unsubscribe';
            return await this._sendRequest(endpoint, body);
        }
    };
};
exports.LibraryMixin = LibraryMixin;
