/// <reference types="node" />
import { Parser } from './parsers/browsing';
import type { Headers } from './types';
import { AxiosProxyConfig } from 'axios';
import https from 'https';
type _YTMusicConstructorOptions = {
    auth?: string;
    user?: string;
    httpsAgent?: boolean | https.Agent;
    proxies?: AxiosProxyConfig | false;
    language?: string;
};
export declare class _YTMusic {
    #private;
    _httpsAgent: https.Agent | undefined;
    _proxies?: AxiosProxyConfig | false;
    _headers: Headers;
    _context: any;
    _parser: Parser;
    _sapisid: any;
    _cookies: Record<string, any>;
    /**
     * This is an internal class, please use {@link YTMusic}
     * @param {_YTMusicConstructorOptions} [options=] Options object.
     * @param {string | object} [options.auth=]  Provide a string (raw headers), object, or path (Node only!),
     * Authentication credentials are needed to manage your library.
     * Should be an adjusted version of `headers_auth.json.example` in the project root.
     * See `setup` for how to fill in the correct credentials.
     * If not provided, a default header is used without authentication.
     * @param {string} [options.user=]  Specify a user ID string to use in requests.
     * This is needed if you want to send requests on behalf of a brand account.
     * Otherwise the default account is used. You can retrieve the user ID
     * by going to https://myaccount.google.com/brandaccounts and selecting your brand account.
     * The user ID will be in the URL: https://myaccount.google.com/b/user_id/
     * @param {} [options.httpsAgent] Optional. Define an HTTP proxy for your request.
     * @param {AxiosProxyConfig} [options.proxies] Optional. Define an HTTP proxy for your request.
     * @param {string} [options.language] Optional. Can be used to change the language of returned data.
     * English will be used by default. Available languages can be checked in
     * the ytmusicapi/locales directory.
     * @access private
     */
    constructor(options?: _YTMusicConstructorOptions);
    _sendRequest<T extends Record<string, any>>(endpoint: string, body: Record<string, any>, additionalParams?: string): Promise<T>;
    _sendGetRequest(url: string, params?: Record<string, any>): Promise<string>;
    checkAuth(): this | null;
    _checkAuth(): void;
    getAuth(): string | null;
    /**
     * Requests browser headers from the user via command line
     * and returns a string that can be passed to YTMusic()
     */
    static setup(options: {
        filepath?: string;
        headersRaw: string;
    }): string;
    static setup(options: {
        filepath: string;
        headersRaw?: string;
    }): string;
    changeLanguage(language: string): Promise<void>;
    getLanguage(): string | undefined;
    getProxy(): AxiosProxyConfig | boolean | undefined;
}
export {};
