import type { GConstructor, Mixin } from './.mixin.helper';
import * as bt from './browsing.types';
import * as parser_bT from '../parsers/browsing.types';
import * as parser_lT from '../parsers/library.types';
import { _YTMusic } from '../ytmusic';
export type BrowsingMixin = Mixin<typeof BrowsingMixin>;
/**
 * @module Browsing
 */
export declare const BrowsingMixin: <TBase extends GConstructor<_YTMusic>>(Base: TBase) => {
    new (...args: any[]): {
        /**
         * Get the home page.
         * The home page is structured as titled rows, returning 3 rows of music suggestions at a time.
         * Content varies and may contain artist, album, song or playlist suggestions, sometimes mixed within the same row
         *
         * @param {number} [limit=3] Number of rows to return
         * @returns List of objects keyed with 'title' text and 'contents' array
         * @example
         * [
         *   {
         *     "title": "Your morning music",
         *     "contents": [
         *       { //album result
         *         "title": "Sentiment",
         *         "year": "Said The Sky",
         *         "browseId": "MPREb_QtqXtd2xZMR",
         *         "thumbnails": [...]
         *       },
         *       { //playlist result
         *         "title": "r/EDM top submissions 01/28/2022",
         *         "playlistId": "PLz7-xrYmULdSLRZGk-6GKUtaBZcgQNwel",
         *         "thumbnails": [...],
         *         "description": "redditEDM • 161 songs",
         *         "count": "161",
         *         "author": [
         *           {
         *             "name": "redditEDM",
         *             "id": "UCaTrZ9tPiIGHrkCe5bxOGwA"
         *           }
         *         ]
         *       }
         *     ]
         *   },
         *   {
         *     "title": "Your favorites",
         *     "contents": [
         *       { //artist result
         *         "title": "Chill Satellite",
         *         "browseId": "UCrPLFBWdOroD57bkqPbZJog",
         *         "subscribers": "374",
         *         "thumbnails": [...]
         *       }
         *       { //album result
         *         "title": "Dragon",
         *         "year": "Two Steps From Hell",
         *         "browseId": "MPREb_M9aDqLRbSeg",
         *         "thumbnails": [...]
         *       }
         *     ]
         *   },
         *   {
         *     "title": "Quick picks",
         *     "contents": [
         *       { //song quick pick
         *         "title": "Gravity",
         *         "videoId": "EludZd6lfts",
         *         "artists": [{
         *             "name": "yetep",
         *             "id": "UCSW0r7dClqCoCvQeqXiZBlg"
         *           }],
         *         "thumbnails": [...],
         *         "album": {
         *           "name": "Gravity",
         *           "id": "MPREb_D6bICFcuuRY"
         *         }
         *       },
         *       { //video quick pick
         *         "title": "Gryffin & Illenium (feat. Daya) - Feel Good (L3V3LS Remix)",
         *         "videoId": "bR5l0hJDnX8",
         *         "artists": [
         *           {
         *               "name": "L3V3LS",
         *               "id": "UCCVNihbOdkOWw_-ajIYhAbQ"
         *           }
         *         ],
         *         "thumbnails": [...],
         *         "views": "10M"
         *       }
         *     ]
         *   }
         * ]
         */
        getHome(limit?: number): Promise<parser_bT.parseHomeReturn>;
        /**
         * Get information about an artist and their top releases (songs,
         * albums, singles, videos, and related artists). The top lists
         * contain pointers for getting the full list of releases. For
         * songs/videos, pass the browseId to {@link https://codyduong.github.io/ytmusicapiJS/module-Playlists.html#getPlaylist | getPlaylist}.
         * For albums/singles, pass browseId and params to {@link https://codyduong.github.io/ytmusicapiJS/module-Browsing.html#getArtistAlbums | getArtistAlbums}.
         *
         * @param {string} channelId channel id of the artist
         * @return Object with requested information.
         * @example
         * {
         *   "description": "Oasis were ...",
         *   "views": "1838795605",
         *   "name": "Oasis",
         *   "channelId": "UCUDVBtnOQi4c7E8jebpjc9Q",
         *   "subscribers": "2.3M",
         *   "subscribed": false,
         *   "thumbnails": [...],
         *   "songs": {
         *     "browseId": "VLPLMpM3Z0118S42R1npOhcjoakLIv1aqnS1",
         *     "results": [
         *       {
         *         "videoId": "ZrOKjDZOtkA",
         *         "title": "Wonderwall (Remastered)",
         *         "thumbnails": [...],
         *         "artist": "Oasis",
         *         "album": "(What's The Story) Morning Glory? (Remastered)"
         *       }
         *     ]
         *   },
         *   "albums": {
         *     "results": [
         *       {
         *         "title": "Familiar To Millions",
         *         "thumbnails": [...],
         *         "year": "2018",
         *         "browseId": "MPREb_AYetWMZunqA"
         *       }
         *     ],
         *     "browseId": "UCmMUZbaYdNH0bEd1PAlAqsA",
         *     "params": "6gPTAUNwc0JDbndLYlFBQV..."
         *   },
         *   "singles": {
         *     "results": [
         *       {
         *         "title": "Stand By Me (Mustique Demo)",
         *         "thumbnails": [...],
         *         "year": "2016",
         *         "browseId": "MPREb_7MPKLhibN5G"
         *       }
         *     ],
         *     "browseId": "UCmMUZbaYdNH0bEd1PAlAqsA",
         *     "params": "6gPTAUNwc0JDbndLYlFBQV..."
         *   },
         *   "videos": {
         *     "results": [
         *       {
         *         "title": "Wonderwall",
         *         "thumbnails": [...],
         *         "views": "358M",
         *         "videoId": "bx1Bh8ZvH84",
         *         "playlistId": "PLMpM3Z0118S5xuNckw1HUcj1D021AnMEB"
         *       }
         *     ],
         *     "browseId": "VLPLMpM3Z0118S5xuNckw1HUcj1D021AnMEB"
         *   },
         *   "related": {
         *     "results": [
         *       {
         *         "browseId": "UCt2KxZpY5D__kapeQ8cauQw",
         *         "subscribers": "450K",
         *         "title": "The Verve"
         *       },
         *       {
         *         "browseId": "UCwK2Grm574W1u-sBzLikldQ",
         *         "subscribers": "341K",
         *         "title": "Liam Gallagher"
         *       },
         *       ...
         *     ]
         *   }
         * }
         */
        getArtist(channelId: string): Promise<bt.getArtistReturn>;
        /**
         * Get the full list of an artist's albums or singles
         * @param {string} channelId channel Id of the artist
         * @param {string} params params obtained by {@link https://codyduong.github.io/ytmusicapiJS/module-Browsing.html#getArtist | getArtist}
         * @returns List of albums in the format of {@link https://codyduong.github.io/ytmusicapiJS/module-Library.html#getLibraryAlbums | getLibraryAlbums}, except artists key is missing.
         */
        getArtistAlbums(channelId: string, params: string): Promise<parser_lT.parseAlbumsReturn>;
        /**
         *  Retrieve a user's page. A user may own videos or playlists.
         * @param {string} channelId channelId of the user
         * @returns Object with information about a user.
         * @example
         * {
         *   "name": "4Tune – No Copyright Music",
         *   "videos": {
         *   "browseId": "UC44hbeRoCZVVMVg5z0FfIww",
         *   "results": [
         *     {
         *       "title": "Epic Music Soundtracks 2019",
         *       "videoId": "bJonJjgS2mM",
         *       "playlistId": "RDAMVMbJonJjgS2mM",
         *       "thumbnails": [
         *         {
         *           "url": "https://i.ytimg.com/vi/bJon...",
         *           "width": 800,
         *           "height": 450
         *         }
         *       ],
         *       "views": "19K"
         *       }
         *     ]
         *   },
         *   "playlists": {
         *   "browseId": "UC44hbeRoCZVVMVg5z0FfIww",
         *   "results": [
         *     {
         *     "title": "♚ Machinimasound | Playlist",
         *     "playlistId": "PLRm766YvPiO9ZqkBuEzSTt6Bk4eWIr3gB",
         *     "thumbnails": [
         *           {
         *           "url": "https://i.ytimg.com/vi/...",
         *           "width": 400,
         *           "height": 225
         *           }
         *         ]
         *       }
         *     ],
         *     "params": "6gO3AUNvWU..."
         *   }
         * }
         */
        getUser(channelId: string): Promise<bt.getUserReturn>;
        /**
         * Retrieve a list of playlists for a given user.
         * Call this function again with the returned ``params`` to get the full list.
         * @param {string} [channelId] channelId of the user.
         * @param {string} [params] params obtained by `getArtist`
         * @returns List of user playlists in the format of `getLibraryPlaylists`
         */
        getUserPlaylists(channelId: string, params: string): Promise<parser_bT.parsePlaylistReturn[]>;
        /**
         * Gets related content for a song. Equivalent to the content
         * shown in the "Related" tab of the watch panel.
         *
         * @param browseId The `related` key in the `get_watch_playlist` response.
         * @example
         * [
         *  {
         *    "title": "You might also like",
         *    "contents": [
         *      {
         *        "title": "High And Dry",
         *        "videoId": "7fv84nPfTH0",
         *        "artists": [{
         *            "name": "Radiohead",
         *            "id": "UCr_iyUANcn9OX_yy9piYoLw"
         *          }],
         *        "thumbnails": [
         *          {
         *            "url": "https://lh3.googleusercontent.com/TWWT47cHLv3yAugk4h9eOzQ46FHmXc_g-KmBVy2d4sbg_F-Gv6xrPglztRVzp8D_l-yzOnvh-QToM8s=w60-h60-l90-rj",
         *            "width": 60,
         *            "height": 60
         *          }
         *        ],
         *        "isExplicit": false,
         *        "album": {
         *          "name": "The Bends",
         *          "id": "MPREb_xsmDKhqhQrG"
         *        }
         *      }
         *    ]
         *  },
         *  {
         *    "title": "Recommended playlists",
         *    "contents": [
         *      {
         *        "title": "'90s Alternative Rock Hits",
         *        "playlistId": "RDCLAK5uy_m_h-nx7OCFaq9AlyXv78lG0AuloqW_NUA",
         *        "thumbnails": [...],
         *        "description": "Playlist • YouTube Music"
         *      }
         *    ]
         *  },
         *  {
         *    "title": "Similar artists",
         *    "contents": [
         *      {
         *        "title": "Noel Gallagher",
         *        "browseId": "UCu7yYcX_wIZgG9azR3PqrxA",
         *        "subscribers": "302K",
         *        "thumbnails": [...]
         *      }
         *    ]
         *  },
         *  {
         *    "title": "Oasis",
         *    "contents": [
         *      {
         *        "title": "Shakermaker",
         *        "year": "2014",
         *        "browseId": "MPREb_WNGQWp5czjD",
         *        "thumbnails": [...]
         *      }
         *    ]
         *  },
         *  {
         *    "title": "About the artist",
         *    "contents": "Oasis were a rock band consisting of Liam Gallagher, Paul ... (full description shortened for documentation)"
         *  }
         * ]
         */
        getSongRelated(browseId: string): Promise<any[]>;
        /**
         * Get an album's browseId based on its audioPlaylistId
         * @param {string} [audioPlaylistId] id of the audio playlist (starting with `OLAK5uy_`)
         * @returns browseId (starting with `MPREb_`)
         */
        getAlbumBrowseId(audioPlaylistId: `OLAK5uy_${string}`): Promise<`MPREb_${string}`>;
        /**
         * Get information and tracks of an album
         * @param {string} browseId of the album, for example returned by {@link search}
         * @returns Object with album and track metadata.
         * @example
         * {
         *   "title": "Revival",
         *   "type": "Album",
         *   "thumbnails": [],
         *   "description": "Revival is the...",
         *   "artists": [
         *     {
         *       "name": "Eminem",
         *       "id": "UCedvOgsKFzcK3hA5taf3KoQ"
         *     }
         *   ],
         *   "year": "2017",
         *   "trackCount": 19,
         *   "duration": "1 hour, 17 minutes",
         *   "duration_seconds": 4657,
         *   "audioPlaylistId": "OLAK5uy_nMr9h2VlS-2PULNz3M3XVXQj_P3C2bqaY",
         *   "tracks": [
         *     {
         *       "videoId": "iKLU7z_xdYQ",
         *       "title": "Walk On Water (feat. Beyoncé)",
         *       "artists": [
         *         {
         *           "name": "Eminem",
         *           "id": "UCedvOgsKFzcK3hA5taf3KoQ"
         *         }
         *       ],
         *       "album": "Revival",
         *       "likeStatus": "INDIFFERENT",
         *       "thumbnails": null,
         *       "isAvailable": true,
         *       "isExplicit": true,
         *       "duration": "5:03",
         *       "duration_seconds": 303,
         *       "feedbackTokens": {
         *         "add": "AB9zfpK...",
         *         "remove": "AB9zfpK..."
         *       }
         *     }
         *   ],
         *   "duration_seconds": 4657
         * }
         */
        getAlbum(browseId: string): Promise<bt.getAlbumReturn>;
        /**
         * Returns metadata and streaming information about a song or video.
         * @param {string} [videoId] Video id
         * @param {number} [signatureTimestamp] Provide the current YouTube signatureTimestamp.
         * If not provided a default value will be used, which might result in invalid streaming URLs
         * @return Object with song metadata
         * @example
         * {
         *   "playabilityStatus": {
         *     "status": "OK",
         *     "playableInEmbed": true,
         *     "audioOnlyPlayability": {
         *       "audioOnlyPlayabilityRenderer": {
         *         "trackingParams": "CAEQx2kiEwiuv9X5i5H1AhWBvlUKHRoZAHk=",
         *         "audioOnlyAvailability": "FEATURE_AVAILABILITY_ALLOWED"
         *       }
         *     },
         *     "miniplayer": {
         *       "miniplayerRenderer": {
         *         "playbackMode": "PLAYBACK_MODE_ALLOW"
         *       }
         *     },
         *     "contextParams": "Q0FBU0FnZ0M="
         *   },
         *   "streamingData": {
         *     "expiresInSeconds": "21540",
         *     "adaptiveFormats": [
         *       {
         *         "itag": 140,
         *         "url": "https://rr1---sn-h0jelnez.c.youtube.com/videoplayback?expire=1641080272...",
         *         "mimeType": "audio/mp4; codecs=\"mp4a.40.2\"",
         *         "bitrate": 131007,
         *         "initRange": {
         *           "start": "0",
         *           "end": "667"
         *         },
         *         "indexRange": {
         *           "start": "668",
         *           "end": "999"
         *         },
         *         "lastModified": "1620321966927796",
         *         "contentLength": "3967382",
         *         "quality": "tiny",
         *         "projectionType": "RECTANGULAR",
         *         "averageBitrate": 129547,
         *         "highReplication": true,
         *         "audioQuality": "AUDIO_QUALITY_MEDIUM",
         *         "approxDurationMs": "245000",
         *         "audioSampleRate": "44100",
         *         "audioChannels": 2,
         *         "loudnessDb": -1.3000002
         *       }
         *     ]
         *   },
         *   "videoDetails": {
         *     "videoId": "AjXQiKP5kMs",
         *     "title": "Sparks",
         *     "lengthSeconds": "245",
         *     "channelId": "UCvCk2zFqkCYzpnSgWfx0qOg",
         *     "isOwnerViewing": false,
         *     "isCrawlable": false,
         *     "thumbnail": {
         *       "thumbnails": []
         *     },
         *     "allowRatings": true,
         *     "viewCount": "12",
         *     "author": "Thomas Bergersen",
         *     "isPrivate": true,
         *     "isUnpluggedCorpus": false,
         *     "musicVideoType": "MUSIC_VIDEO_TYPE_PRIVATELY_OWNED_TRACK",
         *     "isLiveContent": false
         *   },
         *   "microformat": {
         *     "microformatDataRenderer": {
         *       "urlCanonical": "https://music.youtube.com/watch?v=AjXQiKP5kMs",
         *       "title": "Sparks - YouTube Music",
         *       "description": "Uploaded to YouTube via YouTube Music Sparks",
         *       "thumbnail": {
         *         "thumbnails": [
         *           {
         *             "url": "https://i.ytimg.com/vi/AjXQiKP5kMs/hqdefault.jpg",
         *             "width": 480,
         *             "height": 360
         *           }
         *         ]
         *       },
         *       "siteName": "YouTube Music",
         *       "appName": "YouTube Music",
         *       "androidPackage": "com.google.android.apps.youtube.music",
         *       "iosAppStoreId": "1017492454",
         *       "iosAppArguments": "https://music.youtube.com/watch?v=AjXQiKP5kMs",
         *       "ogType": "video.other",
         *       "urlApplinksIos": "vnd.youtube.music://music.youtube.com/watch?v=AjXQiKP5kMs&feature=applinks",
         *       "urlApplinksAndroid": "vnd.youtube.music://music.youtube.com/watch?v=AjXQiKP5kMs&feature=applinks",
         *       "urlTwitterIos": "vnd.youtube.music://music.youtube.com/watch?v=AjXQiKP5kMs&feature=twitter-deep-link",
         *       "urlTwitterAndroid": "vnd.youtube.music://music.youtube.com/watch?v=AjXQiKP5kMs&feature=twitter-deep-link",
         *       "twitterCardType": "player",
         *       "twitterSiteHandle": "@YouTubeMusic",
         *       "schemaDotOrgType": "http://schema.org/VideoObject",
         *       "noindex": true,
         *       "unlisted": true,
         *       "paid": false,
         *       "familySafe": true,
         *       "pageOwnerDetails": {
         *         "name": "Music Library Uploads",
         *         "externalChannelId": "UCvCk2zFqkCYzpnSgWfx0qOg",
         *         "youtubeProfileUrl": "http://www.youtube.com/channel/UCvCk2zFqkCYzpnSgWfx0qOg"
         *       },
         *       "videoDetails": {
         *         "externalVideoId": "AjXQiKP5kMs",
         *         "durationSeconds": "246",
         *         "durationIso8601": "PT4M6S"
         *       },
         *       "linkAlternates": [
         *         {
         *           "hrefUrl": "android-app://com.google.android.youtube/http/youtube.com/watch?v=AjXQiKP5kMs"
         *         },
         *         {
         *           "hrefUrl": "ios-app://544007664/http/youtube.com/watch?v=AjXQiKP5kMs"
         *         },
         *         {
         *           "hrefUrl": "https://www.youtube.com/oembed?format=json&url=https%3A%2F%2Fmusic.youtube.com%2Fwatch%3Fv%3DAjXQiKP5kMs",
         *           "title": "Sparks",
         *           "alternateType": "application/json+oembed"
         *         },
         *         {
         *           "hrefUrl": "https://www.youtube.com/oembed?format=xml&url=https%3A%2F%2Fmusic.youtube.com%2Fwatch%3Fv%3DAjXQiKP5kMs",
         *           "title": "Sparks",
         *           "alternateType": "text/xml+oembed"
         *         }
         *       ],
         *       "viewCount": "12",
         *       "publishDate": "1969-12-31",
         *       "category": "Music",
         *       "uploadDate": "1969-12-31"
         *     }
         *   }
         * }
         */
        getSong(videoId: string, signatureTimestamp?: number): Promise<bt.getSongRequest<string, string>>;
        /**
         * Returns lyrics of a song or video.
         * @param browseId
         * @return Object with song lyrics
         * @example
         * {
         *   "lyrics": "Today is gonna be the day\\nThat they're gonna throw it back to you\\n",
         *   "source": "Source: LyricFind"
         * }
         */
        getLyrics(browseId: string | null | undefined): Promise<bt.getLyricsReturn>;
        /**
         * Extract the URL for the `base.js` script from YouTube Music.
         * @return {string} URL to `base.js`
         */
        getBaseJSUrl(): Promise<string>;
        /**
         * Fetch the `base.js` script from YouTube Music and parse out the `signatureTimestamp` for use with {@link https://codyduong.github.io/ytmusicapiJS/module-Browsing.html#getSong | getSong}.
         * @param url Optional. Provide the URL of the `base.js` script. If this isn't specified a call will be made to {@link https://codyduong.github.io/ytmusicapiJS/module-Browsing.html#getBaseJSUrl | getBaseJSUrl}.
         * @returns `signatureTimestamp` string
         */
        getSignatureTimestamp(url?: string): Promise<number | null>;
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
