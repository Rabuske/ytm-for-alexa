"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const en_json_1 = __importDefault(require("./en.json"));
const de_json_1 = __importDefault(require("./de.json"));
const es_json_1 = __importDefault(require("./es.json"));
const fr_json_1 = __importDefault(require("./fr.json"));
const it_json_1 = __importDefault(require("./it.json"));
const ja_json_1 = __importDefault(require("./ja.json"));
const ko_json_1 = __importDefault(require("./ko.json"));
const zh_CN_json_1 = __importDefault(require("./zh_CN.json"));
const resources = { en: en_json_1.default, de: de_json_1.default, es: es_json_1.default, fr: fr_json_1.default, it: it_json_1.default, ja: ja_json_1.default, ko: ko_json_1.default, zh_CN: zh_CN_json_1.default };
exports.default = resources;
