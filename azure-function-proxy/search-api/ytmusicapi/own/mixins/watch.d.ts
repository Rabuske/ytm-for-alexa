/**
 * @module Watch
 */
import { GConstructor, Mixin } from './.mixin.helper';
import * as wt from './watch.types';
export type WatchMixin = Mixin<typeof WatchMixin>;
export declare const WatchMixin: <TBase extends GConstructor<{
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
        getWatchPlaylist(watchPlaylist: wt.getWatchPlaylistOptions): Promise<wt.getWatchPlaylistReturn>;
        /**
         * Shuffle any playlist
         * @param videoId {string} Optional video id of the first video in the shuffled playlist
         * @param playlistId {string} Playlist id
         * @param limit {number} The number of watch playlist items to return @default 50
         * @returns A list of watch playlist items
         */
        getWatchPlaylistShuffle(options: wt.getWatchPlaylistShuffleOptions): Promise<ReturnType<any>>;
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
