"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistsMixin = void 0;
const helpers_1 = require("../helpers");
const parsers_1 = require("../parsers");
const continuations_1 = require("../parsers/continuations");
const playlists_1 = require("../parsers/playlists");
const utils_1 = require("../parsers/utils");
const _utils_1 = require("./_utils");
/**
 * @module Playlists
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const PlaylistsMixin = (Base) => {
    return class PlaylistsMixin extends Base {
        /**
         * Return a list of playlist items.
         * @param {string} [playlistId ] Playlist id.
         * @param {number} [limit=100] How many songs to return.
         * @example <caption>Each item is in the following format</caption>
         * {
         *   "id": "PLQwVIlKxHM6qv-o99iX9R85og7IzF9YS_",
         *   "privacy": "PUBLIC",
         *   "title": "New EDM This Week 03/13/2020",
         *   "thumbnails": [...]
         *   "description": "Weekly r/EDM new release roundup. Created with github.com/sigma67/spotifyplaylist_to_gmusic",
         *   "author": "sigmatics",
         *   "year": "2020",
         *   "duration": "6+ hours",
         *   "duration_seconds": 52651,
         *   "trackCount": 237,
         *   "tracks": [
         *     {
         *       "videoId": "bjGppZKiuFE",
         *       "title": "Lost",
         *       "artists": [
         *         {
         *           "name": "Guest Who",
         *           "id": "UCkgCRdnnqWnUeIH7EIc3dBg"
         *         },
         *         {
         *           "name": "Kate Wild",
         *           "id": "UCwR2l3JfJbvB6aq0RnnJfWg"
         *         }
         *       ],
         *       "album": {
         *       "name": "Lost",
         *       "id": "MPREb_PxmzvDuqOnC"
         *     },
         *     "duration": "2:58",
         *     "likeStatus": "INDIFFERENT",
         *     "thumbnails": [...],
         *     "isAvailable": True,
         *     "isExplicit": False,
         *     "feedbackTokens": {
         *       "add": "AB9zfpJxtvrU...",
         *       "remove": "AB9zfpKTyZ..."
         *     }
         *   ]
         * }
         */
        async getPlaylist(playlistId, limit = 100) {
            const browseId = !playlistId.startsWith('VL')
                ? `VL${playlistId}`
                : playlistId;
            const body = { browseId: browseId };
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            const results = (0, parsers_1.nav)(response, [
                ...parsers_1.SINGLE_COLUMN_TAB,
                ...parsers_1.SECTION_LIST_ITEM,
                'musicPlaylistShelfRenderer',
            ]);
            const playlist = {
                id: results['playlistId'],
            };
            const ownPlaylist = 'musicEditablePlaylistDetailHeaderRenderer' in response['header'];
            let header;
            if (!ownPlaylist) {
                header = response['header']['musicDetailHeaderRenderer'];
                playlist['privacy'] = 'PUBLIC';
            }
            else {
                header =
                    response['header']['musicEditablePlaylistDetailHeaderRenderer'];
                playlist['privacy'] =
                    header['editHeader']['musicPlaylistEditHeaderRenderer']['privacy'];
                header = header['header']['musicDetailHeaderRenderer'];
            }
            playlist['title'] = (0, parsers_1.nav)(header, parsers_1.TITLE_TEXT);
            playlist['thumbnails'] = (0, parsers_1.nav)(header, parsers_1.THUMBNAIL_CROPPED);
            playlist['description'] = (0, parsers_1.nav)(header, parsers_1.DESCRIPTION, null);
            const runCount = header['subtitle']['runs'].length;
            if (runCount > 1) {
                playlist['author'] = {
                    name: (0, parsers_1.nav)(header, parsers_1.SUBTITLE2),
                    id: (0, parsers_1.nav)(header, ['subtitle', 'runs', 2, ...parsers_1.NAVIGATION_BROWSE_ID], null),
                };
                if (runCount == 5) {
                    playlist['year'] = (0, parsers_1.nav)(header, parsers_1.SUBTITLE3);
                }
            }
            const songCount = (0, helpers_1.toInt)(header['secondSubtitle']['runs'][0]['text'].normalize('NFKD'));
            if (header['secondSubtitle']['runs'].length > 1) {
                playlist['duration'] = header['secondSubtitle']['runs'][2]['text'];
            }
            playlist['trackCount'] = songCount;
            playlist['suggestions_token'] = (0, parsers_1.nav)(response, [
                ...parsers_1.SINGLE_COLUMN_TAB,
                'sectionListRenderer',
                'contents',
                1,
                ...parsers_1.MUSIC_SHELF,
                ...parsers_1.RELOAD_CONTINUATION,
            ], null);
            playlist['tracks'] = [];
            if (songCount > 0) {
                playlist['tracks'] = [
                    ...playlist['tracks'],
                    ...(0, playlists_1.parsePlaylistItems)(results['contents']),
                ];
                const songsToGet = Math.min(limit, songCount);
                if ('continuations' in results) {
                    const requestFunc = async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams);
                    const parseFunc = (contents) => (0, playlists_1.parsePlaylistItems)(contents);
                    playlist['tracks'] = [
                        ...playlist['tracks'],
                        ...(await (0, continuations_1.getContinuations)(results, 'musicPlaylistShelfContinuation', songsToGet - playlist['tracks'].length, requestFunc, parseFunc)),
                    ];
                }
            }
            //For some reason we are able to go over limit, so manually truncate at the end @codyduong TODO
            playlist['tracks'] = playlist['tracks'].slice(0, limit);
            playlist['duration_seconds'] = (0, helpers_1.sumTotalDuration)(playlist);
            return playlist;
        }
        /**
         * Gets suggested tracks to add to a playlist. Suggestions are offered for playlists with less than 100 tracks
         * @param suggestionsToken Token returned by `getPlaylist` or this function
         * @returns Object containing suggested `tracks` and a `refresh_token` to get another set of suggestions.
         * For data format of tracks, check `getPlaylist`
         */
        async getPlaylistSuggestions(suggestionsToken) {
            if (!suggestionsToken) {
                throw new Error('Suggestions token is undefined.\nPlease ensure the playlist is small enough to receive suggestions.');
            }
            const endpoint = 'browse';
            const additionalParams = (0, continuations_1.getContinuationString)(suggestionsToken);
            const response = await this._sendRequest(endpoint, {}, additionalParams);
            const results = (0, parsers_1.nav)(response, [
                'continuationContents',
                'musicShelfContinuation',
            ]);
            const refreshToken = (0, parsers_1.nav)(results, parsers_1.RELOAD_CONTINUATION);
            const suggestions = (0, playlists_1.parsePlaylistItems)(results['contents']);
            return { tracks: suggestions, refresh_token: refreshToken };
        }
        /**
         * Creates a new empty playlist and returns its id.
         * @param title Playlist title.
         * @param description Optional. Playlist description.
         * @param {string} [privacyStatus='PRIVATE'] Playlists can be 'PUBLIC', 'PRIVATE', or 'UNLISTED'. Default: 'PRIVATE'.
         * @param options
         * @param {string[]} [options.videoIds] IDs of songs to create the playlist with.
         * @param {string} [options.sourcePlaylist] Another playlist whose songs should be added to the new playlist.
         * @returns ID of the YouTube playlist or full response if there was an error.
         */
        async createPlaylist(title, description, privacyStatus, options) {
            this._checkAuth();
            let actualDescription, actualPrivacyStatus, actualVideoIds, actualSourcePlaylist;
            if (typeof description == 'object') {
                actualDescription = description.description;
                actualPrivacyStatus = description.privacyStatus;
                actualVideoIds = description.videoIds;
                actualSourcePlaylist = description.sourcePlaylist;
            }
            else if (typeof privacyStatus == 'object') {
                actualDescription = description;
                actualPrivacyStatus = privacyStatus.privacyStatus;
                actualVideoIds = privacyStatus.videoIds;
                actualSourcePlaylist = privacyStatus.sourcePlaylist;
            }
            else {
                actualDescription = description;
                actualPrivacyStatus = privacyStatus;
                actualVideoIds = options === null || options === void 0 ? void 0 : options.videoIds;
                actualSourcePlaylist = options === null || options === void 0 ? void 0 : options.sourcePlaylist;
            }
            const body = {
                title: title,
                description: (0, _utils_1.htmlToText)(actualDescription !== null && actualDescription !== void 0 ? actualDescription : ''),
                privacyStatus: actualPrivacyStatus,
            };
            if (actualVideoIds) {
                body['videoIds'] = actualVideoIds;
            }
            if (actualSourcePlaylist) {
                {
                    body['sourcePlaylistId'] = actualSourcePlaylist;
                }
            }
            const endpoint = 'playlist/create';
            const response = await this._sendRequest(endpoint, body);
            return 'playlistId' in response ? response['playlistId'] : response;
        }
        /**
         * Edit title, description or privacyStatus of a playlist.
         * You may also move an item within a playlist or append another playlist to this playlist.
         * @param playlistId Playlist id.
         * @param options
         * @param {string} [options.title=] New title for the playlist.
         * @param {string} [options.description=] New description for the playlist.
         * @param {pt.PrivacyStatu} [options.privacyStatus=] New privacy status for the playlist.
         * @param {string} [options.moveItem=] Move one item before another. Items are specified by setVideoId, see `getPlaylist`.
         * @param {string} [options.addPlaylistId=] Id of another playlist to add to this playlist
         * @return Status String or full response
         */
        async editPlaylist(playlistId, options) {
            this._checkAuth();
            const { title, description, privacyStatus, moveItem, addPlaylistId } = options;
            const body = {
                playlistId: (0, utils_1.validatePlaylistId)(playlistId),
            };
            const actions = [];
            if (title) {
                {
                    actions.push({
                        action: 'ACTION_SET_PLAYLIST_NAME',
                        playlistName: title,
                    });
                }
            }
            if (description) {
                actions.push({
                    action: 'ACTION_SET_PLAYLIST_DESCRIPTION',
                    playlistDescription: description,
                });
            }
            if (privacyStatus) {
                actions.push({
                    action: 'ACTION_SET_PLAYLIST_PRIVACY',
                    playlistPrivacy: privacyStatus,
                });
            }
            if (moveItem) {
                actions.push({
                    action: 'ACTION_MOVE_VIDEO_BEFORE',
                    setVideoId: moveItem[0],
                    movedSetVideoIdSuccessor: moveItem[1],
                });
            }
            if (addPlaylistId) {
                actions.push({
                    action: 'ACTION_ADD_PLAYLIST',
                    addedFullListId: addPlaylistId,
                });
            }
            body['actions'] = actions;
            const endpoint = 'browse/edit_playlist';
            const response = await this._sendRequest(endpoint, body);
            return 'status' in response ? response['status'] : response;
        }
        /**
         * Delete a playlist.
         * @param {string} [playlistId] Playlist id.
         * @returns Status String or full response.
         */
        async deletePlaylist(playlistId) {
            this._checkAuth();
            const body = { playlistId: (0, utils_1.validatePlaylistId)(playlistId) };
            const endpoint = 'playlist/delete';
            const response = await this._sendRequest(endpoint, body);
            return 'status' in response ? response['status'] : response;
        }
        /**
         * Add songs to an existing playlist
         * @param playlistId Playlist id.
         * @param {string[]} [options.videoIds] IDs of songs to create the playlist with.
         * @param {string} [options.sourcePlaylist] Another playlist whose songs should be added to the new playlist.
         * @param {boolean} [options.duplicates=false]  If true, duplicates will be added. If false, an error will be returned if there are duplicates (no items are added to the playlist)
         * @returns Status String and an object containing the new setVideoId for each videoId or full response.
         */
        async addPlaylistItems(playlistId, options) {
            var _a;
            this._checkAuth();
            const { videoIds, sourcePlaylist, duplicates } = options;
            const body = {
                playlistId: (0, utils_1.validatePlaylistId)(playlistId),
                actions: [],
            };
            if (!videoIds && !sourcePlaylist) {
                throw new Error('You must provide either videoIds or a source_playlist to add to the playlist');
            }
            if (videoIds) {
                for (const videoId of videoIds) {
                    const action = {
                        action: 'ACTION_ADD_VIDEO',
                        addedVideoId: videoId,
                    };
                    if (duplicates) {
                        action['dedupeOption'] = 'DEDUPE_OPTION_SKIP';
                    }
                    body['actions'].push(action);
                }
            }
            if (sourcePlaylist) {
                body['actions'].push({
                    action: 'ACTION_ADD_PLAYLIST',
                    addedFullListId: sourcePlaylist,
                });
                // add an empty ACTION_ADD_VIDEO because otherwise
                // YTM doesn't return the dict that maps videoIds to their new setVideoIds
                if (!videoIds) {
                    body['actions'].push({
                        action: 'ACTION_ADD_VIDEO',
                        addedVideoId: null,
                    });
                }
            }
            const endpoint = 'browse/edit_playlist';
            const response = await this._sendRequest(endpoint, body);
            if ('status' in response && response['status'].includes('SUCCEEDED')) {
                const resultArray = [
                    ((_a = response['playlistEditResults']) !== null && _a !== void 0 ? _a : []).map((resultData) => resultData['playlistEditVideoAddedResultData']),
                ];
                return { status: response['status'], playlistEditResults: resultArray };
            }
            else {
                return response;
            }
        }
        /**
         * Remove songs from an existing playlist.
         * @param playlistId: Playlist id.
         * @param videos: List of PlaylistItems, see `getPlaylist`.
         *
         */
        async removePlaylistItems(playlistId, videos) {
            this._checkAuth();
            videos = videos.filter((x) => 'videoId' in x && 'setVideoId' in x);
            if (videos.length == 0) {
                throw new Error('Cannot remove songs, because setVideoId is missing. Do you own this playlist?');
            }
            const body = {
                playlistId: (0, utils_1.validatePlaylistId)(playlistId),
                actions: [],
            };
            for (const video of videos) {
                body['actions'].push({
                    setVideoId: video['setVideoId'],
                    removedVideoId: video['videoId'],
                    action: 'ACTION_REMOVE_VIDEO',
                });
            }
            const endpoint = 'browse/edit_playlist';
            const response = await this._sendRequest(endpoint, body);
            return 'status' in response ? response['status'] : response;
        }
    };
};
exports.PlaylistsMixin = PlaylistsMixin;
