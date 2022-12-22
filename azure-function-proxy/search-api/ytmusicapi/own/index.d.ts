import { _YTMusic } from './ytmusic';
/**
 * Allows automated interactions with YouTube Music by emulating the YouTube web client's requests.
 * Permits both authenticated and non-authenticated requests.
 * Authentication header data must be provided on initialization.
 * @param {_YTMusicConstructorOptions} [options=] Options object.
 * @param {string | object} [options.auth=]  Provide a string (raw headers), object, or path (Node only!),
 * Authentication credentials are needed to manage your library.
 * Should be an adjusted version of `headers_auth.json.example` in the project root.
 * See `setup` for how to fill in the correct credentials.
 * If not provided, a default header is used without authentication.
 * @param {string} [options.user=]  Specify a user ID string to use in requests.
 * This is needed if you want to send requests on behalf of a brand account.
 * Otherwise the default account is used. You can retrieve the user ID
 * by going to https://myaccount.google.com/brandaccounts and selecting your brand account.
 * The user ID will be in the URL: https://myaccount.google.com/b/user_id/
 * @param {} [options.httpsAgent] Optional. Define an HTTP proxy for your request.
 * @param {AxiosProxyConfig} [options.proxies] Optional. Define an HTTP proxy for your request.
 * @param {string} [options.language] Optional. Can be used to change the language of returned data.
 * English will be used by default. Available languages can be checked in
 * the ytmusicapi/locales directory.
 */
declare const YTMusic: {
    new (...args: any[]): {
        getLibraryUploadSongs(options?: import("./mixins/uploads.types").uploadsOptions): Promise<import("./mixins/uploads.types").getLibraryUploadSongsReturn>;
        getLibraryUploadSongs(limit?: number, order?: import("./mixins/library.types").Order): Promise<import("./mixins/uploads.types").getLibraryUploadSongsReturn>;
        getLibraryUploadAlbums(options?: import("./mixins/uploads.types").uploadsOptions): Promise<import("./mixins/library.types").getLibraryAlbumsReturn>;
        getLibraryUploadAlbums(limit?: number, order?: import("./mixins/library.types").Order): Promise<import("./mixins/library.types").getLibraryAlbumsReturn>;
        getLibraryUploadArtists(options?: import("./mixins/uploads.types").uploadsOptions): Promise<import("./mixins/library.types").getLibraryArtistsReturn>;
        getLibraryUploadArtists(limit?: number, order?: import("./mixins/library.types").Order): Promise<import("./mixins/library.types").getLibraryArtistsReturn>;
        getLibraryUploadArtist(browseId: string, limit?: number): Promise<import("./mixins/uploads.types").getLibraryUploadArtistReturn>;
        getLibraryUploadAlbum(browseId: string): Promise<import("./mixins/uploads.types").getLibraryUploadAlbumReturn>;
        uploadSong(filepath: string): Promise<Record<string, any> | "STATUS_SUCCEEDED">;
        deleteUploadEntity(entityId: string): Promise<Record<string, any> | "STATUS_SUCCEEDED">;
        getLibraryPlaylists(limit?: number): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getLibrarySongs(options?: {
            limit?: number;
            validateResponse?: boolean;
            order?: import("./mixins/library.types").Order;
        }): Promise<import("./parsers/playlists.types").parsePlaylistItemsReturn>;
        getLibraryAlbums(options?: {
            limit?: number;
            order?: import("./mixins/library.types").Order;
        }): Promise<import("./mixins/library.types").getLibraryAlbumsReturn>;
        getLibraryArtists(options?: {
            limit?: number;
            order?: import("./mixins/library.types").Order;
        }): Promise<import("./mixins/library.types").getLibraryArtistsReturn>;
        getLibrarySubscriptions(options?: {
            limit?: number;
            order?: import("./mixins/library.types").Order;
        }): Promise<import("./mixins/library.types").getLibraryArtistsReturn>;
        getLikedSongs(limit?: number): Promise<any>;
        getHistory(): Promise<import("./mixins/library.types").getHistoryReturn>;
        removeHistoryItems(feedbackTokens: any[]): Promise<Record<string, any>>;
        rateSong(videoId: string, rating?: import("./mixins/library.types").Rating): Promise<Record<string, any>>;
        editSongLibraryStatus(feedbackTokens: string[]): Promise<Record<string, any>>;
        ratePlaylist(playlistId: string, rating?: import("./mixins/library.types").Rating): Promise<Record<string, any>>;
        subscribeArtists(channelIds: string[]): Promise<Record<string, any>>;
        unsubscribeArtists(channelIds: string[]): Promise<Record<string, any>>;
        getPlaylist(playlistId: string, limit?: number): Promise<import("./mixins/playlists.types").getPlaylistReturn>;
        getPlaylistSuggestions(suggestionsToken: string): Promise<Record<string, any>>;
        createPlaylist(title: string, options?: {
            description?: string;
            privacyStatus?: import("./mixins/playlists.types").PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>;
        createPlaylist(title: string, description?: string, options?: {
            privacyStatus?: import("./mixins/playlists.types").PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>;
        editPlaylist(playlistId: string, options: {
            title?: string;
            description?: string;
            privacyStatus?: import("./mixins/playlists.types").PrivacyStatus;
            moveItem?: [string, string];
            addPlaylistId?: string;
        }): Promise<string | Record<string, any>>;
        deletePlaylist(playlistId: string): Promise<string | Record<string, any>>;
        addPlaylistItems(playlistId: string, options: {
            videoIds: string[];
            sourcePlaylist: string;
            duplicates: boolean;
        }): Promise<import("./mixins/playlists.types").addPlaylistItemsReturn>;
        removePlaylistItems(playlistId: string, videos: Record<string, any>[]): Promise<string | import("./parsers/playlists.types").parsePlaylistItemsReturn>;
        getMoodCategories(): Promise<import("./mixins/explore.types").getMoodCategoriesReturn>;
        getMoodPlaylists(params: string): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getCharts(country?: string): Promise<import("./mixins/explore.types").getChartsReturn<string>>;
        getWatchPlaylist(watchPlaylist: import("./mixins/watch.types").getWatchPlaylistOptions): Promise<import("./mixins/watch.types").getWatchPlaylistReturn>;
        getWatchPlaylistShuffle(options: import("./mixins/watch.types").getWatchPlaylistShuffleOptions): Promise<any>;
        getHome(limit?: number): Promise<import("./parsers/browsing.types").parseHomeReturn>;
        getArtist(channelId: string): Promise<import("./mixins/browsing.types").getArtistReturn>;
        getArtistAlbums(channelId: string, params: string): Promise<import("./parsers/library.types").parseAlbumsReturn>;
        getUser(channelId: string): Promise<import("./mixins/browsing.types").getUserReturn>;
        getUserPlaylists(channelId: string, params: string): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getSongRelated(browseId: string): Promise<any[]>;
        getAlbumBrowseId(audioPlaylistId: `OLAK5uy_${string}`): Promise<`MPREb_${string}`>;
        getAlbum(browseId: string): Promise<import("./mixins/browsing.types").getAlbumReturn>;
        getSong(videoId: string, signatureTimestamp?: number): Promise<import("./mixins/browsing.types").getSongRequest<string, string>>;
        getLyrics(browseId: string): Promise<import("./mixins/browsing.types").getLyricsReturn>;
        getBaseJSUrl(): Promise<string>;
        getSignatureTimestamp(url?: string): Promise<number>;
        "__#2@#auth": string;
        _httpsAgent: import("https").Agent;
        _proxies?: false | import("axios").AxiosProxyConfig;
        _headers: import("./types").Headers;
        _context: any;
        "__#2@#language": string;
        _parser: import("./parsers/browsing").Parser;
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
} & {
    new (...args: any[]): {
        getLibraryPlaylists(limit?: number): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getLibrarySongs(options?: {
            limit?: number;
            validateResponse?: boolean;
            order?: import("./mixins/library.types").Order;
        }): Promise<import("./parsers/playlists.types").parsePlaylistItemsReturn>;
        getLibraryAlbums(options?: {
            limit?: number;
            order?: import("./mixins/library.types").Order;
        }): Promise<import("./mixins/library.types").getLibraryAlbumsReturn>;
        getLibraryArtists(options?: {
            limit?: number;
            order?: import("./mixins/library.types").Order;
        }): Promise<import("./mixins/library.types").getLibraryArtistsReturn>;
        getLibrarySubscriptions(options?: {
            limit?: number;
            order?: import("./mixins/library.types").Order;
        }): Promise<import("./mixins/library.types").getLibraryArtistsReturn>;
        getLikedSongs(limit?: number): Promise<any>;
        getHistory(): Promise<import("./mixins/library.types").getHistoryReturn>;
        removeHistoryItems(feedbackTokens: any[]): Promise<Record<string, any>>;
        rateSong(videoId: string, rating?: import("./mixins/library.types").Rating): Promise<Record<string, any>>;
        editSongLibraryStatus(feedbackTokens: string[]): Promise<Record<string, any>>;
        ratePlaylist(playlistId: string, rating?: import("./mixins/library.types").Rating): Promise<Record<string, any>>;
        subscribeArtists(channelIds: string[]): Promise<Record<string, any>>;
        unsubscribeArtists(channelIds: string[]): Promise<Record<string, any>>;
        getPlaylist(playlistId: string, limit?: number): Promise<import("./mixins/playlists.types").getPlaylistReturn>;
        getPlaylistSuggestions(suggestionsToken: string): Promise<Record<string, any>>;
        createPlaylist(title: string, options?: {
            description?: string;
            privacyStatus?: import("./mixins/playlists.types").PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>;
        createPlaylist(title: string, description?: string, options?: {
            privacyStatus?: import("./mixins/playlists.types").PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>;
        editPlaylist(playlistId: string, options: {
            title?: string;
            description?: string;
            privacyStatus?: import("./mixins/playlists.types").PrivacyStatus;
            moveItem?: [string, string];
            addPlaylistId?: string;
        }): Promise<string | Record<string, any>>;
        deletePlaylist(playlistId: string): Promise<string | Record<string, any>>;
        addPlaylistItems(playlistId: string, options: {
            videoIds: string[];
            sourcePlaylist: string;
            duplicates: boolean;
        }): Promise<import("./mixins/playlists.types").addPlaylistItemsReturn>;
        removePlaylistItems(playlistId: string, videos: Record<string, any>[]): Promise<string | import("./parsers/playlists.types").parsePlaylistItemsReturn>;
        getMoodCategories(): Promise<import("./mixins/explore.types").getMoodCategoriesReturn>;
        getMoodPlaylists(params: string): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getCharts(country?: string): Promise<import("./mixins/explore.types").getChartsReturn<string>>;
        getWatchPlaylist(watchPlaylist: import("./mixins/watch.types").getWatchPlaylistOptions): Promise<import("./mixins/watch.types").getWatchPlaylistReturn>;
        getWatchPlaylistShuffle(options: import("./mixins/watch.types").getWatchPlaylistShuffleOptions): Promise<any>;
        getHome(limit?: number): Promise<import("./parsers/browsing.types").parseHomeReturn>;
        getArtist(channelId: string): Promise<import("./mixins/browsing.types").getArtistReturn>;
        getArtistAlbums(channelId: string, params: string): Promise<import("./parsers/library.types").parseAlbumsReturn>;
        getUser(channelId: string): Promise<import("./mixins/browsing.types").getUserReturn>;
        getUserPlaylists(channelId: string, params: string): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getSongRelated(browseId: string): Promise<any[]>;
        getAlbumBrowseId(audioPlaylistId: `OLAK5uy_${string}`): Promise<`MPREb_${string}`>;
        getAlbum(browseId: string): Promise<import("./mixins/browsing.types").getAlbumReturn>;
        getSong(videoId: string, signatureTimestamp?: number): Promise<import("./mixins/browsing.types").getSongRequest<string, string>>;
        getLyrics(browseId: string): Promise<import("./mixins/browsing.types").getLyricsReturn>;
        getBaseJSUrl(): Promise<string>;
        getSignatureTimestamp(url?: string): Promise<number>;
        "__#2@#auth": string;
        _httpsAgent: import("https").Agent;
        _proxies?: false | import("axios").AxiosProxyConfig;
        _headers: import("./types").Headers;
        _context: any;
        "__#2@#language": string;
        _parser: import("./parsers/browsing").Parser;
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
} & {
    new (...args: any[]): {
        getPlaylist(playlistId: string, limit?: number): Promise<import("./mixins/playlists.types").getPlaylistReturn>;
        getPlaylistSuggestions(suggestionsToken: string): Promise<Record<string, any>>;
        createPlaylist(title: string, options?: {
            description?: string;
            privacyStatus?: import("./mixins/playlists.types").PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>;
        createPlaylist(title: string, description?: string, options?: {
            privacyStatus?: import("./mixins/playlists.types").PrivacyStatus;
            videoIds?: string[];
            sourcePlaylist?: string;
        }): Promise<string | Record<string, any>>;
        editPlaylist(playlistId: string, options: {
            title?: string;
            description?: string;
            privacyStatus?: import("./mixins/playlists.types").PrivacyStatus;
            moveItem?: [string, string];
            addPlaylistId?: string;
        }): Promise<string | Record<string, any>>;
        deletePlaylist(playlistId: string): Promise<string | Record<string, any>>;
        addPlaylistItems(playlistId: string, options: {
            videoIds: string[];
            sourcePlaylist: string;
            duplicates: boolean;
        }): Promise<import("./mixins/playlists.types").addPlaylistItemsReturn>;
        removePlaylistItems(playlistId: string, videos: Record<string, any>[]): Promise<string | import("./parsers/playlists.types").parsePlaylistItemsReturn>;
        getMoodCategories(): Promise<import("./mixins/explore.types").getMoodCategoriesReturn>;
        getMoodPlaylists(params: string): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getCharts(country?: string): Promise<import("./mixins/explore.types").getChartsReturn<string>>;
        getWatchPlaylist(watchPlaylist: import("./mixins/watch.types").getWatchPlaylistOptions): Promise<import("./mixins/watch.types").getWatchPlaylistReturn>;
        getWatchPlaylistShuffle(options: import("./mixins/watch.types").getWatchPlaylistShuffleOptions): Promise<any>;
        getHome(limit?: number): Promise<import("./parsers/browsing.types").parseHomeReturn>;
        getArtist(channelId: string): Promise<import("./mixins/browsing.types").getArtistReturn>;
        getArtistAlbums(channelId: string, params: string): Promise<import("./parsers/library.types").parseAlbumsReturn>;
        getUser(channelId: string): Promise<import("./mixins/browsing.types").getUserReturn>;
        getUserPlaylists(channelId: string, params: string): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getSongRelated(browseId: string): Promise<any[]>;
        getAlbumBrowseId(audioPlaylistId: `OLAK5uy_${string}`): Promise<`MPREb_${string}`>;
        getAlbum(browseId: string): Promise<import("./mixins/browsing.types").getAlbumReturn>;
        getSong(videoId: string, signatureTimestamp?: number): Promise<import("./mixins/browsing.types").getSongRequest<string, string>>;
        getLyrics(browseId: string): Promise<import("./mixins/browsing.types").getLyricsReturn>;
        getBaseJSUrl(): Promise<string>;
        getSignatureTimestamp(url?: string): Promise<number>;
        "__#2@#auth": string;
        _httpsAgent: import("https").Agent;
        _proxies?: false | import("axios").AxiosProxyConfig;
        _headers: import("./types").Headers;
        _context: any;
        "__#2@#language": string;
        _parser: import("./parsers/browsing").Parser;
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
} & {
    new (...args: any[]): {
        getMoodCategories(): Promise<import("./mixins/explore.types").getMoodCategoriesReturn>;
        getMoodPlaylists(params: string): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getCharts(country?: string): Promise<import("./mixins/explore.types").getChartsReturn<string>>;
        getWatchPlaylist(watchPlaylist: import("./mixins/watch.types").getWatchPlaylistOptions): Promise<import("./mixins/watch.types").getWatchPlaylistReturn>;
        getWatchPlaylistShuffle(options: import("./mixins/watch.types").getWatchPlaylistShuffleOptions): Promise<any>;
        getHome(limit?: number): Promise<import("./parsers/browsing.types").parseHomeReturn>;
        getArtist(channelId: string): Promise<import("./mixins/browsing.types").getArtistReturn>;
        getArtistAlbums(channelId: string, params: string): Promise<import("./parsers/library.types").parseAlbumsReturn>;
        getUser(channelId: string): Promise<import("./mixins/browsing.types").getUserReturn>;
        getUserPlaylists(channelId: string, params: string): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getSongRelated(browseId: string): Promise<any[]>;
        getAlbumBrowseId(audioPlaylistId: `OLAK5uy_${string}`): Promise<`MPREb_${string}`>;
        getAlbum(browseId: string): Promise<import("./mixins/browsing.types").getAlbumReturn>;
        getSong(videoId: string, signatureTimestamp?: number): Promise<import("./mixins/browsing.types").getSongRequest<string, string>>;
        getLyrics(browseId: string): Promise<import("./mixins/browsing.types").getLyricsReturn>;
        getBaseJSUrl(): Promise<string>;
        getSignatureTimestamp(url?: string): Promise<number>;
        "__#2@#auth": string;
        _httpsAgent: import("https").Agent;
        _proxies?: false | import("axios").AxiosProxyConfig;
        _headers: import("./types").Headers;
        _context: any;
        "__#2@#language": string;
        _parser: import("./parsers/browsing").Parser;
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
} & {
    new (...args: any[]): {
        getWatchPlaylist(watchPlaylist: import("./mixins/watch.types").getWatchPlaylistOptions): Promise<import("./mixins/watch.types").getWatchPlaylistReturn>;
        getWatchPlaylistShuffle(options: import("./mixins/watch.types").getWatchPlaylistShuffleOptions): Promise<any>;
        getHome(limit?: number): Promise<import("./parsers/browsing.types").parseHomeReturn>;
        getArtist(channelId: string): Promise<import("./mixins/browsing.types").getArtistReturn>;
        getArtistAlbums(channelId: string, params: string): Promise<import("./parsers/library.types").parseAlbumsReturn>;
        getUser(channelId: string): Promise<import("./mixins/browsing.types").getUserReturn>;
        getUserPlaylists(channelId: string, params: string): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getSongRelated(browseId: string): Promise<any[]>;
        getAlbumBrowseId(audioPlaylistId: `OLAK5uy_${string}`): Promise<`MPREb_${string}`>;
        getAlbum(browseId: string): Promise<import("./mixins/browsing.types").getAlbumReturn>;
        getSong(videoId: string, signatureTimestamp?: number): Promise<import("./mixins/browsing.types").getSongRequest<string, string>>;
        getLyrics(browseId: string): Promise<import("./mixins/browsing.types").getLyricsReturn>;
        getBaseJSUrl(): Promise<string>;
        getSignatureTimestamp(url?: string): Promise<number>;
        "__#2@#auth": string;
        _httpsAgent: import("https").Agent;
        _proxies?: false | import("axios").AxiosProxyConfig;
        _headers: import("./types").Headers;
        _context: any;
        "__#2@#language": string;
        _parser: import("./parsers/browsing").Parser;
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
} & {
    new (...args: any[]): {
        getHome(limit?: number): Promise<import("./parsers/browsing.types").parseHomeReturn>;
        getArtist(channelId: string): Promise<import("./mixins/browsing.types").getArtistReturn>;
        getArtistAlbums(channelId: string, params: string): Promise<import("./parsers/library.types").parseAlbumsReturn>;
        getUser(channelId: string): Promise<import("./mixins/browsing.types").getUserReturn>;
        getUserPlaylists(channelId: string, params: string): Promise<import("./parsers/browsing.types").parsePlaylistReturn[]>;
        getSongRelated(browseId: string): Promise<any[]>;
        getAlbumBrowseId(audioPlaylistId: `OLAK5uy_${string}`): Promise<`MPREb_${string}`>;
        getAlbum(browseId: string): Promise<import("./mixins/browsing.types").getAlbumReturn>;
        getSong(videoId: string, signatureTimestamp?: number): Promise<import("./mixins/browsing.types").getSongRequest<string, string>>;
        getLyrics(browseId: string): Promise<import("./mixins/browsing.types").getLyricsReturn>;
        getBaseJSUrl(): Promise<string>;
        getSignatureTimestamp(url?: string): Promise<number>;
        "__#2@#auth": string;
        _httpsAgent: import("https").Agent;
        _proxies?: false | import("axios").AxiosProxyConfig;
        _headers: import("./types").Headers;
        _context: any;
        "__#2@#language": string;
        _parser: import("./parsers/browsing").Parser;
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
} & {
    new (...args: any[]): {
        search(query: string, options?: {
            filter?: undefined;
            scope?: import("./types").Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<((Omit<{
            category: "Videos";
            resultType: "video";
            videoId: string;
            title: string;
            artists: {
                name: string;
                id: string;
            }[];
            views?: string;
            duration: string;
            duration_seconds: number;
        }, "category"> & {
            category: "Videos" | "Top result";
            thumbnails: import("./types").thumbnails;
        }) | (Omit<{
            category: "Songs";
            resultType: "song";
            videoId: string;
            title: string;
            artists: {
                name: string;
                id: string;
            }[];
            album: {
                name: string;
                id: string;
            };
            duration: string;
            duration_seconds: number;
            isExplicit: boolean;
            feedbackTokens: {
                add: any;
                remove: any;
            };
        }, "category"> & {
            category: "Songs" | "Top result";
            thumbnails: import("./types").thumbnails;
        }) | (Omit<{
            category: "Albums";
            resultType: "album";
            browseId: string;
            title: string;
            type: "Album";
            artist: string;
            year: string;
            isExplicit: boolean;
        }, "category"> & {
            category: "Albums" | "Top result";
            thumbnails: import("./types").thumbnails;
        }) | (Omit<{
            category: "Community playlists";
            resultType: "playlist";
            browseId: string;
            title: string;
            author: string;
            itemCount: string;
        }, "category"> & {
            category: "Community playlists" | "Top result";
            thumbnails: import("./types").thumbnails;
        }) | (Omit<{
            category: "Featured playlists";
            resultType: "playlist";
            browseId: string;
            title: string;
            author: string;
            itemCount: string;
        }, "category"> & {
            category: "Featured playlists" | "Top result";
            thumbnails: import("./types").thumbnails;
        }))[]>;
        search(query: string, options?: {
            filter?: "songs";
            scope?: import("./types").Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<(Omit<{
            category: "Songs";
            resultType: "song";
            videoId: string;
            title: string;
            artists: {
                name: string;
                id: string;
            }[];
            album: {
                name: string;
                id: string;
            };
            duration: string;
            duration_seconds: number;
            isExplicit: boolean;
            feedbackTokens: {
                add: any;
                remove: any;
            };
        }, "category"> & {
            category: "Songs" | "Top result";
            thumbnails: import("./types").thumbnails;
        })[]>;
        search(query: string, options?: {
            filter?: "videos";
            scope?: import("./types").Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<(Omit<{
            category: "Videos";
            resultType: "video";
            videoId: string;
            title: string;
            artists: {
                name: string;
                id: string;
            }[];
            views?: string;
            duration: string;
            duration_seconds: number;
        }, "category"> & {
            category: "Videos" | "Top result";
            thumbnails: import("./types").thumbnails;
        })[]>;
        search(query: string, options?: {
            filter?: "albums";
            scope?: import("./types").Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<(Omit<{
            category: "Albums";
            resultType: "album";
            browseId: string;
            title: string;
            type: "Album";
            artist: string;
            year: string;
            isExplicit: boolean;
        }, "category"> & {
            category: "Albums" | "Top result";
            thumbnails: import("./types").thumbnails;
        })[]>;
        search(query: string, options?: {
            filter?: "artists";
            scope?: import("./types").Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<(Omit<{
            category: "Artists";
            resultType: "artist";
            browseId: string;
            artist: string;
            shuffleId: string;
            radioId: string;
        }, "category"> & {
            category: "Artists" | "Top result";
            thumbnails: import("./types").thumbnails;
        })[]>;
        search(query: string, options?: {
            filter?: "playlists";
            scope?: import("./types").Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<((Omit<{
            category: "Community playlists";
            resultType: "playlist";
            browseId: string;
            title: string;
            author: string;
            itemCount: string;
        }, "category"> & {
            category: "Community playlists" | "Top result";
            thumbnails: import("./types").thumbnails;
        }) | (Omit<{
            category: "Featured playlists";
            resultType: "playlist";
            browseId: string;
            title: string;
            author: string;
            itemCount: string;
        }, "category"> & {
            category: "Featured playlists" | "Top result";
            thumbnails: import("./types").thumbnails;
        }))[]>;
        search(query: string, options?: {
            filter?: "community_playlists";
            scope?: import("./types").Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<(Omit<{
            category: "Community playlists";
            resultType: "playlist";
            browseId: string;
            title: string;
            author: string;
            itemCount: string;
        }, "category"> & {
            category: "Community playlists" | "Top result";
            thumbnails: import("./types").thumbnails;
        })[]>;
        search(query: string, options?: {
            filter?: "featured_playlists";
            scope?: import("./types").Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<(Omit<{
            category: "Featured playlists";
            resultType: "playlist";
            browseId: string;
            title: string;
            author: string;
            itemCount: string;
        }, "category"> & {
            category: "Featured playlists" | "Top result";
            thumbnails: import("./types").thumbnails;
        })[]>;
        search(query: string, options?: {
            filter?: "uploads";
            scope?: import("./types").Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<any[]>;
        "__#2@#auth": string;
        _httpsAgent: import("https").Agent;
        _proxies?: false | import("axios").AxiosProxyConfig;
        _headers: import("./types").Headers;
        _context: any;
        "__#2@#language": string;
        _parser: import("./parsers/browsing").Parser;
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
} & typeof _YTMusic;
export default YTMusic;
