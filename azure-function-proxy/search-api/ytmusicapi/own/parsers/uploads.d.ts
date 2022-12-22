import { Rating } from '../mixins/library.types';
import { thumbnails } from '../types';
import { parseSongAlbumReturn, parseSongArtistsReturn } from './songs';
export type parseUploadedItemsReturn = {
    entityId: string;
    videoId: string;
    title: string | null;
    duration: string;
    duration_seconds: number;
    artists: parseSongArtistsReturn;
    album: parseSongAlbumReturn;
    likeStatus: Rating;
    thumbnails: thumbnails;
};
export declare function parseUploadedItems(results: any): Array<parseUploadedItemsReturn>;
