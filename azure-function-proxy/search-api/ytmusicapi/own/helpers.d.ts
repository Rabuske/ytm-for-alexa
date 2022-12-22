import type { Headers } from './types';
export declare function initializeHeaders(): Headers;
export declare function initializeContext(): any;
export declare function getVisitorId(requestFunc: (this: any, url: string, params?: Record<string, any>) => Promise<string>): Promise<{
    'X-Goog-Visitor-Id': string;
}>;
export declare function sapisidFromCookie(_rawCookie: any): any;
export declare function getAuthorization(auth: any): string;
export declare function toInt(string: string): any;
export declare function parseDuration(duration: string | undefined): number;
export declare function sumTotalDuration(item: any): number;
export declare function clearUnsafeHeaders(o: Record<string, any>): void;
