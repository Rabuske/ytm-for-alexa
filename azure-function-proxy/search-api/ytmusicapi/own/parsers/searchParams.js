"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchParams = void 0;
const FILTERED_PARAM1 = 'EgWKAQI';
function getSearchParams(filter, scope, ignoreSpelling) {
    let params;
    let param1, param2, param3;
    if (!filter && !scope && !ignoreSpelling) {
        return null;
    }
    if (scope == 'uploads') {
        params = 'agIYAw%3D%3D';
    }
    if (scope == 'library') {
        if (filter) {
            param1 = FILTERED_PARAM1;
            param2 = _getParam2(filter);
            param3 = 'AWoKEAUQCRADEAoYBA%3D%3D';
        }
        else {
            params = 'agIYBA%3D%3D';
        }
    }
    if (!scope && filter) {
        if (filter == 'playlists') {
            params = 'Eg-KAQwIABAAGAAgACgB';
            if (!ignoreSpelling)
                params += 'MABqChAEEAMQCRAFEAo%3D';
            else
                params += 'MABCAggBagoQBBADEAkQBRAK';
        }
        else if (filter.split('_').includes('playlists')) {
            param1 = 'EgeKAQQoA';
            if (filter == 'featured_playlists') {
                param2 = 'Dg';
            } //community_playlists
            else
                param2 = 'EA';
            if (!ignoreSpelling) {
                param3 = 'BagwQDhAKEAMQBBAJEAU%3D';
            }
            else {
                param3 = 'BQgIIAWoMEA4QChADEAQQCRAF';
            }
        }
        else {
            param1 = FILTERED_PARAM1;
            param2 = _getParam2(filter);
            if (!ignoreSpelling) {
                param3 = 'AWoMEA4QChADEAQQCRAF';
            }
            else {
                param3 = 'AUICCAFqDBAOEAoQAxAEEAkQBQ%3D%3D';
            }
        }
    }
    if (!scope && !filter && ignoreSpelling) {
        params = 'EhGKAQ4IARABGAEgASgAOAFAAUICCAE%3D';
    }
    return params ? params : `${param1}${param2}${param3}`;
}
exports.getSearchParams = getSearchParams;
function _getParam2(filter) {
    const filter_params = {
        songs: 'I',
        videos: 'Q',
        albums: 'Y',
        artists: 'g',
        playlists: 'o',
    };
    return filter_params[filter];
}
