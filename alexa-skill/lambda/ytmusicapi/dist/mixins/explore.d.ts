import { parsePlaylistReturn } from '../parsers/browsing.types';
import { GConstructor, Mixin } from './.mixin.helper';
import * as et from './explore.types';
export type ExploreMixin = Mixin<typeof ExploreMixin>;
/**
 * @module Explore
 */
export declare const ExploreMixin: <TBase extends GConstructor<{
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
         * Fetch "Moods & Genres" categories from YouTube Music.
         *
         * @return Object of sections and categories
         * @example
         * {
         *   'For you': [
         *     {
         *     'params': 'ggMPOg1uX1ZwN0pHT2NBT1Fk',
         *     'title': '1980s'
         *     },
         *     {
         *     'params': 'ggMPOg1uXzZQbDB5eThLRTQ3',
         *     'title': 'Feel Good'
         *     },
         *     ...
         *   ],
         *   'Genres': [
         *     {
         *     'params': 'ggMPOg1uXzVLbmZnaWI4STNs',
         *     'title': 'Dance & Electronic'
         *     },
         *     {
         *     'params': 'ggMPOg1uX3NjZllsNGVEMkZo',
         *     'title': 'Decades'
         *     },
         *     ...
         *   ],
         *   'Moods & moments': [
         *     {
         *     'params': 'ggMPOg1uXzVuc0dnZlhpV3Ba',
         *     'title': 'Chill'
         *     },
         *     {
         *     'params': 'ggMPOg1uX2ozUHlwbWM3ajNq',
         *     'title': 'Commute'
         *     },
         *     ...
         *   ],
         * }
         */
        getMoodCategories(): Promise<et.getMoodCategoriesReturn>;
        /**
         * Retrieve a list of playlists for a given "Moods & Genres" category.
         * @param params params obtained by `getMoodCategories`
         * @returns List of playlists in the format of `getLibraryPlaylists`
         */
        getMoodPlaylists(params: string): Promise<parsePlaylistReturn[]>;
        /**
         * Get latest charts data from YouTube Music: Top songs, top videos, top artists and top trending videos.
         * Global charts have no Trending section, US charts have an extra Genres section with some Genre charts.
         * @param {string} [country = 'ZZ'] ISO 3166-1 Alpha-2 country code.
         * @returns Dictionary containing chart songs (only if authenticated), chart videos, chart artists and trending videos.
         * @example
         * {
         *   "countries": {
         *     "selected": {
         *       "text": "United States"
         *     },
         *     "options": ["DE",
         *       "ZZ",
         *       "ZW"]
         *   },
         *   "songs": {
         *     "playlist": "VLPL4fGSI1pDJn6O1LS0XSdF3RyO0Rq_LDeI",
         *     "items": [
         *       {
         *         "title": "Outside (Better Days)",
         *         "videoId": "oT79YlRtXDg",
         *         "artists": [
         *           {
         *             "name": "MO3",
         *             "id": "UCdFt4Cvhr7Okaxo6hZg5K8g"
         *           },
         *           {
         *             "name": "OG Bobby Billions",
         *             "id": "UCLusb4T2tW3gOpJS1fJ-A9g"
         *           }
         *         ],
         *         "thumbnails": [...],
         *         "isExplicit": true,
         *         "album": {
         *           "name": "Outside (Better Days)",
         *           "id": "MPREb_fX4Yv8frUNv"
         *         },
         *         "rank": "1",
         *         "trend": "up"
         *       }
         *     ]
         *   },
         *   "videos": {
         *     "playlist": "VLPL4fGSI1pDJn69On1f-8NAvX_CYlx7QyZc",
         *     "items": [
         *       {
         *         "title": "EVERY CHANCE I GET (Official Music Video) (feat. Lil Baby & Lil Durk)",
         *         "videoId": "BTivsHlVcGU",
         *         "playlistId": "PL4fGSI1pDJn69On1f-8NAvX_CYlx7QyZc",
         *         "thumbnails": [],
         *         "views": "46M"
         *       }
         *     ]
         *   },
         *   "artists": {
         *     "playlist": null,
         *     "items": [
         *       {
         *         "title": "YoungBoy Never Broke Again",
         *         "browseId": "UCR28YDxjDE3ogQROaNdnRbQ",
         *         "subscribers": "9.62M",
         *         "thumbnails": [],
         *         "rank": "1",
         *         "trend": "neutral"
         *       }
         *     ]
         *   },
         *   "genres": [
         *     {
         *       "title": "Top 50 Pop Music Videos United States",
         *       "playlistId": "PL4fGSI1pDJn77aK7sAW2AT0oOzo5inWY8",
         *       "thumbnails": []
         *     }
         *   ],
         *   "trending": {
         *     "playlist": "VLPLrEnWoR732-DtKgaDdnPkezM_nDidBU9H",
         *     "items": [
         *       {
         *         "title": "Permission to Dance",
         *         "videoId": "CuklIb9d3fI",
         *         "playlistId": "PLrEnWoR732-DtKgaDdnPkezM_nDidBU9H",
         *         "artists": [
         *           {
         *             "name": "BTS",
         *             "id": "UC9vrvNSL3xcWGSkV86REBSg"
         *           }
         *         ],
         *         "thumbnails": [],
         *         "views": "108M"
         *       }
         *     ]
         *   }
         * }
         */
        getCharts(country?: string): Promise<et.getChartsReturn<string>>;
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
