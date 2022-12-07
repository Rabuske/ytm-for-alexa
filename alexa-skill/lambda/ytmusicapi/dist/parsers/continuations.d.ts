import { parsePlaylistItemsReturn } from './playlists.types';
export declare function getContinuations(results: any, continuation_type: string | number, limit: number, requestFunc: (arg1: any) => Promise<Record<string, any>>, parse_func: (arg1: any) => any, ctokenPath?: string): Promise<Array<any>>;
export declare function getValidatedContinuations(results: any, continuation_type: any, limit: number, per_page: number, request_func: any, parse_func: any, ctoken_path?: string): Promise<any>;
export declare function getParsedContinuationItems(response: Record<string, any>, parseFunc: (arg0: any) => any, continuationType: string | number): any;
export declare function getContinuationString(ctoken: string): string;
export declare function resendRequestUntilParsedResponseIsValid<T extends {
    parsed: parsePlaylistItemsReturn;
    results: unknown;
}>(requestFunc: (additionalParams: any) => Promise<any>, request_additional_params: string | null, parse_func: (rawResponse: any) => T, validateFunc: (parsed: T) => boolean, max_retries: number): Promise<T>;
export declare function validateResponse(response: Record<string, any>, perPage: number, limit: number, currentCount: number): boolean;
