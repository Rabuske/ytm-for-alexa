"use strict";
/**
 * @module Uploads
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsMixin = void 0;
const helpers_1 = require("../helpers");
const parsers_1 = require("../parsers");
const albums_1 = require("../parsers/albums");
const library_1 = require("../parsers/library");
const uploads_1 = require("../parsers/uploads");
const continuations_1 = require("../parsers/continuations");
const fs_1 = require("fs");
const path_1 = require("path");
const utf8_1 = __importDefault(require("utf8"));
const axios_1 = __importDefault(require("axios"));
const _utils_1 = require("./_utils");
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const UploadsMixin = (Base) => {
    return class UploadsMixin extends Base {
        async getLibraryUploadSongs(options, order) {
            this._checkAuth();
            const { limit = 25, order: _order } = typeof options == 'object' ? options : { limit: options, order: order };
            const endpoint = 'browse';
            const body = {
                browseId: 'FEmusic_library_privately_owned_tracks',
            };
            (0, _utils_1.validateOrderParameters)(_order);
            if (_order) {
                body['params'] = (0, _utils_1.prepareOrderParams)(_order);
            }
            const response = await this._sendRequest(endpoint, body);
            let results = (0, parsers_1.findObjectByKey)((0, parsers_1.nav)(response, [...parsers_1.SINGLE_COLUMN_TAB, ...parsers_1.SECTION_LIST]), 'itemSectionRenderer');
            results = (0, parsers_1.nav)(results, parsers_1.ITEM_SECTION);
            if (!results['musicShelfRenderer']) {
                return [];
            }
            else {
                results = results['musicShelfRenderer'];
            }
            let songs = [];
            songs = [...(0, uploads_1.parseUploadedItems)(results['contents'].slice(1))];
            if ('continuations' in results) {
                const requestFunc = async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams);
                songs = [
                    ...songs,
                    ...(await (0, continuations_1.getContinuations)(results, 'musicShelfContinuation', limit - songs.length, requestFunc, uploads_1.parseUploadedItems)),
                ];
            }
            return songs;
        }
        async getLibraryUploadAlbums(options, order) {
            this._checkAuth();
            const { limit = 25, order: _order } = typeof options == 'object' ? options : { limit: options, order: order };
            const body = {
                browseId: 'FEmusic_library_privately_owned_releases',
            };
            (0, _utils_1.validateOrderParameters)(_order);
            if (_order) {
                body['params'] = (0, _utils_1.prepareOrderParams)(_order);
            }
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            return await (0, library_1.parseLibraryAlbums)(response, async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams), limit);
        }
        async getLibraryUploadArtists(options, order) {
            this._checkAuth();
            const { limit = 25, order: _order } = typeof options == 'object' ? options : { limit: options, order: order };
            const body = {
                browseId: 'FEmusic_library_privately_owned_artists',
            };
            (0, _utils_1.validateOrderParameters)(_order);
            if (_order) {
                body['params'] = (0, _utils_1.prepareOrderParams)(_order);
            }
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            return (0, library_1.parseLibraryArtists)(response, async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams), limit);
        }
        /**
         * Returns a list of uploaded tracks for the artist.
         * @param {string} [browseId] Browse id of the upload artist, i.e. from `get_library_upload_songs`.
         * @param {number} [limit=25]  Number of songs to return (increments of 25).
         * @example
         * [
         *   {
         *     "entityId": "t_po_CICr2crg7OWpchDKwoakAQ",
         *     "videoId": "Dtffhy8WJgw",
         *     "title": "Hold Me (Original Mix)",
         *     "artists": [
         *       {
         *         "name": "Jakko",
         *         "id": "FEmusic_library_privately_owned_artist_detaila_po_CICr2crg7OWpchIFamFra28"
         *       }
         *     ],
         *     "album": null,
         *     "likeStatus": "LIKE",
         *     "thumbnails": [...]
         *   }
         * ]
         */
        async getLibraryUploadArtist(browseId, limit = 25) {
            this._checkAuth();
            const body = { browseId: browseId };
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            const results = (0, parsers_1.nav)(response, [
                ...parsers_1.SINGLE_COLUMN_TAB,
                ...parsers_1.SECTION_LIST_ITEM,
                ...parsers_1.MUSIC_SHELF,
            ]);
            if (results['contents'].results > 1) {
                results['contents'].pop(0);
            }
            let items = (0, uploads_1.parseUploadedItems)(results['contents']);
            if ('continuations' in results) {
                const requestFunc = async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams);
                const parseFunc = (contents) => (0, uploads_1.parseUploadedItems)(contents);
                items = [
                    ...items,
                    ...(await (0, continuations_1.getContinuations)(results, 'musicShelfContinuation', limit, requestFunc, parseFunc)),
                ];
            }
            return items;
        }
        /**
         * Get information and tracks of an album associated with uploaded tracks
         * @param {string} [browseId] Browse id of the upload album, i.e. from `getLibraryUploadSongs`
         * @return Object with title, description, artist, and tracks.
         * @example
         * {
         *   "title": "18 Months",
         *   "type": "Album",
         *   "thumbnails": [...],
         *   "trackCount": 7,
         *   "duration": "24 minutes",
         *   "audioPlaylistId": "MLPRb_po_55chars",
         *   "tracks": [
         *     {
         *       "entityId": "t_po_22chars",
         *       "videoId": "FVo-UZoPygI",
         *       "title": "Feel So Close",
         *       "duration": "4:15",
         *       "duration_seconds": 255,
         *       "artists": None,
         *       "album": {
         *         "name": "18 Months",
         *         "id": "FEmusic_library_privately_owned_release_detailb_po_55chars"
         *       },
         *       "likeStatus": "INDIFFERENT",
         *       "thumbnails": None
         *     }
         *   ]
         * }
         */
        async getLibraryUploadAlbum(browseId) {
            this._checkAuth();
            const body = { browseId: browseId };
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            const album = (0, albums_1.parseAlbumHeader)(response);
            const results = (0, parsers_1.nav)(response, [
                ...parsers_1.SINGLE_COLUMN_TAB,
                ...parsers_1.SECTION_LIST_ITEM,
                ...parsers_1.MUSIC_SHELF,
            ]);
            album['tracks'] = (0, uploads_1.parseUploadedItems)(results['contents']);
            album['duration_seconds'] = (0, helpers_1.sumTotalDuration)(album);
            return album;
        }
        /**
         * Uploads a song to YouTube Music.
         * @param filepath Path to the music file (mp3, m4a, wma, flac or ogg).
         * @returns Status String or full response.
         */
        async uploadSong(filepath) {
            var _a;
            this._checkAuth();
            if (!(0, fs_1.existsSync)(filepath)) {
                throw new Error('The provided file does not exist.');
            }
            const supportedFiletypes = ['mp3', 'm4a', 'wma', 'flac', 'ogg'];
            if (supportedFiletypes.includes((0, path_1.extname)(filepath))) {
                throw new Error('The provided file type is not supported by YouTube Music. Supported file types are ' +
                    supportedFiletypes.join(', '));
            }
            const headers = this._headers;
            let uploadUrl = `https://upload.youtube.com/upload/usermusic/http?authuser=${headers['x-goog-authuser']}`;
            const filesize = (0, fs_1.statSync)(filepath).size;
            const body = 'filename=' + utf8_1.default.encode((0, path_1.basename)(filepath));
            delete headers['content-encoding'];
            headers['content-type'] =
                'application/x-www-form-urlencoded;charset=utf-8';
            headers['X-Goog-Upload-Command'] = 'start';
            headers['X-Goog-Upload-Header-Content-Length'] = filesize;
            headers['X-Goog-Upload-Protocol'] = 'resumable';
            const response = await axios_1.default.post(uploadUrl, body, {
                headers: headers,
                proxy: this._proxies,
            });
            headers['X-Goog-Upload-Command'] = 'upload, finalize';
            headers['X-Goog-Upload-Offset'] = '0';
            uploadUrl =
                (_a = response.headers['X-Goog-Upload-URL']) !== null && _a !== void 0 ? _a : response.headers['x-goog-upload-url'];
            const data = (0, fs_1.readFileSync)(filepath);
            const response2 = await axios_1.default.post(uploadUrl, data, {
                headers: headers,
                proxy: this._proxies,
            });
            if (response2.status == 200) {
                return 'STATUS_SUCCEEDED';
            }
            else {
                return response2;
            }
        }
        /**
         * Deletes a previously uploaded song or album.
         * @param entityId The entity id of the uploaded song or album,
         * e.g. retrieved from `getLibraryUploadSongs`
         * @return Status String or error.
         */
        async deleteUploadEntity(entityId) {
            this._checkAuth();
            const endpoint = 'music/delete_privately_owned_entity';
            if (entityId.includes('FEmusic_library_privately_owned_release_detail')) {
                entityId = entityId.replace('FEmusic_library_privately_owned_release_detail', '');
            }
            const body = { entityId: entityId };
            const response = await this._sendRequest(endpoint, body);
            if (!response['error']) {
                return 'STATUS_SUCCEEDED';
            }
            else {
                return response['error'];
            }
        }
    };
};
exports.UploadsMixin = UploadsMixin;
