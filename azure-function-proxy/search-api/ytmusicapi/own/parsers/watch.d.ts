import { thumbnail } from '../types';
import { parseLikeStatusReturn, parseSongMenuTokensReturn, parseSongRunsReturn } from './songs';
export type parseWatchPlaylistReturn = (parseWatchTrackReturn & {
    counterpart?: parseWatchTrackReturn;
})[];
export declare function parseWatchPlaylist(results: Array<Record<string, any>>): parseWatchPlaylistReturn;
export type parseWatchTrackReturn = {
    videoId: string;
    title: string;
    length: string;
    thumbnail: thumbnail;
    feedbackTokens: parseSongMenuTokensReturn;
    likeStatus: parseLikeStatusReturn;
} & parseSongRunsReturn;
export declare function getTabBrowseId(watchNextRenderer: any, tab_id: any): null | any;
