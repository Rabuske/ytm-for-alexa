import { thumbnails } from '../types';
import { parseSongArtistsReturn } from './songs';
export type parseChartSongReturn = {
    title: string;
    videoId: string | null;
    artists: parseSongArtistsReturn;
    thumbnails: thumbnails;
    isExplicit: boolean;
} & ({
    album?: {
        name: string;
        id: string;
    };
} | {
    views: string;
});
export declare function parseChartSong(data: any): parseChartSongReturn;
export type parseChartArtistReturn = {
    title: string;
    browseId: string;
    subscribers: string | null;
    thumbnails: thumbnails;
};
export declare function parseChartArtist(data: any): parseChartArtistReturn;
export type parseChartTrendingReturn = {
    title: string;
    videoId: string | null;
    playlistId: string | null;
    artists: parseSongArtistsReturn;
    thumbnails: thumbnails;
    views?: string | null;
} | null;
export declare function parseChartTrending(data: any): parseChartTrendingReturn;
export declare function parseRanking(data: any): Record<string, any>;
