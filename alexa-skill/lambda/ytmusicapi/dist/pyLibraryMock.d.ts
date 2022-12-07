export declare const re: {
    findall: (regex: RegExp, string: string) => string[];
    split: (regex: RegExp, string: string) => string[];
    search: (regex: RegExp, string: string) => RegExpMatchArray | null;
    match: (regex: RegExp, string: string) => RegExpMatchArray | null;
    sub: (regex: RegExp, replaceValue: string, string: string) => string;
};
export declare const json: {
    loads: <T>(text: string) => any;
    load: <T_1>(text: string | Buffer) => any;
    dumps: (value: any) => string;
    dump: (value: any, { ensureAscii, indent, }: {
        ensureAscii?: boolean;
        indent?: number;
    }) => string;
};
export declare const time: {
    time: () => number;
};
export declare const locale: {
    atoi: (string: string) => number;
};
export declare class SimpleCookie {
    '__Secure-3PAPISID': any;
    load(cookie: string): void;
}
export declare const isDigit: (s: string) => boolean;
