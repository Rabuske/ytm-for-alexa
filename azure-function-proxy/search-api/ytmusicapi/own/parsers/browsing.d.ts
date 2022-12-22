import * as bT from '../mixins/browsing.types';
import * as parser_bT from './browsing.types';
import { Filter } from '../types';
export declare class Parser {
    constructor();
    parseSearchResults(results: bT.parseResults, resultType: bT.resultType | bT.parseSearchResultsAdditionalResultTypes | null, category: Filter | undefined): Array<any>;
    parseArtistContents(results: bT.getArtistResults): parser_bT.parseArtistContentsReturn;
    parseMixedContent(rows: any): parser_bT.parseHomeReturn;
}
export declare function parseContentList<T>(results: Array<Record<string, any>>, parse_func: (arg0: any) => T, key?: string): Array<T>;
export declare function parseSongFlat(data: any): Omit<parser_bT.parseSongFlatReturn, 'playlistId'>;
export declare function parseVideo(result: {
    [x: string]: {
        [x: string]: any;
    };
}): parser_bT.parseVideoReturn;
export declare function parsePlaylist(data: {
    [x: string]: {
        [x: string]: any;
    };
}): parser_bT.parsePlaylistReturn;
export declare function parseRelatedArtist(data: any): parser_bT.parseRelatedArtistReturn;
