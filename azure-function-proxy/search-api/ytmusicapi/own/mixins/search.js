"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchMixin = void 0;
const nav_1 = require("@codyduong/nav");
const parsers_1 = require("../parsers");
const searchParams_1 = require("../parsers/searchParams");
const continuations_1 = require("../parsers/continuations");
/**
 * @module Search
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const SearchMixin = (Base) => {
    return class Search extends Base {
        async search(query, options) {
            const _options = options !== null && options !== void 0 ? options : {};
            let { filter } = _options;
            const { scope, limit = 20, ignoreSpelling } = _options;
            const body = { query: query };
            const endpoint = 'search';
            let searchResults = [];
            const filters = [
                'albums',
                'artists',
                'playlists',
                'community_playlists',
                'featured_playlists',
                'songs',
                'videos',
            ];
            if (filter && !filters.includes(filter)) {
                throw new Error(`Invalid filter provided. Please use one of the following filters or leave out the parameter: ${filters.join(', ')}`);
            }
            const scopes = ['library', 'uploads'];
            if (scope && !scopes.includes(scope)) {
                throw new Error(`Invalid scope provided. Please use one of the following scopes or leave out the parameter: ${scopes.join(', ')}`);
            }
            const params = (0, searchParams_1.getSearchParams)(filter, scope, ignoreSpelling);
            if (params) {
                body['params'] = params;
            }
            const response = await this._sendRequest(endpoint, body);
            // no results
            if (!response['contents']) {
                return searchResults;
            }
            let results;
            if ('tabbedSearchResultsRenderer' in response.contents) {
                //0 if not scope or filter else scopes.index(scope) + 1
                const tab_index = !scope || filter ? 0 : scopes.indexOf(scope) + 1;
                results =
                    response['contents']['tabbedSearchResultsRenderer']['tabs'][tab_index]['tabRenderer']['content'];
            }
            else {
                results = response['contents'];
            }
            const resultsNav = (0, nav_1.nav)(results, parsers_1.SECTION_LIST);
            // no results
            if (!resultsNav ||
                (resultsNav.length == 1 && 'itemSectionRenderer' in resultsNav)) {
                return searchResults;
            }
            //set filter for parser
            if (filter && filter.split('_').includes('playlists')) {
                filter = 'playlists';
            }
            else if (scope == 'uploads') {
                filter = 'uploads';
            }
            for (const res of resultsNav) {
                if ('musicShelfRenderer' in res) {
                    const resultsMusicShelfContents = res['musicShelfRenderer']['contents'];
                    const original_filter = filter;
                    const category = (0, nav_1.nav)(res, [...parsers_1.MUSIC_SHELF, ...parsers_1.TITLE_TEXT], null);
                    if (!filter && scope == scopes[0]) {
                        filter = category;
                    }
                    const type = filter
                        ? filter.slice(undefined, -1).toLowerCase()
                        : null;
                    searchResults = [
                        ...searchResults,
                        ...this._parser.parseSearchResults(resultsMusicShelfContents, type, category),
                    ];
                    filter = original_filter;
                    if ('continuations' in res['musicShelfRenderer']) {
                        const requestFunc = async (additionalParams) => await this._sendRequest(endpoint, body, additionalParams);
                        const parseFunc = (contents) => this._parser.parseSearchResults(contents, type, category);
                        searchResults = [
                            ...searchResults,
                            ...(await (0, continuations_1.getContinuations)(res['musicShelfRenderer'], 'musicShelfContinuation', limit - searchResults.length, requestFunc, parseFunc)),
                        ];
                    }
                }
            }
            return searchResults;
        }
    };
};
exports.SearchMixin = SearchMixin;
