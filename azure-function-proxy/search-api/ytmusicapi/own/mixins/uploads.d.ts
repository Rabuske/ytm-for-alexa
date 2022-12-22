/**
 * @module Uploads
 */
import { GConstructor, Mixin } from './.mixin.helper';
import * as ut from './uploads.types';
export type UploadsMixin = Mixin<typeof UploadsMixin>;
export declare const UploadsMixin: <TBase extends GConstructor<{
    getLibraryPlaylists(limit?: number): Promise<import("../parsers/browsing.types").parsePlaylistReturn[]>;
    getLibrarySongs(options?: {
        limit?: number;
        validateResponse?: boolean;
        order?: import("./library.types").Order;
    }): Promise<import("../parsers/playlists.types").parsePlaylistItemsReturn>;
    getLibraryAlbums(options?: {
        limit?: number;
        order?: import("./library.types").Order;
    }): Promise<import("./library.types").getLibraryAlbumsReturn>;
    getLibraryArtists(options?: {
        limit?: number;
        order?: import("./library.types").Order;
    }): Promise<import("./library.types").getLibraryArtistsReturn>;
    getLibrarySubscriptions(options?: {
        limit?: number;
        order?: import("./library.types").Order;
    }): Promise<import("./library.types").getLibraryArtistsReturn>;
    getLikedSongs(limit?: number): Promise<any>;
    getHistory(): Promise<import("./library.types").getHistoryReturn>;
    removeHistoryItems(feedbackTokens: any[]): Promise<Record<string, any>>;
    rateSong(videoId: string, rating?: import("./library.types").Rating): Promise<Record<string, any>>;
    editSongLibraryStatus(feedbackTokens: string[]): Promise<Record<string, any>>;
    ratePlaylist(playlistId: string, rating?: import("./library.types").Rating): Promise<Record<string, any>>;
    subscribeArtists(channelIds: string[]): Promise<Record<string, any>>;
    unsubscribeArtists(channelIds: string[]): Promise<Record<string, any>>;
    getPlaylist(playlistId: string, limit?: number): Promise<import("./playlists.types").getPlaylistReturn>;
    getPlaylistSuggestions(suggestionsToken: string): Promise<Record<string, any>>;
    createPlaylist(title: string, options?: {
        description?: string;
        privacyStatus?: import("./playlists.types").PrivacyStatus;
        videoIds?: string[];
        sourcePlaylist?: string;
    }): Promise<string | Record<string, any>>; /**
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
    createPlaylist(title: string, description?: string, options?: {
        privacyStatus?: import("./playlists.types").PrivacyStatus;
        videoIds?: string[];
        sourcePlaylist?: string;
    }): Promise<string | Record<string, any>>; /**
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
    removePlaylistItems(playlistId: string, videos: Record<string, any>[]): Promise<string | import("../parsers/playlists.types").parsePlaylistItemsReturn>;
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
    getPlaylist(playlistId: string, limit?: number): Promise<import("./playlists.types").getPlaylistReturn>;
    getPlaylistSuggestions(suggestionsToken: string): Promise<Record<string, any>>;
    createPlaylist(title: string, options?: {
        description?: string;
        privacyStatus?: import("./playlists.types").PrivacyStatus;
        videoIds?: string[];
        sourcePlaylist?: string;
    }): Promise<string | Record<string, any>>; /**
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
    createPlaylist(title: string, description?: string, options?: {
        privacyStatus?: import("./playlists.types").PrivacyStatus;
        videoIds?: string[];
        sourcePlaylist?: string;
    }): Promise<string | Record<string, any>>; /**
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
    removePlaylistItems(playlistId: string, videos: Record<string, any>[]): Promise<string | import("../parsers/playlists.types").parsePlaylistItemsReturn>;
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
         * Returns a list of uploaded songs
         * @param {ut.uploadsOptions} [options=] Options object.
         * @param {number} [options.limit=25] How many songs to return.
         * @param {ut.Order} [options.order] Order of songs to return.
         * @return Array of uploaded songs.
         * @example <caption>Each item is in the following format</caption>
         * {
         *   "entityId": "t_po_CICr2crg7OWpchDpjPjrBA",
         *   "videoId": "Uise6RPKoek",
         *   "artists": [{
         *     'name': 'Coldplay',
         *     'id': 'FEmusic_library_privately_owned_artist_detaila_po_CICr2crg7OWpchIIY29sZHBsYXk',
         *   }],
         *   "title": "A Sky Full Of Stars",
         *   "album": "Ghost Stories",
         *   "likeStatus": "LIKE",
         *   "thumbnails": [...]
         * }
         */
        getLibraryUploadSongs(options?: ut.uploadsOptions): Promise<ut.getLibraryUploadSongsReturn>;
        /**
         * Returns a list of uploaded songs
         * @param {ut.uploadsOptions} [options=] Options object.
         * @param {number} [options.limit=25] How many songs to return.
         * @param {ut.Order} [options.order] Order of songs to return.
         * @return Array of uploaded songs.
         * @example <caption>Each item is in the following format</caption>
         * {
         *   "entityId": "t_po_CICr2crg7OWpchDpjPjrBA",
         *   "videoId": "Uise6RPKoek",
         *   "artists": [{
         *     'name': 'Coldplay',
         *     'id': 'FEmusic_library_privately_owned_artist_detaila_po_CICr2crg7OWpchIIY29sZHBsYXk',
         *   }],
         *   "title": "A Sky Full Of Stars",
         *   "album": "Ghost Stories",
         *   "likeStatus": "LIKE",
         *   "thumbnails": [...]
         * }
         */
        getLibraryUploadSongs(limit?: number, order?: ut.Order): Promise<ut.getLibraryUploadSongsReturn>;
        /**
         * Gets the albums of uploaded songs in the user's library.
         * @param {ut.uploadsOptions} [options=] Options object.
         * @param {number} [options.limit=25] How many songs to return.
         * @param {ut.Order} [options.order] Order of songs to return.
         * @return Array of albums as returned by `getLibraryAlbums`
         */
        getLibraryUploadAlbums(options?: ut.uploadsOptions): Promise<ut.getLibraryUploadAlbumsReturn>;
        /**
         * Gets the albums of uploaded songs in the user's library.
         * @param {ut.uploadsOptions} [options=] Options object.
         * @param {number} [options.limit=25] How many songs to return.
         * @param {ut.Order} [options.order] Order of songs to return.
         * @return Array of albums as returned by `getLibraryAlbums`
         */
        getLibraryUploadAlbums(limit?: number, order?: ut.Order): Promise<ut.getLibraryUploadAlbumsReturn>;
        /**
         * Gets the artists of uploaded songs in the user's library.
         * @param {ut.uploadsOptions} [options=] Options object.
         * @param {number} [options.limit=25] How many songs to return.
         * @param {ut.Order} [options.order] Order of songs to return.
         * @return Array of artists as returned by `getLibraryArtists`
         */
        getLibraryUploadArtists(options?: ut.uploadsOptions): Promise<ut.getLibraryUploadArtistsReturn>;
        /**
         * Gets the artists of uploaded songs in the user's library.
         * @param {ut.uploadsOptions} [options=] Options object.
         * @param {number} [options.limit=25] How many songs to return.
         * @param {ut.Order} [options.order] Order of songs to return.
         * @return Array of artists as returned by `getLibraryArtists`
         */
        getLibraryUploadArtists(limit?: number, order?: ut.Order): Promise<ut.getLibraryUploadArtistsReturn>;
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
        getLibraryUploadArtist(browseId: string, limit?: number): Promise<ut.getLibraryUploadArtistReturn>;
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
        getLibraryUploadAlbum(browseId: string): Promise<ut.getLibraryUploadAlbumReturn>;
        /**
         * Uploads a song to YouTube Music.
         * @param filepath Path to the music file (mp3, m4a, wma, flac or ogg).
         * @returns Status String or full response.
         */
        uploadSong(filepath: string): Promise<'STATUS_SUCCEEDED' | Record<string, any>>;
        /**
         * Deletes a previously uploaded song or album.
         * @param entityId The entity id of the uploaded song or album,
         * e.g. retrieved from `getLibraryUploadSongs`
         * @return Status String or error.
         */
        deleteUploadEntity(entityId: string): Promise<'STATUS_SUCCEEDED' | Record<string, any>>;
        getLibraryPlaylists(limit?: number): Promise<import("../parsers/browsing.types").parsePlaylistReturn[]>;
        getLibrarySongs(options?: {
            limit?: number;
            validateResponse?: boolean;
            order?: import("./library.types").Order;
        }): Promise<import("../parsers/playlists.types").parsePlaylistItemsReturn>;
        getLibraryAlbums(options?: {
            limit?: number;
            order?: import("./library.types").Order;
        }): Promise<import("./library.types").getLibraryAlbumsReturn>;
        getLibraryArtists(options?: {
            limit?: number;
            order?: import("./library.types").Order;
        }): Promise<import("./library.types").getLibraryArtistsReturn>;
        getLibrarySubscriptions(options?: {
            limit?: number;
            order?: import("./library.types").Order;
        }): Promise<import("./library.types").getLibraryArtistsReturn>;
        getLikedSongs(limit?: number): Promise<any>;
        getHistory(): Promise<import("./library.types").getHistoryReturn>;
        removeHistoryItems(feedbackTokens: any[]): Promise<Record<string, any>>;
        rateSong(videoId: string, rating?: import("./library.types").Rating): Promise<Record<string, any>>;
        editSongLibraryStatus(feedbackTokens: string[]): Promise<Record<string, any>>;
        ratePlaylist(playlistId: string, rating?: import("./library.types").Rating): Promise<Record<string, any>>;
        subscribeArtists(channelIds: string[]): Promise<Record<string, any>>;
        unsubscribeArtists(channelIds: string[]): Promise<Record<string, any>>;
        getPlaylist(playlistId: string, limit?: number): Promise<import("./playlists.types").getPlaylistReturn>;
        getPlaylistSuggestions(suggestionsToken: string): Promise<Record<string, any>>;
        createPlaylist(title: string, options?: {
            description?: string;
            privacyStatus?: import("./playlists.types").PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>; /**
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
        createPlaylist(title: string, description?: string, options?: {
            privacyStatus?: import("./playlists.types").PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>; /**
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
        removePlaylistItems(playlistId: string, videos: Record<string, any>[]): Promise<string | import("../parsers/playlists.types").parsePlaylistItemsReturn>;
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
