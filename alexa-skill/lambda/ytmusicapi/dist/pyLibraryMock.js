"use strict";
//This library mocks some python libraries, using JS replacements.
//It is not a complete substitute of these libraries, but instead mocks the necessary features only.
//For ease of reading code from the original library and vice/versa
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDigit = exports.SimpleCookie = exports.locale = exports.time = exports.json = exports.re = void 0;
exports.re = {
    findall: function (regex, string) {
        const hits = [];
        // Iterate hits
        let match = null;
        do {
            match = regex.exec(string);
            if (match) {
                hits.push(match[0]);
            }
        } while (match);
        return hits;
    },
    split: (regex, string) => string.split(regex),
    search: (regex, string) => string.match(regex),
    match: (regex, string) => string.match(regex),
    sub: (regex, replaceValue, string) => string.replace(regex, replaceValue),
};
const convertToAsciiSafe = (string) => string.replace(/[\u007F-\uFFFF]/g, function (chr) {
    return '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).substr(-4);
});
exports.json = {
    loads: (text) => JSON.parse(text),
    //Handles buffer input
    load: (text) => JSON.parse(text.toString()),
    dumps: (value) => JSON.stringify(value),
    //Handles file output
    dump: (value, { ensureAscii = false, indent = 4, }) => {
        if (ensureAscii) {
            return convertToAsciiSafe(JSON.stringify(value, null, indent));
        }
        else {
            return JSON.stringify(value, null, indent);
        }
    },
};
exports.time = {
    time: () => new Date().getTime() / 1000,
};
//I'm not sure if this implementation is the same @codyduong
exports.locale = {
    atoi: (string) => {
        const numbered = Number(string);
        if (isNaN(numbered)) {
            throw new TypeError('Could not convert to number');
        }
        return parseInt(numbered.toFixed(0));
    },
};
class SimpleCookie {
    load(cookie) {
        const cookieArrayed = cookie.split('; ');
        for (const keyedPair of cookieArrayed) {
            const splitPair = keyedPair.split('=');
            if (splitPair[0] === '__Secure-3PAPISID') {
                this['__Secure-3PAPISID'] = splitPair[1];
                break;
            }
        }
    }
}
exports.SimpleCookie = SimpleCookie;
const isDigit = (s) => /^\d+$/.test(s);
exports.isDigit = isDigit;
