import { Scope } from '../types';
import { _YTMusic } from '../ytmusic';
import { GConstructor, Mixin } from './.mixin.helper';
import * as st from './search.types';
export type SearchMixin = Mixin<typeof SearchMixin>;
/**
 * @module Search
 */
export declare const SearchMixin: <TBase extends GConstructor<_YTMusic>>(Base: TBase) => {
    new (...args: any[]): {
        /**
         * Search YouTube music.
         * Returns results within the provided category.
         * @param {string} query Query string, i.e. 'Oasis Wonderwall'
         * @param {options} [options=]
         * @param {'songs'|'videos'|'albums'|'artists'|'playlists'|'community_playlists'|'featured_playlists'} [options.filter=] Filter for item types.
         *    @default: Default search, including all types of items.
         * @param {'libary'|'uploads'} [options.scope=] Search scope.
         *    @default: Search the public YouTube Music catalogue.
         * @param {number} [options.limit=20] Number of search results to return
         * @param {boolean} [ignoreSpelling=false] Whether to ignore YTM spelling suggestions.
         * If true, the exact search term will be searched for, and will not be corrected.
         * This does not have any effect when the filter is set to ``uploads``.
         * Default: false, will use YTM's default behavior of autocorrecting the search.
         * @return List of results depending on filter.
         * resultType specifies the type of item (important for default search).
         * albums, artists and playlists additionally contain a browseId, corresponding to
         * albumId, channelId and playlistId (browseId=``VL``+playlistId)
         * @example <caption> list for default search with one result per resultType for brevity. Normally
         * there are 3 results per resultType and an additional ``thumbnails`` key. </caption>
         * [
         *   {
         *     "category": "Top result",
         *     "resultType": "video",
         *     "videoId": "vU05Eksc_iM",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "1.4M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Songs",
         *     "resultType": "song",
         *     "videoId": "ZrOKjDZOtkA",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "album": {
         *       "name": "(What's The Story) Morning Glory? (Remastered)",
         *       "id": "MPREb_9nqEki4ZDpp"
         *     },
         *     "duration": "4:19",
         *     "duration_seconds": 259
         *     "isExplicit": false,
         *     "feedbackTokens": {
         *       "add": null,
         *       "remove": null
         *     }
         *   },
         *   {
         *     "category": "Albums",
         *     "resultType": "album",
         *     "browseId": "MPREb_9nqEki4ZDpp",
         *     "title": "(What's The Story) Morning Glory? (Remastered)",
         *     "type": "Album",
         *     "artist": "Oasis",
         *     "year": "1995",
         *     "isExplicit": false
         *   },
         *   {
         *     "category": "Community playlists",
         *     "resultType": "playlist",
         *     "browseId": "VLPLK1PkWQlWtnNfovRdGWpKffO1Wdi2kvDx",
         *     "title": "Wonderwall - Oasis",
         *     "author": "Tate Henderson",
         *     "itemCount": "174"
         *   },
         *   {
         *     "category": "Videos",
         *     "resultType": "video",
         *     "videoId": "bx1Bh8ZvH84",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "386M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Artists",
         *     "resultType": "artist",
         *     "browseId": "UCmMUZbaYdNH0bEd1PAlAqsA",
         *     "artist": "Oasis",
         *     "shuffleId": "RDAOkjHYJjL1a3xspEyVkhHAsg",
         *     "radioId": "RDEMkjHYJjL1a3xspEyVkhHAsg"
         *   }
         * ]
         */
        search(query: string, options?: {
            filter?: undefined;
            scope?: Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<st.searchReturn<'null'>>;
        /**
         * Search YouTube music.
         * Returns results within the provided category.
         * @param {string} query Query string, i.e. 'Oasis Wonderwall'
         * @param {options} [options=]
         * @param {'songs'|'videos'|'albums'|'artists'|'playlists'|'community_playlists'|'featured_playlists'} [options.filter=] Filter for item types.
         *    @default: Default search, including all types of items.
         * @param {'libary'|'uploads'} [options.scope=] Search scope.
         *    @default: Search the public YouTube Music catalogue.
         * @param {number} [options.limit=20] Number of search results to return
         * @param {boolean} [ignoreSpelling=false] Whether to ignore YTM spelling suggestions.
         * If true, the exact search term will be searched for, and will not be corrected.
         * This does not have any effect when the filter is set to ``uploads``.
         * Default: false, will use YTM's default behavior of autocorrecting the search.
         * @return List of results depending on filter.
         * resultType specifies the type of item (important for default search).
         * albums, artists and playlists additionally contain a browseId, corresponding to
         * albumId, channelId and playlistId (browseId=``VL``+playlistId)
         * @example <caption> list for default search with one result per resultType for brevity. Normally
         * there are 3 results per resultType and an additional ``thumbnails`` key. </caption>
         * [
         *   {
         *     "category": "Top result",
         *     "resultType": "video",
         *     "videoId": "vU05Eksc_iM",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "1.4M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Songs",
         *     "resultType": "song",
         *     "videoId": "ZrOKjDZOtkA",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "album": {
         *       "name": "(What's The Story) Morning Glory? (Remastered)",
         *       "id": "MPREb_9nqEki4ZDpp"
         *     },
         *     "duration": "4:19",
         *     "duration_seconds": 259
         *     "isExplicit": false,
         *     "feedbackTokens": {
         *       "add": null,
         *       "remove": null
         *     }
         *   },
         *   {
         *     "category": "Albums",
         *     "resultType": "album",
         *     "browseId": "MPREb_9nqEki4ZDpp",
         *     "title": "(What's The Story) Morning Glory? (Remastered)",
         *     "type": "Album",
         *     "artist": "Oasis",
         *     "year": "1995",
         *     "isExplicit": false
         *   },
         *   {
         *     "category": "Community playlists",
         *     "resultType": "playlist",
         *     "browseId": "VLPLK1PkWQlWtnNfovRdGWpKffO1Wdi2kvDx",
         *     "title": "Wonderwall - Oasis",
         *     "author": "Tate Henderson",
         *     "itemCount": "174"
         *   },
         *   {
         *     "category": "Videos",
         *     "resultType": "video",
         *     "videoId": "bx1Bh8ZvH84",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "386M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Artists",
         *     "resultType": "artist",
         *     "browseId": "UCmMUZbaYdNH0bEd1PAlAqsA",
         *     "artist": "Oasis",
         *     "shuffleId": "RDAOkjHYJjL1a3xspEyVkhHAsg",
         *     "radioId": "RDEMkjHYJjL1a3xspEyVkhHAsg"
         *   }
         * ]
         */
        search(query: string, options?: {
            filter?: 'songs';
            scope?: Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<st.searchReturn<'songs'>>;
        /**
         * Search YouTube music.
         * Returns results within the provided category.
         * @param {string} query Query string, i.e. 'Oasis Wonderwall'
         * @param {options} [options=]
         * @param {'songs'|'videos'|'albums'|'artists'|'playlists'|'community_playlists'|'featured_playlists'} [options.filter=] Filter for item types.
         *    @default: Default search, including all types of items.
         * @param {'libary'|'uploads'} [options.scope=] Search scope.
         *    @default: Search the public YouTube Music catalogue.
         * @param {number} [options.limit=20] Number of search results to return
         * @param {boolean} [ignoreSpelling=false] Whether to ignore YTM spelling suggestions.
         * If true, the exact search term will be searched for, and will not be corrected.
         * This does not have any effect when the filter is set to ``uploads``.
         * Default: false, will use YTM's default behavior of autocorrecting the search.
         * @return List of results depending on filter.
         * resultType specifies the type of item (important for default search).
         * albums, artists and playlists additionally contain a browseId, corresponding to
         * albumId, channelId and playlistId (browseId=``VL``+playlistId)
         * @example <caption> list for default search with one result per resultType for brevity. Normally
         * there are 3 results per resultType and an additional ``thumbnails`` key. </caption>
         * [
         *   {
         *     "category": "Top result",
         *     "resultType": "video",
         *     "videoId": "vU05Eksc_iM",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "1.4M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Songs",
         *     "resultType": "song",
         *     "videoId": "ZrOKjDZOtkA",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "album": {
         *       "name": "(What's The Story) Morning Glory? (Remastered)",
         *       "id": "MPREb_9nqEki4ZDpp"
         *     },
         *     "duration": "4:19",
         *     "duration_seconds": 259
         *     "isExplicit": false,
         *     "feedbackTokens": {
         *       "add": null,
         *       "remove": null
         *     }
         *   },
         *   {
         *     "category": "Albums",
         *     "resultType": "album",
         *     "browseId": "MPREb_9nqEki4ZDpp",
         *     "title": "(What's The Story) Morning Glory? (Remastered)",
         *     "type": "Album",
         *     "artist": "Oasis",
         *     "year": "1995",
         *     "isExplicit": false
         *   },
         *   {
         *     "category": "Community playlists",
         *     "resultType": "playlist",
         *     "browseId": "VLPLK1PkWQlWtnNfovRdGWpKffO1Wdi2kvDx",
         *     "title": "Wonderwall - Oasis",
         *     "author": "Tate Henderson",
         *     "itemCount": "174"
         *   },
         *   {
         *     "category": "Videos",
         *     "resultType": "video",
         *     "videoId": "bx1Bh8ZvH84",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "386M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Artists",
         *     "resultType": "artist",
         *     "browseId": "UCmMUZbaYdNH0bEd1PAlAqsA",
         *     "artist": "Oasis",
         *     "shuffleId": "RDAOkjHYJjL1a3xspEyVkhHAsg",
         *     "radioId": "RDEMkjHYJjL1a3xspEyVkhHAsg"
         *   }
         * ]
         */
        search(query: string, options?: {
            filter?: 'videos';
            scope?: Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<st.searchReturn<'videos'>>;
        /**
         * Search YouTube music.
         * Returns results within the provided category.
         * @param {string} query Query string, i.e. 'Oasis Wonderwall'
         * @param {options} [options=]
         * @param {'songs'|'videos'|'albums'|'artists'|'playlists'|'community_playlists'|'featured_playlists'} [options.filter=] Filter for item types.
         *    @default: Default search, including all types of items.
         * @param {'libary'|'uploads'} [options.scope=] Search scope.
         *    @default: Search the public YouTube Music catalogue.
         * @param {number} [options.limit=20] Number of search results to return
         * @param {boolean} [ignoreSpelling=false] Whether to ignore YTM spelling suggestions.
         * If true, the exact search term will be searched for, and will not be corrected.
         * This does not have any effect when the filter is set to ``uploads``.
         * Default: false, will use YTM's default behavior of autocorrecting the search.
         * @return List of results depending on filter.
         * resultType specifies the type of item (important for default search).
         * albums, artists and playlists additionally contain a browseId, corresponding to
         * albumId, channelId and playlistId (browseId=``VL``+playlistId)
         * @example <caption> list for default search with one result per resultType for brevity. Normally
         * there are 3 results per resultType and an additional ``thumbnails`` key. </caption>
         * [
         *   {
         *     "category": "Top result",
         *     "resultType": "video",
         *     "videoId": "vU05Eksc_iM",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "1.4M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Songs",
         *     "resultType": "song",
         *     "videoId": "ZrOKjDZOtkA",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "album": {
         *       "name": "(What's The Story) Morning Glory? (Remastered)",
         *       "id": "MPREb_9nqEki4ZDpp"
         *     },
         *     "duration": "4:19",
         *     "duration_seconds": 259
         *     "isExplicit": false,
         *     "feedbackTokens": {
         *       "add": null,
         *       "remove": null
         *     }
         *   },
         *   {
         *     "category": "Albums",
         *     "resultType": "album",
         *     "browseId": "MPREb_9nqEki4ZDpp",
         *     "title": "(What's The Story) Morning Glory? (Remastered)",
         *     "type": "Album",
         *     "artist": "Oasis",
         *     "year": "1995",
         *     "isExplicit": false
         *   },
         *   {
         *     "category": "Community playlists",
         *     "resultType": "playlist",
         *     "browseId": "VLPLK1PkWQlWtnNfovRdGWpKffO1Wdi2kvDx",
         *     "title": "Wonderwall - Oasis",
         *     "author": "Tate Henderson",
         *     "itemCount": "174"
         *   },
         *   {
         *     "category": "Videos",
         *     "resultType": "video",
         *     "videoId": "bx1Bh8ZvH84",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "386M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Artists",
         *     "resultType": "artist",
         *     "browseId": "UCmMUZbaYdNH0bEd1PAlAqsA",
         *     "artist": "Oasis",
         *     "shuffleId": "RDAOkjHYJjL1a3xspEyVkhHAsg",
         *     "radioId": "RDEMkjHYJjL1a3xspEyVkhHAsg"
         *   }
         * ]
         */
        search(query: string, options?: {
            filter?: 'albums';
            scope?: Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<st.searchReturn<'albums'>>;
        /**
         * Search YouTube music.
         * Returns results within the provided category.
         * @param {string} query Query string, i.e. 'Oasis Wonderwall'
         * @param {options} [options=]
         * @param {'songs'|'videos'|'albums'|'artists'|'playlists'|'community_playlists'|'featured_playlists'} [options.filter=] Filter for item types.
         *    @default: Default search, including all types of items.
         * @param {'libary'|'uploads'} [options.scope=] Search scope.
         *    @default: Search the public YouTube Music catalogue.
         * @param {number} [options.limit=20] Number of search results to return
         * @param {boolean} [ignoreSpelling=false] Whether to ignore YTM spelling suggestions.
         * If true, the exact search term will be searched for, and will not be corrected.
         * This does not have any effect when the filter is set to ``uploads``.
         * Default: false, will use YTM's default behavior of autocorrecting the search.
         * @return List of results depending on filter.
         * resultType specifies the type of item (important for default search).
         * albums, artists and playlists additionally contain a browseId, corresponding to
         * albumId, channelId and playlistId (browseId=``VL``+playlistId)
         * @example <caption> list for default search with one result per resultType for brevity. Normally
         * there are 3 results per resultType and an additional ``thumbnails`` key. </caption>
         * [
         *   {
         *     "category": "Top result",
         *     "resultType": "video",
         *     "videoId": "vU05Eksc_iM",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "1.4M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Songs",
         *     "resultType": "song",
         *     "videoId": "ZrOKjDZOtkA",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "album": {
         *       "name": "(What's The Story) Morning Glory? (Remastered)",
         *       "id": "MPREb_9nqEki4ZDpp"
         *     },
         *     "duration": "4:19",
         *     "duration_seconds": 259
         *     "isExplicit": false,
         *     "feedbackTokens": {
         *       "add": null,
         *       "remove": null
         *     }
         *   },
         *   {
         *     "category": "Albums",
         *     "resultType": "album",
         *     "browseId": "MPREb_9nqEki4ZDpp",
         *     "title": "(What's The Story) Morning Glory? (Remastered)",
         *     "type": "Album",
         *     "artist": "Oasis",
         *     "year": "1995",
         *     "isExplicit": false
         *   },
         *   {
         *     "category": "Community playlists",
         *     "resultType": "playlist",
         *     "browseId": "VLPLK1PkWQlWtnNfovRdGWpKffO1Wdi2kvDx",
         *     "title": "Wonderwall - Oasis",
         *     "author": "Tate Henderson",
         *     "itemCount": "174"
         *   },
         *   {
         *     "category": "Videos",
         *     "resultType": "video",
         *     "videoId": "bx1Bh8ZvH84",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "386M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Artists",
         *     "resultType": "artist",
         *     "browseId": "UCmMUZbaYdNH0bEd1PAlAqsA",
         *     "artist": "Oasis",
         *     "shuffleId": "RDAOkjHYJjL1a3xspEyVkhHAsg",
         *     "radioId": "RDEMkjHYJjL1a3xspEyVkhHAsg"
         *   }
         * ]
         */
        search(query: string, options?: {
            filter?: 'artists';
            scope?: Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<st.searchReturn<'artists'>>;
        /**
         * Search YouTube music.
         * Returns results within the provided category.
         * @param {string} query Query string, i.e. 'Oasis Wonderwall'
         * @param {options} [options=]
         * @param {'songs'|'videos'|'albums'|'artists'|'playlists'|'community_playlists'|'featured_playlists'} [options.filter=] Filter for item types.
         *    @default: Default search, including all types of items.
         * @param {'libary'|'uploads'} [options.scope=] Search scope.
         *    @default: Search the public YouTube Music catalogue.
         * @param {number} [options.limit=20] Number of search results to return
         * @param {boolean} [ignoreSpelling=false] Whether to ignore YTM spelling suggestions.
         * If true, the exact search term will be searched for, and will not be corrected.
         * This does not have any effect when the filter is set to ``uploads``.
         * Default: false, will use YTM's default behavior of autocorrecting the search.
         * @return List of results depending on filter.
         * resultType specifies the type of item (important for default search).
         * albums, artists and playlists additionally contain a browseId, corresponding to
         * albumId, channelId and playlistId (browseId=``VL``+playlistId)
         * @example <caption> list for default search with one result per resultType for brevity. Normally
         * there are 3 results per resultType and an additional ``thumbnails`` key. </caption>
         * [
         *   {
         *     "category": "Top result",
         *     "resultType": "video",
         *     "videoId": "vU05Eksc_iM",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "1.4M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Songs",
         *     "resultType": "song",
         *     "videoId": "ZrOKjDZOtkA",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "album": {
         *       "name": "(What's The Story) Morning Glory? (Remastered)",
         *       "id": "MPREb_9nqEki4ZDpp"
         *     },
         *     "duration": "4:19",
         *     "duration_seconds": 259
         *     "isExplicit": false,
         *     "feedbackTokens": {
         *       "add": null,
         *       "remove": null
         *     }
         *   },
         *   {
         *     "category": "Albums",
         *     "resultType": "album",
         *     "browseId": "MPREb_9nqEki4ZDpp",
         *     "title": "(What's The Story) Morning Glory? (Remastered)",
         *     "type": "Album",
         *     "artist": "Oasis",
         *     "year": "1995",
         *     "isExplicit": false
         *   },
         *   {
         *     "category": "Community playlists",
         *     "resultType": "playlist",
         *     "browseId": "VLPLK1PkWQlWtnNfovRdGWpKffO1Wdi2kvDx",
         *     "title": "Wonderwall - Oasis",
         *     "author": "Tate Henderson",
         *     "itemCount": "174"
         *   },
         *   {
         *     "category": "Videos",
         *     "resultType": "video",
         *     "videoId": "bx1Bh8ZvH84",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "386M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Artists",
         *     "resultType": "artist",
         *     "browseId": "UCmMUZbaYdNH0bEd1PAlAqsA",
         *     "artist": "Oasis",
         *     "shuffleId": "RDAOkjHYJjL1a3xspEyVkhHAsg",
         *     "radioId": "RDEMkjHYJjL1a3xspEyVkhHAsg"
         *   }
         * ]
         */
        search(query: string, options?: {
            filter?: 'playlists';
            scope?: Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<st.searchReturn<'playlists'>>;
        /**
         * Search YouTube music.
         * Returns results within the provided category.
         * @param {string} query Query string, i.e. 'Oasis Wonderwall'
         * @param {options} [options=]
         * @param {'songs'|'videos'|'albums'|'artists'|'playlists'|'community_playlists'|'featured_playlists'} [options.filter=] Filter for item types.
         *    @default: Default search, including all types of items.
         * @param {'libary'|'uploads'} [options.scope=] Search scope.
         *    @default: Search the public YouTube Music catalogue.
         * @param {number} [options.limit=20] Number of search results to return
         * @param {boolean} [ignoreSpelling=false] Whether to ignore YTM spelling suggestions.
         * If true, the exact search term will be searched for, and will not be corrected.
         * This does not have any effect when the filter is set to ``uploads``.
         * Default: false, will use YTM's default behavior of autocorrecting the search.
         * @return List of results depending on filter.
         * resultType specifies the type of item (important for default search).
         * albums, artists and playlists additionally contain a browseId, corresponding to
         * albumId, channelId and playlistId (browseId=``VL``+playlistId)
         * @example <caption> list for default search with one result per resultType for brevity. Normally
         * there are 3 results per resultType and an additional ``thumbnails`` key. </caption>
         * [
         *   {
         *     "category": "Top result",
         *     "resultType": "video",
         *     "videoId": "vU05Eksc_iM",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "1.4M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Songs",
         *     "resultType": "song",
         *     "videoId": "ZrOKjDZOtkA",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "album": {
         *       "name": "(What's The Story) Morning Glory? (Remastered)",
         *       "id": "MPREb_9nqEki4ZDpp"
         *     },
         *     "duration": "4:19",
         *     "duration_seconds": 259
         *     "isExplicit": false,
         *     "feedbackTokens": {
         *       "add": null,
         *       "remove": null
         *     }
         *   },
         *   {
         *     "category": "Albums",
         *     "resultType": "album",
         *     "browseId": "MPREb_9nqEki4ZDpp",
         *     "title": "(What's The Story) Morning Glory? (Remastered)",
         *     "type": "Album",
         *     "artist": "Oasis",
         *     "year": "1995",
         *     "isExplicit": false
         *   },
         *   {
         *     "category": "Community playlists",
         *     "resultType": "playlist",
         *     "browseId": "VLPLK1PkWQlWtnNfovRdGWpKffO1Wdi2kvDx",
         *     "title": "Wonderwall - Oasis",
         *     "author": "Tate Henderson",
         *     "itemCount": "174"
         *   },
         *   {
         *     "category": "Videos",
         *     "resultType": "video",
         *     "videoId": "bx1Bh8ZvH84",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "386M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Artists",
         *     "resultType": "artist",
         *     "browseId": "UCmMUZbaYdNH0bEd1PAlAqsA",
         *     "artist": "Oasis",
         *     "shuffleId": "RDAOkjHYJjL1a3xspEyVkhHAsg",
         *     "radioId": "RDEMkjHYJjL1a3xspEyVkhHAsg"
         *   }
         * ]
         */
        search(query: string, options?: {
            filter?: 'community_playlists';
            scope?: Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<st.searchReturn<'community_playlists'>>;
        /**
         * Search YouTube music.
         * Returns results within the provided category.
         * @param {string} query Query string, i.e. 'Oasis Wonderwall'
         * @param {options} [options=]
         * @param {'songs'|'videos'|'albums'|'artists'|'playlists'|'community_playlists'|'featured_playlists'} [options.filter=] Filter for item types.
         *    @default: Default search, including all types of items.
         * @param {'libary'|'uploads'} [options.scope=] Search scope.
         *    @default: Search the public YouTube Music catalogue.
         * @param {number} [options.limit=20] Number of search results to return
         * @param {boolean} [ignoreSpelling=false] Whether to ignore YTM spelling suggestions.
         * If true, the exact search term will be searched for, and will not be corrected.
         * This does not have any effect when the filter is set to ``uploads``.
         * Default: false, will use YTM's default behavior of autocorrecting the search.
         * @return List of results depending on filter.
         * resultType specifies the type of item (important for default search).
         * albums, artists and playlists additionally contain a browseId, corresponding to
         * albumId, channelId and playlistId (browseId=``VL``+playlistId)
         * @example <caption> list for default search with one result per resultType for brevity. Normally
         * there are 3 results per resultType and an additional ``thumbnails`` key. </caption>
         * [
         *   {
         *     "category": "Top result",
         *     "resultType": "video",
         *     "videoId": "vU05Eksc_iM",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "1.4M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Songs",
         *     "resultType": "song",
         *     "videoId": "ZrOKjDZOtkA",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "album": {
         *       "name": "(What's The Story) Morning Glory? (Remastered)",
         *       "id": "MPREb_9nqEki4ZDpp"
         *     },
         *     "duration": "4:19",
         *     "duration_seconds": 259
         *     "isExplicit": false,
         *     "feedbackTokens": {
         *       "add": null,
         *       "remove": null
         *     }
         *   },
         *   {
         *     "category": "Albums",
         *     "resultType": "album",
         *     "browseId": "MPREb_9nqEki4ZDpp",
         *     "title": "(What's The Story) Morning Glory? (Remastered)",
         *     "type": "Album",
         *     "artist": "Oasis",
         *     "year": "1995",
         *     "isExplicit": false
         *   },
         *   {
         *     "category": "Community playlists",
         *     "resultType": "playlist",
         *     "browseId": "VLPLK1PkWQlWtnNfovRdGWpKffO1Wdi2kvDx",
         *     "title": "Wonderwall - Oasis",
         *     "author": "Tate Henderson",
         *     "itemCount": "174"
         *   },
         *   {
         *     "category": "Videos",
         *     "resultType": "video",
         *     "videoId": "bx1Bh8ZvH84",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "386M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Artists",
         *     "resultType": "artist",
         *     "browseId": "UCmMUZbaYdNH0bEd1PAlAqsA",
         *     "artist": "Oasis",
         *     "shuffleId": "RDAOkjHYJjL1a3xspEyVkhHAsg",
         *     "radioId": "RDEMkjHYJjL1a3xspEyVkhHAsg"
         *   }
         * ]
         */
        search(query: string, options?: {
            filter?: 'featured_playlists';
            scope?: Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<st.searchReturn<'featured_playlists'>>;
        /**
         * Search YouTube music.
         * Returns results within the provided category.
         * @param {string} query Query string, i.e. 'Oasis Wonderwall'
         * @param {options} [options=]
         * @param {'songs'|'videos'|'albums'|'artists'|'playlists'|'community_playlists'|'featured_playlists'} [options.filter=] Filter for item types.
         *    @default: Default search, including all types of items.
         * @param {'libary'|'uploads'} [options.scope=] Search scope.
         *    @default: Search the public YouTube Music catalogue.
         * @param {number} [options.limit=20] Number of search results to return
         * @param {boolean} [ignoreSpelling=false] Whether to ignore YTM spelling suggestions.
         * If true, the exact search term will be searched for, and will not be corrected.
         * This does not have any effect when the filter is set to ``uploads``.
         * Default: false, will use YTM's default behavior of autocorrecting the search.
         * @return List of results depending on filter.
         * resultType specifies the type of item (important for default search).
         * albums, artists and playlists additionally contain a browseId, corresponding to
         * albumId, channelId and playlistId (browseId=``VL``+playlistId)
         * @example <caption> list for default search with one result per resultType for brevity. Normally
         * there are 3 results per resultType and an additional ``thumbnails`` key. </caption>
         * [
         *   {
         *     "category": "Top result",
         *     "resultType": "video",
         *     "videoId": "vU05Eksc_iM",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "1.4M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Songs",
         *     "resultType": "song",
         *     "videoId": "ZrOKjDZOtkA",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "album": {
         *       "name": "(What's The Story) Morning Glory? (Remastered)",
         *       "id": "MPREb_9nqEki4ZDpp"
         *     },
         *     "duration": "4:19",
         *     "duration_seconds": 259
         *     "isExplicit": false,
         *     "feedbackTokens": {
         *       "add": null,
         *       "remove": null
         *     }
         *   },
         *   {
         *     "category": "Albums",
         *     "resultType": "album",
         *     "browseId": "MPREb_9nqEki4ZDpp",
         *     "title": "(What's The Story) Morning Glory? (Remastered)",
         *     "type": "Album",
         *     "artist": "Oasis",
         *     "year": "1995",
         *     "isExplicit": false
         *   },
         *   {
         *     "category": "Community playlists",
         *     "resultType": "playlist",
         *     "browseId": "VLPLK1PkWQlWtnNfovRdGWpKffO1Wdi2kvDx",
         *     "title": "Wonderwall - Oasis",
         *     "author": "Tate Henderson",
         *     "itemCount": "174"
         *   },
         *   {
         *     "category": "Videos",
         *     "resultType": "video",
         *     "videoId": "bx1Bh8ZvH84",
         *     "title": "Wonderwall",
         *     "artists": [
         *       {
         *         "name": "Oasis",
         *         "id": "UCmMUZbaYdNH0bEd1PAlAqsA"
         *       }
         *     ],
         *     "views": "386M",
         *     "duration": "4:38",
         *     "duration_seconds": 278
         *   },
         *   {
         *     "category": "Artists",
         *     "resultType": "artist",
         *     "browseId": "UCmMUZbaYdNH0bEd1PAlAqsA",
         *     "artist": "Oasis",
         *     "shuffleId": "RDAOkjHYJjL1a3xspEyVkhHAsg",
         *     "radioId": "RDEMkjHYJjL1a3xspEyVkhHAsg"
         *   }
         * ]
         */
        search(query: string, options?: {
            filter?: 'uploads';
            scope?: Scope;
            limit?: number;
            ignoreSpelling?: boolean;
        }): Promise<st.searchReturn<'uploads'>>;
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
