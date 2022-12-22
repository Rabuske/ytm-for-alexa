"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowsingMixin = void 0;
const utf8 = __importStar(require("utf8"));
const constants_1 = require("../constants");
const index_1 = require("../parsers/index");
const helpers = __importStar(require("../helpers"));
const pyLibraryMock_1 = require("../pyLibraryMock");
const albums_1 = require("../parsers/albums");
const browsing_1 = require("../parsers/browsing");
const library_1 = require("../parsers/library");
const playlists_1 = require("../parsers/playlists");
const _utils_1 = require("./_utils");
const continuations_1 = require("../parsers/continuations");
/**
 * @module Browsing
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const BrowsingMixin = (Base) => {
    return class Browsing extends Base {
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
        async getHome(limit = 3) {
            const endpoint = 'browse';
            const body = { browseId: 'FEmusic_home' };
            const response = await this._sendRequest(endpoint, body);
            const results = (0, index_1.nav)(response, [...index_1.SINGLE_COLUMN_TAB, ...index_1.SECTION_LIST]);
            let home = [...this._parser.parseMixedContent(results)];
            const sectionList = (0, index_1.nav)(response, [
                ...index_1.SINGLE_COLUMN_TAB,
                'sectionListRenderer',
            ]);
            if ('continuations' in sectionList) {
                const requestFunc = async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams);
                const parseFunc = (contents) => this._parser.parseMixedContent(contents);
                home = [
                    ...home,
                    ...(await (0, continuations_1.getContinuations)(sectionList, 'sectionListContinuation', limit - home.length, requestFunc, parseFunc)),
                ];
            }
            return home;
        }
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
        async getArtist(channelId) {
            if (channelId.startsWith('MPLA')) {
                channelId = channelId.slice(4);
            }
            const body = { browseId: channelId };
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            const results = (0, index_1.nav)(response, [...index_1.SINGLE_COLUMN_TAB, ...index_1.SECTION_LIST]);
            if (results.length == 1) {
                // not a YouTube Music Channel, a standard YouTube Channel ID with no music content was given
                throw new ReferenceError(`The YouTube Channel ${channelId} has no music content.`);
            }
            let artist = {
                description: null,
                views: null,
            };
            const header = response['header']['musicImmersiveHeaderRenderer'];
            artist['name'] = (0, index_1.nav)(header, index_1.TITLE_TEXT);
            const descriptionShelf = (0, index_1.findObjectByKey)(results, index_1.DESCRIPTION_SHELF[0], undefined, true);
            if (descriptionShelf) {
                artist['description'] = (0, index_1.nav)(descriptionShelf, index_1.DESCRIPTION);
                artist['views'] = !('subheader' in descriptionShelf)
                    ? null
                    : descriptionShelf['subheader']['runs'][0]['text'];
            }
            const subscriptionButton = header['subscriptionButton']['subscribeButtonRenderer'];
            artist['channelId'] = subscriptionButton['channelId'];
            artist['shuffleId'] = (0, index_1.nav)(header, [
                'playButton',
                'buttonRenderer',
                ...index_1.NAVIGATION_WATCH_PLAYLIST_ID,
            ], null);
            artist['radioId'] = (0, index_1.nav)(header, [
                'startRadioButton',
                'buttonRenderer',
                ...index_1.NAVIGATION_WATCH_PLAYLIST_ID,
            ], null);
            artist['subscribers'] = (0, index_1.nav)(subscriptionButton, ['subscriberCountText', 'runs', 0, 'text'], null);
            artist['subscribed'] = subscriptionButton['subscribed'];
            artist['thumbnails'] = (0, index_1.nav)(header, index_1.THUMBNAILS, null);
            artist['songs'] = { browseId: null };
            if ('musicShelfRenderer' in results[0]) {
                // API sometimes does not return songs
                const musicShelf = (0, index_1.nav)(results[0], index_1.MUSIC_SHELF);
                if ('navigationEndpoint' in (0, index_1.nav)(musicShelf, index_1.TITLE)) {
                    artist['songs']['browseId'] = (0, index_1.nav)(musicShelf, [
                        ...index_1.TITLE,
                        ...index_1.NAVIGATION_BROWSE_ID,
                    ]);
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore: We're overriding the shape here
                artist['songs']['results'] = (0, playlists_1.parsePlaylistItems)(musicShelf['contents']);
            }
            artist = Object.assign(Object.assign({}, artist), this._parser.parseArtistContents(results));
            return artist;
        }
        /**
         * Get the full list of an artist's albums or singles
         * @param {string} channelId channel Id of the artist
         * @param {string} params params obtained by {@link https://codyduong.github.io/ytmusicapiJS/module-Browsing.html#getArtist | getArtist}
         * @returns List of albums in the format of {@link https://codyduong.github.io/ytmusicapiJS/module-Library.html#getLibraryAlbums | getLibraryAlbums}, except artists key is missing.
         */
        async getArtistAlbums(channelId, params) {
            const body = { browseId: channelId, params: params };
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            const results = (0, index_1.nav)(response, [
                ...index_1.SINGLE_COLUMN_TAB,
                ...index_1.SECTION_LIST_ITEM,
                ...index_1.GRID_ITEMS,
            ]);
            const albums = (0, library_1.parseAlbums)(results);
            return albums;
        }
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
        async getUser(channelId) {
            const endpoint = 'browse';
            const body = { browseId: channelId };
            const response = await this._sendRequest(endpoint, body);
            const results = (0, index_1.nav)(response, [...index_1.SINGLE_COLUMN_TAB, ...index_1.SECTION_LIST]);
            const user = Object.assign({ name: (0, index_1.nav)(response, [
                    'header',
                    'musicVisualHeaderRenderer',
                    ...index_1.TITLE_TEXT,
                ]) }, this._parser.parseArtistContents(results));
            return user;
        }
        /**
         * Retrieve a list of playlists for a given user.
         * Call this function again with the returned ``params`` to get the full list.
         * @param {string} [channelId] channelId of the user.
         * @param {string} [params] params obtained by `getArtist`
         * @returns List of user playlists in the format of `getLibraryPlaylists`
         */
        async getUserPlaylists(channelId, params) {
            const endpoint = 'browse';
            const body = { browseId: channelId, params: params };
            const response = await this._sendRequest(endpoint, body);
            const results = (0, index_1.nav)(response, [
                ...index_1.SINGLE_COLUMN_TAB,
                ...index_1.SECTION_LIST_ITEM,
                ...index_1.GRID_ITEMS,
            ]);
            const userPlaylists = (0, browsing_1.parseContentList)(results, browsing_1.parsePlaylist);
            return userPlaylists;
        }
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
        async getSongRelated(browseId) {
            if (!browseId) {
                throw new Error('Invalid browseId provided');
            }
            const response = await this._sendRequest('browse', {
                browseId: browseId,
            });
            const sections = (0, index_1.nav)(response, ['contents', ...index_1.SECTION_LIST]);
            return this._parser.parseMixedContent(sections);
        }
        /**
         * Get an album's browseId based on its audioPlaylistId
         * @param {string} [audioPlaylistId] id of the audio playlist (starting with `OLAK5uy_`)
         * @returns browseId (starting with `MPREb_`)
         */
        async getAlbumBrowseId(audioPlaylistId) {
            const params = { list: audioPlaylistId };
            const response = await this._sendGetRequest(constants_1.YTM_DOMAIN + '/playlist', params);
            const matches = pyLibraryMock_1.re.findall(/"MPRE.+?"/, response);
            let browse_id = null;
            if (matches.length > 0) {
                browse_id = utf8
                    .decode(utf8.encode(matches[0]))
                    .replace(/^"+|"+$/g, '');
            }
            return browse_id;
        }
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
        async getAlbum(browseId) {
            const body = { browseId: browseId };
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            const results = (0, index_1.nav)(response, [
                ...index_1.SINGLE_COLUMN_TAB,
                ...index_1.SECTION_LIST_ITEM,
                ...index_1.MUSIC_SHELF,
            ]);
            const album = Object.assign(Object.assign({}, (0, albums_1.parseAlbumHeader)(response)), { 
                //@ts-expect-error: We'll swap this out proper later.
                tracks: (0, playlists_1.parsePlaylistItems)(results['contents']), duration_seconds: undefined });
            album['duration_seconds'] = helpers.sumTotalDuration(album);
            for (const [i, _track] of album['tracks'].entries()) {
                album['tracks'][i]['album'] = album['title'];
                album['tracks'][i]['artists'] = album['artists'];
            }
            return album;
        }
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
        async getSong(videoId, signatureTimestamp) {
            const endpoint = 'player';
            if (!signatureTimestamp) {
                signatureTimestamp = (0, _utils_1.getDatestamp)() - 1;
            }
            const params = {
                playbackContext: {
                    contentPlaybackContext: {
                        signatureTimestamp: signatureTimestamp,
                    },
                },
                video_id: videoId,
            };
            const response = await this._sendRequest(endpoint, params);
            const keys = [
                'videoDetails',
                'playabilityStatus',
                'streamingData',
                'microformat',
            ];
            for (const k of Object.keys(response)) {
                if (!keys.includes(k)) {
                    delete response[k];
                }
            }
            return response;
        }
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
        async getLyrics(browseId) {
            const lyrics = {};
            // Is this inherited behavior good for typescript users? @codyduong
            if (!browseId) {
                throw new Error('Invalid browseId provided. This song might not have lyrics.');
            }
            const response = await this._sendRequest('browse', {
                browseId: browseId,
            });
            lyrics['lyrics'] = (0, index_1.nav)(response, ['contents', ...index_1.SECTION_LIST_ITEM, index_1.DESCRIPTION_SHELF, ...index_1.DESCRIPTION], null);
            lyrics['source'] = (0, index_1.nav)(response, [
                'contents',
                ...index_1.SECTION_LIST_ITEM,
                index_1.DESCRIPTION_SHELF,
                'footer',
                ...index_1.RUN_TEXT,
            ], null);
            return lyrics;
        }
        /**
         * Extract the URL for the `base.js` script from YouTube Music.
         * @return {string} URL to `base.js`
         */
        async getBaseJSUrl() {
            const response = await this._sendGetRequest(constants_1.YTM_DOMAIN);
            const match = pyLibraryMock_1.re.search(/jsUrl"\s*:\s*"([^"]+)"/, response);
            if (!match) {
                throw new Error('Could not identify the URL for base.js player.');
            }
            return constants_1.YTM_DOMAIN + match[0].slice(8, -1);
        }
        /**
         * Fetch the `base.js` script from YouTube Music and parse out the `signatureTimestamp` for use with {@link https://codyduong.github.io/ytmusicapiJS/module-Browsing.html#getSong | getSong}.
         * @param url Optional. Provide the URL of the `base.js` script. If this isn't specified a call will be made to {@link https://codyduong.github.io/ytmusicapiJS/module-Browsing.html#getBaseJSUrl | getBaseJSUrl}.
         * @returns `signatureTimestamp` string
         */
        async getSignatureTimestamp(url) {
            if (!url) {
                url = await this.getBaseJSUrl();
            }
            const response = await this._sendGetRequest(url);
            const match = pyLibraryMock_1.re.search(/signatureTimestamp[:=](\d+)/, response);
            if (!match) {
                throw new Error('Unable to identify the signatureTimestamp.');
            }
            if (match && match.groups) {
                return Math.round(Number(match[1]));
            }
            return null;
        }
    };
};
exports.BrowsingMixin = BrowsingMixin;
