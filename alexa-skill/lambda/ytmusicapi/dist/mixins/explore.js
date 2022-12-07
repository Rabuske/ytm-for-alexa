"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExploreMixin = void 0;
const parsers_1 = require("../parsers");
const browsing_1 = require("../parsers/browsing");
const explore_1 = require("../parsers/explore");
/**
 * @module Explore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const ExploreMixin = (Base) => {
    return class ExploreMixin extends Base {
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
        async getMoodCategories() {
            const sections = {};
            const response = await this._sendRequest('browse', { browseId: 'FEmusic_moods_and_genres' });
            const naved = (0, parsers_1.nav)(response, [...parsers_1.SINGLE_COLUMN_TAB, ...parsers_1.SECTION_LIST]);
            for (const section of naved) {
                const title = (0, parsers_1.nav)(section, [
                    ...parsers_1.GRID,
                    'header',
                    'gridHeaderRenderer',
                    ...parsers_1.TITLE_TEXT,
                ]);
                sections[title] = [];
                for (const category of (0, parsers_1.nav)(section, parsers_1.GRID_ITEMS)) {
                    sections[title].push({
                        title: (0, parsers_1.nav)(category, parsers_1.CATEGORY_TITLE),
                        params: (0, parsers_1.nav)(category, parsers_1.CATEGORY_PARAMS),
                    });
                }
            }
            return sections;
        }
        /**
         * Retrieve a list of playlists for a given "Moods & Genres" category.
         * @param params params obtained by `getMoodCategories`
         * @returns List of playlists in the format of `getLibraryPlaylists`
         */
        async getMoodPlaylists(params) {
            let playlists = [];
            const response = await this._sendRequest('browse', {
                browseId: 'FEmusic_moods_and_genres_category',
                params: params,
            });
            for (const section of (0, parsers_1.nav)(response, [
                ...parsers_1.SINGLE_COLUMN_TAB,
                ...parsers_1.SECTION_LIST,
            ])) {
                let results;
                if ('gridRenderer' in section) {
                    // Cast as any since TS didn't detect this control flow discrimination...
                    results = (0, parsers_1.nav)(section, parsers_1.GRID_ITEMS);
                }
                else if ('musicCarouselShelfRenderer' in section) {
                    // ditto
                    results = (0, parsers_1.nav)(section, parsers_1.CAROUSEL_CONTENTS);
                }
                else if ('musicImmersiveCarouselShelfRenderer' in section) {
                    // ditto
                    results = (0, parsers_1.nav)(section, [
                        'musicImmersiveCarouselShelfRenderer',
                        'contents',
                    ]);
                }
                if (results) {
                    playlists = [
                        ...playlists,
                        ...(0, browsing_1.parseContentList)(results, browsing_1.parsePlaylist),
                    ];
                }
            }
            return playlists;
        }
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
        async getCharts(country = 'ZZ') {
            const body = { browseId: 'FEmusic_charts' };
            if (country) {
                body['formData'] = { selectedValues: [country] };
            }
            const endpoint = 'browse';
            const response = await this._sendRequest(endpoint, body);
            const results = (0, parsers_1.nav)(response, [...parsers_1.SINGLE_COLUMN_TAB, ...parsers_1.SECTION_LIST]);
            const charts = {
                countries: {},
            };
            const menu = (0, parsers_1.nav)(results[0], [
                ...parsers_1.MUSIC_SHELF,
                'subheaders',
                0,
                'musicSideAlignedItemRenderer',
                'startItems',
                0,
                'musicSortFilterButtonRenderer',
            ]);
            charts['countries']['selected'] = (0, parsers_1.nav)(menu, parsers_1.TITLE);
            charts['countries']['options'] = (0, parsers_1.nav)(response, parsers_1.FRAMEWORK_MUTATIONS)
                .map((m) => (0, parsers_1.nav)(m, ['payload', 'musicFormBooleanChoice', 'opaqueToken'], null))
                .filter((x) => x);
            const chartsCategories = ['videos', 'artists'];
            const hasSongs = !!this.getAuth();
            const hasGenres = country == 'US';
            const hasTrending = country != 'ZZ';
            if (hasSongs) {
                chartsCategories.splice(0, 0, 'songs');
            }
            if (hasGenres) {
                chartsCategories.push('genres');
            }
            if (hasTrending) {
                chartsCategories.push('trending');
            }
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const parseChart = (i, parseFunc, key) => {
                return (0, browsing_1.parseContentList)((0, parsers_1.nav)(results[i + (hasSongs ? 1 : 0)], parsers_1.CAROUSEL_CONTENTS, null), parseFunc, key).filter((x) => x);
            };
            for (const [i, c] of chartsCategories.entries()) {
                //@ts-expect-error, we'll set the items later...
                charts[c] = {
                    playlist: (0, parsers_1.nav)(results[1 + i], [...parsers_1.CAROUSEL, ...parsers_1.CAROUSEL_TITLE, ...parsers_1.NAVIGATION_BROWSE_ID], null),
                };
            }
            if (hasSongs) {
                charts['songs'] = Object.assign(Object.assign({}, charts['songs']), {
                    items: parseChart(0, explore_1.parseChartSong, parsers_1.MRLIR),
                });
            }
            charts['videos']['items'] = parseChart(1, browsing_1.parseVideo, parsers_1.MTRIR);
            charts['artists']['items'] = parseChart(2, explore_1.parseChartArtist, parsers_1.MRLIR);
            if (hasGenres) {
                //@ts-expect-error: TS didn't detect this control flow discrimination...
                charts['genres'] = parseChart(3, browsing_1.parsePlaylist, parsers_1.MTRIR);
            }
            if (hasTrending) {
                charts['trending']['items'] = parseChart(3 + (hasGenres ? 1 : 0), explore_1.parseChartTrending, parsers_1.MRLIR);
            }
            return charts;
        }
    };
};
exports.ExploreMixin = ExploreMixin;
