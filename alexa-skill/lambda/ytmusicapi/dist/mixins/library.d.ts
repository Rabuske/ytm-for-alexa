import { GConstructor, Mixin } from './.mixin.helper';
import * as lt from './library.types';
import { parsePlaylistReturn } from '../parsers/browsing.types';
import { parsePlaylistItemsReturn } from '../parsers/playlists.types';
import { getPlaylistReturn } from './playlists.types';
export type LibraryMixin = Mixin<typeof LibraryMixin>;
/**
 * @module Library
 */
export declare const LibraryMixin: <TBase extends GConstructor<{
    getPlaylist(playlistId: string, limit?: number): Promise<getPlaylistReturn>;
    getPlaylistSuggestions(suggestionsToken: string): Promise<Record<string, any>>;
    createPlaylist(title: string, options?: {
        description?: string;
        privacyStatus?: import("./playlists.types").PrivacyStatus;
        videoIds?: string[];
        sourcePlaylist?: string;
    }): Promise<string | Record<string, any>>;
    createPlaylist(title: string, description?: string, options?: {
        privacyStatus?: import("./playlists.types").PrivacyStatus;
        videoIds?: string[];
        sourcePlaylist?: string;
    }): Promise<string | Record<string, any>>;
    editPlaylist(playlistId: string, options: {
        title?: string;
        description?: string;
        privacyStatus?: import("./playlists.types").PrivacyStatus;
        moveItem?: [string, string];
        addPlaylistId?: string;
    }): Promise<string | Record<string, any>>;
    deletePlaylist(playlistId: string): Promise<string | Record<string, any>>;
    addPlaylistItems(playlistId: string, options: {
        videoIds: string[];
        sourcePlaylist: string;
        duplicates: boolean;
    }): Promise<import("./playlists.types").addPlaylistItemsReturn>;
    removePlaylistItems(playlistId: string, videos: Record<string, any>[]): Promise<string | parsePlaylistItemsReturn>;
    getMoodCategories(): Promise<import("./explore.types").getMoodCategoriesReturn>;
    getMoodPlaylists(params: string): Promise<parsePlaylistReturn[]>;
    getCharts(country?: string): Promise<import("./explore.types").getChartsReturn<string>>;
    getWatchPlaylist(watchPlaylist: import("./watch.types").getWatchPlaylistOptions): Promise<import("./watch.types").getWatchPlaylistReturn>;
    getWatchPlaylistShuffle(options: import("./watch.types").getWatchPlaylistShuffleOptions): Promise<any>;
    getHome(limit?: number): Promise<import("../parsers/browsing.types").parseHomeReturn>;
    getArtist(channelId: string): Promise<import("./browsing.types").getArtistReturn>;
    getArtistAlbums(channelId: string, params: string): Promise<import("../parsers/library.types").parseAlbumsReturn>;
    getUser(channelId: string): Promise<import("./browsing.types").getUserReturn>;
    getUserPlaylists(channelId: string, params: string): Promise<parsePlaylistReturn[]>;
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
    getMoodCategories(): Promise<import("./explore.types").getMoodCategoriesReturn>;
    getMoodPlaylists(params: string): Promise<parsePlaylistReturn[]>;
    getCharts(country?: string): Promise<import("./explore.types").getChartsReturn<string>>;
    getWatchPlaylist(watchPlaylist: import("./watch.types").getWatchPlaylistOptions): Promise<import("./watch.types").getWatchPlaylistReturn>;
    getWatchPlaylistShuffle(options: import("./watch.types").getWatchPlaylistShuffleOptions): Promise<any>;
    getHome(limit?: number): Promise<import("../parsers/browsing.types").parseHomeReturn>;
    getArtist(channelId: string): Promise<import("./browsing.types").getArtistReturn>;
    getArtistAlbums(channelId: string, params: string): Promise<import("../parsers/library.types").parseAlbumsReturn>;
    getUser(channelId: string): Promise<import("./browsing.types").getUserReturn>;
    getUserPlaylists(channelId: string, params: string): Promise<parsePlaylistReturn[]>;
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
    getUserPlaylists(channelId: string, params: string): Promise<parsePlaylistReturn[]>;
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
    getUserPlaylists(channelId: string, params: string): Promise<parsePlaylistReturn[]>;
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
        getLibraryPlaylists(limit?: number): Promise<parsePlaylistReturn[]>;
        /**
         * Gets the songs in the user's library (liked videos are not included).
         * To get liked songs and videos, use `getLikedSongs`.
         * @param {Object} [options=]
         * @param {number} [options.limit = 25] Limit number of songs to retrieve.
         * @param {boolean} [options.validateResponse = false] Flag indicating if responses from YTM should be validated and retried in case when some songs are missing.
         * @param {lt.Order} [options.order=] Order of songs to return. Allowed values: 'a_to_z', 'z_to_a', 'recently_added'.
         * @return List of songs. Same format as `getPlaylist`
         */
        getLibrarySongs(options?: {
            limit?: number;
            validateResponse?: boolean;
            order?: lt.Order;
        }): Promise<getPlaylistReturn['tracks']>;
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
        getLibraryAlbums(options?: {
            limit?: number;
            order?: lt.Order;
        }): Promise<lt.getLibraryAlbumsReturn>;
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
        getLibraryArtists(options?: {
            limit?: number;
            order?: lt.Order;
        }): Promise<lt.getLibraryArtistsReturn>;
        /**
         * Gets the artists the user has subscribed to.
         * @param options
         * @param {number} [options.limit=25] Number of artists to return.
         * @param {lt.Order} [options.order=]  Order of artists to return. Allowed values: 'a_to_z', 'z_to_a', 'recently_added'.
         * @return List of artists. Same format as `getLibraryArtists`
         */
        getLibrarySubscriptions(options?: {
            limit?: number;
            order?: lt.Order;
        }): Promise<lt.getLibraryArtistsReturn>;
        /**
         * Gets playlist items for the 'Liked Songs' playlist.
         * @param {number} [limit=100] How many items to return.
         * @return List of playlistItem dictionaries. See `getPlaylist`
         */
        getLikedSongs(limit?: number): Promise<ReturnType<any>>;
        /**
         * Gets your play history in reverse chronological order.
         *
         * @return List of playlistItems, see `getPlaylist`.
         *
         * The additional property ``played`` indicates when the playlistItem was played.
         *
         * The additional property ``feedbackToken`` can be used to remove items with `removeHistoryItems`.
         */
        getHistory(): Promise<lt.getHistoryReturn>;
        /**
         * Remove an item from the account's history. This method does currently not work with brand accounts.
         * @param feedbackTokens  Token to identify the item to remove, obtained from `getHistory`.
         * @return Full response.
         */
        removeHistoryItems(feedbackTokens: any[]): Promise<Record<string, any>>;
        /**
         * Rates a song ("thumbs up"/"thumbs down" interactions on YouTube Music).
         * @param {string} [videoId] Video id.
         * @param {string} [rating='INDIFFERENT'] One of 'LIKE', 'DISLIKE', 'INDIFFERENT'.
         * 'INDIFFERENT' removes the playlist/album from the library
         * @return Full response.
         */
        rateSong(videoId: string, rating?: lt.Rating): Promise<Record<string, any>>;
        /**
         * Adds or removes a song from your library depending on the token provided.
         * @param {string[]} [feedbackTokens] List of feedbackTokens obtained from authenticated requests
         * to endpoints that return songs (i.e. `get_album`).
         * @return Full response.
         */
        editSongLibraryStatus(feedbackTokens: string[]): Promise<Record<string, any>>;
        /**
         * Rates a playlist/album ("Add to library"/"Remove from library" interactions on YouTube Music)
         * You can also dislike a playlist/album, which has an effect on your recommendations
         * @param {string} [videoId] Playlist id.
         * @param {string} [rating='INDIFFERENT'] One of 'LIKE', 'DISLIKE', 'INDIFFERENT'.
         * 'INDIFFERENT' removes the playlist/album from the library.
         * @return Full response.
         */
        ratePlaylist(playlistId: string, rating?: lt.Rating): Promise<Record<string, any>>;
        /**
         * Subscribe to artists. Adds the artists to your library.
         * @param channelIds Artist channel ids.
         * @return Full response.
         */
        subscribeArtists(channelIds: string[]): Promise<Record<string, any>>;
        /**
         * Unsubscribe to artists. Removes the artists to your library.
         * @param channelIds Artist channel ids.
         * @return Full response.
         */
        unsubscribeArtists(channelIds: string[]): Promise<Record<string, any>>;
        getPlaylist(playlistId: string, limit?: number): Promise<getPlaylistReturn>;
        getPlaylistSuggestions(suggestionsToken: string): Promise<Record<string, any>>;
        createPlaylist(title: string, options?: {
            description?: string;
            privacyStatus?: import("./playlists.types").PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>;
        createPlaylist(title: string, description?: string, options?: {
            privacyStatus?: import("./playlists.types").PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>;
        editPlaylist(playlistId: string, options: {
            title?: string;
            description?: string;
            privacyStatus?: import("./playlists.types").PrivacyStatus;
            moveItem?: [string, string];
            addPlaylistId?: string;
        }): Promise<string | Record<string, any>>;
        deletePlaylist(playlistId: string): Promise<string | Record<string, any>>;
        addPlaylistItems(playlistId: string, options: {
            videoIds: string[];
            sourcePlaylist: string;
            duplicates: boolean;
        }): Promise<import("./playlists.types").addPlaylistItemsReturn>;
        removePlaylistItems(playlistId: string, videos: Record<string, any>[]): Promise<string | parsePlaylistItemsReturn>;
        getMoodCategories(): Promise<import("./explore.types").getMoodCategoriesReturn>;
        getMoodPlaylists(params: string): Promise<parsePlaylistReturn[]>;
        getCharts(country?: string): Promise<import("./explore.types").getChartsReturn<string>>;
        getWatchPlaylist(watchPlaylist: import("./watch.types").getWatchPlaylistOptions): Promise<import("./watch.types").getWatchPlaylistReturn>;
        getWatchPlaylistShuffle(options: import("./watch.types").getWatchPlaylistShuffleOptions): Promise<any>;
        getHome(limit?: number): Promise<import("../parsers/browsing.types").parseHomeReturn>;
        getArtist(channelId: string): Promise<import("./browsing.types").getArtistReturn>;
        getArtistAlbums(channelId: string, params: string): Promise<import("../parsers/library.types").parseAlbumsReturn>;
        getUser(channelId: string): Promise<import("./browsing.types").getUserReturn>;
        getUserPlaylists(channelId: string, params: string): Promise<parsePlaylistReturn[]>;
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
