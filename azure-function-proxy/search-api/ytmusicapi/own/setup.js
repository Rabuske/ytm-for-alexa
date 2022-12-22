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
exports.setup = void 0;
const helpers = __importStar(require("./helpers"));
const pyLibraryMock_1 = require("./pyLibraryMock");
const fs = __importStar(require("fs"));
// const path = os.path.dirname(os.path.realpath(__file__)) + os.sep
// Is this used for anything...? @sigma67
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _path = __filename;
function setup(filepath, headersRaw) {
    var _a;
    const contents = [];
    let userHeaders = {};
    if (!headersRaw) {
        if (process) {
            const eof = 
            // eslint-disable-next-line prettier/prettier
            process.platform != 'win32' ? 'Ctrl-D' : '\'Enter, Ctrl-Z, Enter\'';
            console.log(`Please paste the request headers from Firefox and press ${eof} to continue:`);
            // eslint-disable-next-line no-constant-condition
            while (true) {
                //@CODYDUONG TODO double-check setup behavior
                let line;
                try {
                    line = prompt('');
                }
                catch (e) {
                    if (e)
                        break;
                    else
                        throw new Error(e.toString());
                }
                contents.push(line);
            }
        }
        else {
            throw new Error('headersRaw must be provided in jsdom!');
        }
        try {
            for (const content of contents) {
                const header = (_a = content === null || content === void 0 ? void 0 : content.split(': ')) !== null && _a !== void 0 ? _a : [];
                if (header.length == 1 || header[0] == ':') {
                    // nothing was split or chromium headers
                    continue;
                }
                userHeaders[header[0].toLowerCase()] = header.slice(1).join(': ');
            }
        }
        catch (e) {
            throw new Error('Error parsing your input, please try again. Full error: ' + String(e));
        }
    }
    userHeaders = pyLibraryMock_1.json.load(headersRaw);
    for (const key of Object.keys(userHeaders)) {
        userHeaders[key.toLowerCase()] = userHeaders[key];
    }
    const missing_headers = ['cookie', 'x-goog-authuser'].filter((reqKey) => !(reqKey in userHeaders));
    if (missing_headers.length > 0) {
        throw new Error(`The following entries are missing in your headers: ${missing_headers.join(', ')}\n
            Please try a different request (such as /browse) and make sure you are logged in.`);
    }
    const ignore_headers = [
        'host',
        'content-length',
        'accept-encoding',
        'Host',
        'Content-Length',
        'Accept-Encoding',
    ];
    for (const i of ignore_headers) {
        delete userHeaders[i];
    }
    const initHeaders = helpers.initializeHeaders();
    userHeaders = Object.assign(Object.assign({}, userHeaders), { initHeaders });
    const headers = userHeaders;
    if (filepath) {
        if (fs) {
            fs.writeFile(filepath, pyLibraryMock_1.json.dump(headers, {
                ensureAscii: true,
                indent: 4,
            }), (err) => {
                if (err) {
                    throw new Error(String(err));
                }
            });
        }
        else {
            console.warn(`Setup with filepath is not supported in jsdom! This parameter filepath: ${filepath} will not do anything.`);
        }
    }
    return pyLibraryMock_1.json.dumps(headers);
}
exports.setup = setup;
