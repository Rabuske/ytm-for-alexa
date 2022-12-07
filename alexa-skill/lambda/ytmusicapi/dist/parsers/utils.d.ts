export declare function parseMenuPlaylists(data: Record<string, any> | null, result: Record<string, any>): void;
type FlexItem = {
    text: {
        runs: {
            text: string;
            navigationEndpoint: {
                watchEndpoint: {
                    videoId: string;
                    playlistId: string;
                };
                browseEndpoint: {
                    browseId: string;
                };
            };
        }[];
    };
};
export declare function getItemText(item: any, index: number, run_index?: number, none_if_absent?: boolean): string | null;
export declare function getFlexColumnItem(item: any, index: number): FlexItem | null;
export declare function getFixedColumnItem(item: {
    [x: string]: {
        [x: string]: {
            [x: string]: any;
        };
    };
}, index: number): any;
export declare function getBrowseId(item: Record<string, any>, index: string | number): null | any;
export declare function validatePlaylistId(playlistId: string | null | undefined): string | null;
export declare function getDotSeperatorIndex(runs: Record<string, any>[]): number;
export {};
