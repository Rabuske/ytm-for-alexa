export type parseSongArtistsReturn = ReturnType<typeof parseSongArtistsRuns> | null;
export declare function parseSongArtists(data: any, index: number): parseSongArtistsReturn;
export declare function parseSongArtistsRuns(runs: any): {
    name: string;
    id?: string | null;
}[];
export type parseSongRunsReturn = {
    artists: {
        name: string;
        id?: string | null;
    }[];
    album?: {
        name: string;
        id: string;
    };
    views?: string;
    duration?: string;
    duration_seconds?: number;
    year?: string;
};
export declare function parseSongRuns(runs: Array<any>): parseSongRunsReturn;
export type parseSongAlbumReturn = {
    name: string | null;
    id: string;
} | null;
export declare function parseSongAlbum(data: any, index: number): parseSongAlbumReturn;
export type parseSongMenuTokensReturn = {
    add: string[];
    remove: string[];
};
export declare function parseSongMenuTokens(item: any): any;
export type parseLikeStatusReturn = 'LIKE' | 'INDIFFERENT';
export declare function parseLikeStatus(service: any): parseLikeStatusReturn;
