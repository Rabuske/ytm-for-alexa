import { GConstructor, Mixin } from './.mixin.helper';
import * as pt from './playlists.types';
export type PlaylistsMixin = Mixin<typeof PlaylistsMixin>;
/**
 * @module Playlists
 */
export declare const PlaylistsMixin: <TBase extends GConstructor<{
    getMoodCategories(): Promise<import("./explore.types").getMoodCategoriesReturn>;
    getMoodPlaylists(params: string): Promise<import("../parsers/browsing.types").parsePlaylistReturn[]>;
    getCharts(country?: string): Promise<import("./explore.types").getChartsReturn<string>>;
    getWatchPlaylist(watchPlaylist: import("./watch.types").getWatchPlaylistOptions): Promise<import("./watch.types").getWatchPlaylistReturn>;
    getWatchPlaylistShuffle(options: import("./watch.types").getWatchPlaylistShuffleOptions): Promise<any>;
    getHome(limit?: number): Promise<import("../parsers/browsing.types").parseHomeReturn>;
    getArtist(channelId: string): Promise<import("./browsing.types").getArtistReturn>;
    getArtistAlbums(channelId: string, params: string): Promise<import("../parsers/library.types").parseAlbumsReturn>;
    getUser(channelId: string): Promise<import("./browsing.types").getUserReturn>;
    getUserPlaylists(channelId: string, params: string): Promise<import("../parsers/browsing.types").parsePlaylistReturn[]>;
    getSongRelated(browseId: string): Promise<any[]>;
    getAlbumBrowseId(audioPlaylistId: `OLAK5uy_${string}`): Promise<`MPREb_${string}`>;
    getAlbum(browseId: string): Promise<import("./browsing.types").getAlbumReturn>;
    getSong(videoId: string, signatureTimestamp?: number): Promise<import("./browsing.types").getSongRequest<string, string>>;
    getLyrics(browseId: string): Promise<import("./browsing.types").getLyricsReturn>;
    getBaseJSUrl(): Promise<string>;
    getSignatureTimestamp(url?: string): Promise<number>;
    "__#2@#auth": string;
    _httpsAgent: import("https").Agent;
    _proxies?: false | import("axios").AxiosProxyConfig;
    _headers: import("../types").Headers;
    _context: any;
    "__#2@#language": string;
    _parser: import("../parsers/browsing").Parser;
    _sapisid: any;
    _cookies: Record<string, any>;
    _sendRequest<T extends Record<string, any>>(endpoint: string, body: Record<string, any>, additionalParams?: string): Promise<T>;
    _sendGetRequest(url: string, params?: Record<string, any>): Promise<string>;
    checkAuth(): any;
    _checkAuth(): void;
    getAuth(): string;
    changeLanguage(language: string): Promise<void>;
    getLanguage(): string;
    getProxy(): boolean | import("axios").AxiosProxyConfig;
} & {
    getWatchPlaylist(watchPlaylist: import("./watch.types").getWatchPlaylistOptions): Promise<import("./watch.types").getWatchPlaylistReturn>;
    getWatchPlaylistShuffle(options: import("./watch.types").getWatchPlaylistShuffleOptions): Promise<any>;
    getHome(limit?: number): Promise<import("../parsers/browsing.types").parseHomeReturn>;
    getArtist(channelId: string): Promise<import("./browsing.types").getArtistReturn>;
    getArtistAlbums(channelId: string, params: string): Promise<import("../parsers/library.types").parseAlbumsReturn>;
    getUser(channelId: string): Promise<import("./browsing.types").getUserReturn>;
    getUserPlaylists(channelId: string, params: string): Promise<import("../parsers/browsing.types").parsePlaylistReturn[]>;
    getSongRelated(browseId: string): Promise<any[]>;
    getAlbumBrowseId(audioPlaylistId: `OLAK5uy_${string}`): Promise<`MPREb_${string}`>;
    getAlbum(browseId: string): Promise<import("./browsing.types").getAlbumReturn>;
    getSong(videoId: string, signatureTimestamp?: number): Promise<import("./browsing.types").getSongRequest<string, string>>;
    getLyrics(browseId: string): Promise<import("./browsing.types").getLyricsReturn>;
    getBaseJSUrl(): Promise<string>;
    getSignatureTimestamp(url?: string): Promise<number>;
    "__#2@#auth": string;
    _httpsAgent: import("https").Agent;
    _proxies?: false | import("axios").AxiosProxyConfig;
    _headers: import("../types").Headers;
    _context: any;
    "__#2@#language": string;
    _parser: import("../parsers/browsing").Parser;
    _sapisid: any;
    _cookies: Record<string, any>;
    _sendRequest<T extends Record<string, any>>(endpoint: string, body: Record<string, any>, additionalParams?: string): Promise<T>;
    _sendGetRequest(url: string, params?: Record<string, any>): Promise<string>;
    checkAuth(): any;
    _checkAuth(): void;
    getAuth(): string;
    changeLanguage(language: string): Promise<void>;
    getLanguage(): string;
    getProxy(): boolean | import("axios").AxiosProxyConfig;
} & {
    getHome(limit?: number): Promise<import("../parsers/browsing.types").parseHomeReturn>;
    getArtist(channelId: string): Promise<import("./browsing.types").getArtistReturn>;
    getArtistAlbums(channelId: string, params: string): Promise<import("../parsers/library.types").parseAlbumsReturn>;
    getUser(channelId: string): Promise<import("./browsing.types").getUserReturn>;
    getUserPlaylists(channelId: string, params: string): Promise<import("../parsers/browsing.types").parsePlaylistReturn[]>;
    getSongRelated(browseId: string): Promise<any[]>;
    getAlbumBrowseId(audioPlaylistId: `OLAK5uy_${string}`): Promise<`MPREb_${string}`>;
    getAlbum(browseId: string): Promise<import("./browsing.types").getAlbumReturn>;
    getSong(videoId: string, signatureTimestamp?: number): Promise<import("./browsing.types").getSongRequest<string, string>>;
    getLyrics(browseId: string): Promise<import("./browsing.types").getLyricsReturn>;
    getBaseJSUrl(): Promise<string>;
    getSignatureTimestamp(url?: string): Promise<number>;
    "__#2@#auth": string;
    _httpsAgent: import("https").Agent;
    _proxies?: false | import("axios").AxiosProxyConfig;
    _headers: import("../types").Headers;
    _context: any;
    "__#2@#language": string;
    _parser: import("../parsers/browsing").Parser;
    _sapisid: any;
    _cookies: Record<string, any>;
    _sendRequest<T extends Record<string, any>>(endpoint: string, body: Record<string, any>, additionalParams?: string): Promise<T>;
    _sendGetRequest(url: string, params?: Record<string, any>): Promise<string>;
    checkAuth(): any;
    _checkAuth(): void;
    getAuth(): string;
    changeLanguage(language: string): Promise<void>;
    getLanguage(): string;
    getProxy(): boolean | import("axios").AxiosProxyConfig;
} & import("../ytmusic")._YTMusic>>(Base: TBase) => {
    new (...args: any[]): {
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
        getPlaylist(playlistId: string, limit?: number): Promise<pt.getPlaylistReturn>;
        /**
         * Gets suggested tracks to add to a playlist. Suggestions are offered for playlists with less than 100 tracks
         * @param suggestionsToken Token returned by `getPlaylist` or this function
         * @returns Object containing suggested `tracks` and a `refresh_token` to get another set of suggestions.
         * For data format of tracks, check `getPlaylist`
         */
        getPlaylistSuggestions(suggestionsToken: string): Promise<Record<string, any>>;
        /**
         * Creates a new empty playlist and returns its id.
         * @param title Playlist title.
         * @param options
         * @param {string} [options.description] Optional. Playlist description.
         * @param {string} [options.privacyStatus='PRIVATE'] Playlists can be 'PUBLIC', 'PRIVATE', or 'UNLISTED'. Default: 'PRIVATE'.
         * @param {string[]} [options.videoIds] IDs of songs to create the playlist with.
         * @param {string} [options.sourcePlaylist] Another playlist whose songs should be added to the new playlist.
         * @returns ID of the YouTube playlist or full response if there was an error.
         */
        createPlaylist(title: string, options?: {
            description?: string;
            privacyStatus?: pt.PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>;
        /**
         * Creates a new empty playlist and returns its id.
         * @param title Playlist title.
         * @param options
         * @param {string} [options.description] Optional. Playlist description.
         * @param {string} [options.privacyStatus='PRIVATE'] Playlists can be 'PUBLIC', 'PRIVATE', or 'UNLISTED'. Default: 'PRIVATE'.
         * @param {string[]} [options.videoIds] IDs of songs to create the playlist with.
         * @param {string} [options.sourcePlaylist] Another playlist whose songs should be added to the new playlist.
         * @returns ID of the YouTube playlist or full response if there was an error.
         */
        createPlaylist(title: string, description?: string, options?: {
            privacyStatus?: pt.PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>;
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
        editPlaylist(playlistId: string, options: {
            title?: string;
            description?: string | null;
            privacyStatus?: pt.PrivacyStatus;
            moveItem?: [
                string,
                string
            ];
            addPlaylistId?: string;
        }): Promise<string | Record<string, any>>;
        /**
         * Delete a playlist.
         * @param {string} [playlistId] Playlist id.
         * @returns Status String or full response.
         */
        deletePlaylist(playlistId: string): Promise<string | Record<string, any>>;
        /**
         * Add songs to an existing playlist
         * @param playlistId Playlist id.
         * @param {string[]} [options.videoIds] IDs of songs to create the playlist with.
         * @param {string} [options.sourcePlaylist] Another playlist whose songs should be added to the new playlist.
         * @param {boolean} [options.duplicates=false]  If true, duplicates will be added. If false, an error will be returned if there are duplicates (no items are added to the playlist)
         * @returns Status String and an object containing the new setVideoId for each videoId or full response.
         */
        addPlaylistItems(playlistId: string, options: {
            videoIds: string[];
            sourcePlaylist: string;
            duplicates: boolean;
        }): Promise<pt.addPlaylistItemsReturn>;
        /**
         * Remove songs from an existing playlist.
         * @param playlistId: Playlist id.
         * @param videos: List of PlaylistItems, see `getPlaylist`.
         *
         */
        removePlaylistItems(playlistId: string, videos: Array<Record<string, any>>): Promise<string | pt.getPlaylistReturn['tracks']>;
        getMoodCategories(): Promise<import("./explore.types").getMoodCategoriesReturn>;
        getMoodPlaylists(params: string): Promise<import("../parsers/browsing.types").parsePlaylistReturn[]>;
        getCharts(country?: string): Promise<import("./explore.types").getChartsReturn<string>>;
        getWatchPlaylist(watchPlaylist: import("./watch.types").getWatchPlaylistOptions): Promise<import("./watch.types").getWatchPlaylistReturn>;
        getWatchPlaylistShuffle(options: import("./watch.types").getWatchPlaylistShuffleOptions): Promise<any>;
        getHome(limit?: number): Promise<import("../parsers/browsing.types").parseHomeReturn>;
        getArtist(channelId: string): Promise<import("./browsing.types").getArtistReturn>;
        getArtistAlbums(channelId: string, params: string): Promise<import("../parsers/library.types").parseAlbumsReturn>;
        getUser(channelId: string): Promise<import("./browsing.types").getUserReturn>;
        getUserPlaylists(channelId: string, params: string): Promise<import("../parsers/browsing.types").parsePlaylistReturn[]>;
        getSongRelated(browseId: string): Promise<any[]>;
        getAlbumBrowseId(audioPlaylistId: `OLAK5uy_${string}`): Promise<`MPREb_${string}`>;
        getAlbum(browseId: string): Promise<import("./browsing.types").getAlbumReturn>;
        getSong(videoId: string, signatureTimestamp?: number): Promise<import("./browsing.types").getSongRequest<string, string>>;
        getLyrics(browseId: string): Promise<import("./browsing.types").getLyricsReturn>;
        getBaseJSUrl(): Promise<string>;
        getSignatureTimestamp(url?: string): Promise<number>;
        "__#2@#auth": string;
        _httpsAgent: import("https").Agent;
        _proxies?: false | import("axios").AxiosProxyConfig;
        _headers: import("../types").Headers;
        _context: any;
        "__#2@#language": string;
        _parser: import("../parsers/browsing").Parser;
        _sapisid: any;
        _cookies: Record<string, any>;
        _sendRequest<T extends Record<string, any>>(endpoint: string, body: Record<string, any>, additionalParams?: string): Promise<T>;
        _sendGetRequest(url: string, params?: Record<string, any>): Promise<string>;
        checkAuth(): any;
        _checkAuth(): void;
        getAuth(): string;
        changeLanguage(language: string): Promise<void>;
        getLanguage(): string;
        getProxy(): boolean | import("axios").AxiosProxyConfig;
    };
} & TBase;
