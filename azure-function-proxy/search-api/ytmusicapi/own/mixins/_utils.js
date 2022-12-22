"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatestamp = exports.htmlToText = exports.prepareOrderParams = exports.validateOrderParameters = exports.prepareLikeEndpoint = void 0;
const pyLibraryMock_1 = require("../pyLibraryMock");
// @CODYDUONG TODO type better
function prepareLikeEndpoint(rating) {
    if (rating === 'LIKE') {
        return 'like/like';
    }
    else if (rating === 'DISLIKE') {
        return 'like/dislike';
    }
    else if (rating === 'INDIFFERENT') {
        return 'like/removelike';
    }
    else {
        return null;
    }
}
exports.prepareLikeEndpoint = prepareLikeEndpoint;
function validateOrderParameters(order) {
    const orders = ['a_to_z', 'z_to_a', 'recently_added'];
    if (order && !orders.includes(order)) {
        throw Error('Invalid order provided. Please use one of the following orders or leave out the parameter: ' +
            orders.join(', '));
    }
}
exports.validateOrderParameters = validateOrderParameters;
// @CODYDUONG TODO type better
function prepareOrderParams(order) {
    const orders = ['a_to_z', 'z_to_a', 'recently_added'];
    if (order) {
        // determine order_params via `.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[1].itemSectionRenderer.header.itemSectionTabbedHeaderRenderer.endItems[1].dropdownRenderer.entries[].dropdownItemRenderer.onSelectCommand.browseEndpoint.params` of `/youtubei/v1/browse` response
        const orderParams = ['ggMGKgQIARAA', 'ggMGKgQIARAB', 'ggMGKgQIABAB'];
        return orderParams[orders.indexOf(order)];
    }
}
exports.prepareOrderParams = prepareOrderParams;
function htmlToText(htmlText) {
    const tags = pyLibraryMock_1.re.findall(/<[^>]+>/, htmlText);
    for (const tag in tags) {
        htmlText = htmlText.replace(tag, '');
    }
    return htmlText;
}
exports.htmlToText = htmlToText;
function getDatestamp() {
    return Math.floor(Date.now() / 8.64e7);
}
exports.getDatestamp = getDatestamp;
