import * as parser_lt from './library.types';
export declare function parseArtists(results: any, uploaded?: boolean): Array<any>;
export declare function parseLibraryAlbums(response: any, requestFunc: any, limit: number): Promise<any>;
export declare function parseAlbums(results: any): parser_lt.parseAlbumsReturn;
export declare function parseLibraryArtists(response: any, requestFunc: (arg1: any) => Promise<Record<string, any>>, limit: number): Promise<parser_lt.parseLibraryArtistsReturn>;
export declare function parseLibrarySongs(response: any): parser_lt.parseLibarySongsReturn;
