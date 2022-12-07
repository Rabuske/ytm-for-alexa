"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ytmusic_1 = require("./ytmusic");
const browsing_1 = require("./mixins/browsing");
const watch_1 = require("./mixins/watch");
const explore_1 = require("./mixins/explore");
const library_1 = require("./mixins/library");
const playlists_1 = require("./mixins/playlists");
const uploads_1 = require("./mixins/uploads");
const search_1 = require("./mixins/search");
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
const YTMusic = (0, uploads_1.UploadsMixin)((0, library_1.LibraryMixin)((0, playlists_1.PlaylistsMixin)((0, explore_1.ExploreMixin)((0, watch_1.WatchMixin)((0, browsing_1.BrowsingMixin)((0, search_1.SearchMixin)(ytmusic_1._YTMusic)))))));
exports.default = YTMusic;
