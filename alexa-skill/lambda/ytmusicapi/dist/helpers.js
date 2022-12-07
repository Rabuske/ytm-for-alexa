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
exports.clearUnsafeHeaders = exports.sumTotalDuration = exports.parseDuration = exports.toInt = exports.getAuthorization = exports.sapisidFromCookie = exports.getVisitorId = exports.initializeContext = exports.initializeHeaders = void 0;
const pyLibraryMock_1 = require("./pyLibraryMock");
const utf8 = __importStar(require("utf8"));
const constants = __importStar(require("./constants"));
const crypto_1 = require("crypto");
// @CODYDUONG TODO type better
function initializeHeaders() {
    return {
        'user-agent': constants.USER_AGENT,
        accept: '*/*',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
        'content-encoding': 'gzip',
        origin: constants.YTM_DOMAIN,
    };
}
exports.initializeHeaders = initializeHeaders;
// @CODYDUONG TODO type better
function initializeContext() {
    return {
        context: {
            client: {
                clientName: 'WEB_REMIX',
                clientVersion: '0.1',
            },
            user: {},
        },
    };
}
exports.initializeContext = initializeContext;
// @CODYDUONG TODO type better
async function getVisitorId(requestFunc) {
    const response = await requestFunc(constants.YTM_DOMAIN);
    const matches = pyLibraryMock_1.re.findall(/ytcfg\.set\s*\(\s*({.+?})\s*\)\s*;/, response);
    let visitorId = '';
    if (matches.length > 0) {
        const ytcfg = pyLibraryMock_1.json.loads(matches[0]);
        visitorId = ytcfg === null || ytcfg === void 0 ? void 0 : ytcfg.VISITOR_DATA;
    }
    return { 'X-Goog-Visitor-Id': visitorId };
}
exports.getVisitorId = getVisitorId;
function sapisidFromCookie(_rawCookie) {
    const cookie = new pyLibraryMock_1.SimpleCookie();
    cookie.load(_rawCookie);
    return cookie['__Secure-3PAPISID'];
}
exports.sapisidFromCookie = sapisidFromCookie;
// // SAPISID Hash reverse engineered by
// // https://stackoverflow.com/a/32065323/5726546
function getAuthorization(auth) {
    const sha_1 = (0, crypto_1.createHash)('sha1');
    const unix_timestamp = Math.trunc(pyLibraryMock_1.time.time()).toString();
    sha_1.update(utf8.encode(unix_timestamp + ' ' + auth));
    return 'SAPISIDHASH ' + unix_timestamp + '_' + sha_1.digest('hex');
}
exports.getAuthorization = getAuthorization;
function toInt(string) {
    const numberString = pyLibraryMock_1.re.sub(/^\\d/, '', string);
    let intValue;
    try {
        intValue = pyLibraryMock_1.locale.atoi(numberString);
    }
    catch (e) {
        if (e instanceof TypeError) {
            const numberString2 = numberString.replace(',', '');
            intValue = parseInt(numberString2);
        }
        else {
            throw e;
        }
    }
    return intValue;
}
exports.toInt = toInt;
function zip(arr1, arr2) {
    return arr1.map((k, i) => [k, arr2[i]]);
}
function sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
}
function parseDuration(duration) {
    if (!duration) {
        return Number(duration);
    }
    const mappedIncrements = zip([1, 60, 3600], duration.split(':').reverse());
    const seconds = sum(mappedIncrements.map(([multiplier, time]) => multiplier * parseInt(time)));
    return seconds;
}
exports.parseDuration = parseDuration;
function sumTotalDuration(item) {
    return sum(item.tracks.map(({ track }) => { var _a; return (_a = track === null || track === void 0 ? void 0 : track.duration_seconds) !== null && _a !== void 0 ? _a : 0; }));
}
exports.sumTotalDuration = sumTotalDuration;
//Removes any headers controlled by browser
function clearUnsafeHeaders(o) {
    if (window) {
        delete o['user-agent'];
        delete o['accept-encoding'];
        delete o['origin'];
    }
}
exports.clearUnsafeHeaders = clearUnsafeHeaders;
