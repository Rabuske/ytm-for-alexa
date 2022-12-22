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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __YTMusic_auth, __YTMusic_language;
Object.defineProperty(exports, "__esModule", { value: true });
exports._YTMusic = void 0;
const case_insensitive_object_1 = __importDefault(require("case-insensitive-object"));
const pyLibraryMock_1 = require("./pyLibraryMock");
const constants_1 = require("./constants");
const fs = __importStar(require("fs"));
const helpers = __importStar(require("./helpers"));
const browsing_1 = require("./parsers/browsing");
const setup_1 = require("./setup");
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const i18next_1 = __importDefault(require("i18next"));
const locales_1 = __importDefault(require("./locales"));
if (typeof process != 'undefined') {
    axios_1.default.defaults.adapter = require('axios/lib/adapters/http');
}
class _YTMusic {
    /**
     * This is an internal class, please use {@link YTMusic}
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
     * @access private
     */
    constructor(options) {
        var _a;
        __YTMusic_auth.set(this, void 0);
        __YTMusic_language.set(this, void 0);
        const { auth: auth, user: user, proxies: proxies, language: language = 'en', httpsAgent, } = options !== null && options !== void 0 ? options : {};
        __classPrivateFieldSet(this, __YTMusic_auth, auth !== null && auth !== void 0 ? auth : null, "f");
        if (typeof httpsAgent === 'boolean') {
            if (httpsAgent) {
                this._httpsAgent = new https_1.default.Agent({
                    timeout: 30000,
                });
            }
            else {
                this._httpsAgent = undefined;
            }
        }
        else {
            this._httpsAgent = httpsAgent;
        }
        this._proxies = proxies;
        this._cookies = { CONSENT: 'YES+1' };
        // prepare headers
        this._headers = helpers.initializeHeaders();
        if (typeof auth == 'object') {
            this._headers = (0, case_insensitive_object_1.default)(auth);
        }
        else if (auth && fs && fs.existsSync(auth)) {
            const file = auth;
            const data = fs.readFileSync(file);
            this._headers = (0, case_insensitive_object_1.default)(pyLibraryMock_1.json.load(data));
        }
        else if (auth) {
            this._headers = (0, case_insensitive_object_1.default)(pyLibraryMock_1.json.loads(auth));
        }
        //TODO check if the IIAFE breaks this or not...
        if (!((_a = this._headers) === null || _a === void 0 ? void 0 : _a['x-goog-visitor-id'])) {
            let helpersGetVisitorId = {};
            (async () => {
                helpersGetVisitorId = await helpers.getVisitorId(this._sendGetRequest);
            })();
            this._headers = (0, case_insensitive_object_1.default)(Object.assign(Object.assign({}, this._headers), helpersGetVisitorId));
        }
        // prepare context
        this._context = helpers.initializeContext();
        this._context['context']['client']['hl'] = language;
        __classPrivateFieldSet(this, __YTMusic_language, language, "f");
        const supportedLanguages = [
            'en',
            'de',
            'es',
            'fr',
            'it',
            'ja',
            'ko',
            'zh_CN',
        ];
        if (!supportedLanguages.includes(language)) {
            console.warn(`The language '${language}' is not supported.\nSupported languages are ${supportedLanguages.join(', ')}\nYTMusicAPI will still work, but some functions such as search or get_artist may not work. See https://github.com/codyduong/ytmusicapiJS/tree/main/src/locales for more details.`);
        }
        if (i18next_1.default.isInitialized && i18next_1.default.language != language) {
            throw new Error('Multiple instances of YTMusic are not supported with different languages, please use changeLangauge instance function instead!');
        }
        else {
            (async () => {
                await i18next_1.default.init({
                    lng: language !== null && language !== void 0 ? language : 'en',
                    //debug: true,
                    resources: locales_1.default,
                });
            })();
        }
        this._parser = new browsing_1.Parser();
        if (user) {
            this._context['context']['user']['onBehalfOfUser'] = user;
        }
        // verify authentication credentials work
        if (auth) {
            const cookie = this._headers.cookie;
            if (cookie) {
                this._sapisid = helpers.sapisidFromCookie(cookie);
            }
            else {
                throw new Error('Your cookie is missing the required value __Secure-3PAPISID');
            }
        }
    }
    async _sendRequest(endpoint, body, additionalParams = '') {
        var _a;
        body = Object.assign(Object.assign({}, body), this._context);
        if (__classPrivateFieldGet(this, __YTMusic_auth, "f")) {
            const origin = (_a = this._headers['origin']) !== null && _a !== void 0 ? _a : this._headers['x-origin'];
            this._headers['authorization'] = helpers.getAuthorization(this._sapisid + ' ' + origin);
        }
        // console.log(YTM_BASE_API + endpoint + YTM_PARAMS + additionalParams, body, {
        //   headers: this._headers,
        //   proxy: this._proxies,
        // });
        const response = await axios_1.default.post(constants_1.YTM_BASE_API + endpoint + constants_1.YTM_PARAMS + additionalParams, JSON.stringify(body), {
            headers: this._headers,
            proxy: this._proxies,
            httpsAgent: this === null || this === void 0 ? void 0 : this._httpsAgent,
            // cookies: this._cookies,
        });
        //console.log(response);
        const responseText = response.data;
        return responseText;
    }
    async _sendGetRequest(url, params) {
        const response = await axios_1.default.get(url, {
            params: params,
            headers: this === null || this === void 0 ? void 0 : this._headers,
            proxy: this === null || this === void 0 ? void 0 : this._proxies,
            httpsAgent: this === null || this === void 0 ? void 0 : this._httpsAgent,
        });
        return response.data;
    }
    checkAuth() {
        if (!__classPrivateFieldGet(this, __YTMusic_auth, "f")) {
            return null;
        }
        else {
            return this;
        }
    }
    _checkAuth() {
        if (!__classPrivateFieldGet(this, __YTMusic_auth, "f")) {
            throw new Error('Please provide authentication before using this function');
        }
    }
    getAuth() {
        return __classPrivateFieldGet(this, __YTMusic_auth, "f");
    }
    static setup(options) {
        const { filepath, headersRaw } = options;
        return (0, setup_1.setup)(filepath, headersRaw);
    }
    async changeLanguage(language) {
        __classPrivateFieldSet(this, __YTMusic_language, language, "f");
        this._context['context']['client']['hl'] = language;
        const changeLanguage = new Promise((resolve, reject) => {
            i18next_1.default.changeLanguage(language, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
        await changeLanguage;
    }
    getLanguage() {
        return __classPrivateFieldGet(this, __YTMusic_language, "f");
    }
    getProxy() {
        return this._proxies;
    }
}
exports._YTMusic = _YTMusic;
__YTMusic_auth = new WeakMap(), __YTMusic_language = new WeakMap();
