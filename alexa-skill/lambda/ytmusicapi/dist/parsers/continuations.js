"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResponse = exports.resendRequestUntilParsedResponseIsValid = exports.getContinuationString = exports.getParsedContinuationItems = exports.getValidatedContinuations = exports.getContinuations = void 0;
const nav_1 = require("@codyduong/nav");
async function getContinuations(results, continuation_type, limit, requestFunc, parse_func, ctokenPath = '') {
    let items = [];
    while ('continuations' in results && items.length < limit) {
        const additionalParams = getContinuationParams(results, ctokenPath);
        const response = await requestFunc(additionalParams);
        if ('continuationContents' in response) {
            results = response['continuationContents'][continuation_type];
        }
        else {
            break;
        }
        const contents = getContinuationContents(results, parse_func);
        if ((contents === null || contents === void 0 ? void 0 : contents.length) == 0) {
            break;
        }
        items = items.concat(contents);
    }
    return items;
}
exports.getContinuations = getContinuations;
async function getValidatedContinuations(results, continuation_type, limit, per_page, request_func, parse_func, ctoken_path = '') {
    let items = [];
    while ('continuations' in results && items.length < limit) {
        const additionalParams = getContinuationParams(results, ctoken_path);
        const wrapped_parse_func = (rawResponse) => getParsedContinuationItems(rawResponse, parse_func, continuation_type);
        const validateFunc = (parsed) => validateResponse(parsed, per_page, limit, items.length);
        const response = await resendRequestUntilParsedResponseIsValid(request_func, additionalParams, wrapped_parse_func, validateFunc, 3);
        results = response['results'];
        items = [...items, ...response['parsed']];
    }
    return items;
}
exports.getValidatedContinuations = getValidatedContinuations;
function getParsedContinuationItems(response, parseFunc, continuationType) {
    const results = response['continuationContents'][continuationType];
    return {
        results: results,
        parsed: getContinuationContents(results, parseFunc),
    };
}
exports.getParsedContinuationItems = getParsedContinuationItems;
function getContinuationParams(results, ctoken_path) {
    const ctoken = (0, nav_1.nav)(results, [
        'continuations',
        0,
        'next' + ctoken_path + 'ContinuationData',
        'continuation',
    ]);
    return getContinuationString(ctoken);
}
function getContinuationString(ctoken) {
    return `&ctoken=${ctoken}&continuation=${ctoken}`;
}
exports.getContinuationString = getContinuationString;
function getContinuationContents(continuation, parseFunc) {
    for (const term of ['contents', 'items']) {
        if (term in continuation) {
            return parseFunc(continuation[term]);
        }
    }
    return [];
}
async function resendRequestUntilParsedResponseIsValid(requestFunc, request_additional_params, parse_func, validateFunc, max_retries) {
    const response = await requestFunc(request_additional_params);
    let parsedObject = parse_func(response);
    let retryCounter = 0;
    while (!validateFunc(parsedObject) && retryCounter < max_retries) {
        const response = requestFunc(request_additional_params);
        const attempt = parse_func(response);
        if (attempt['parsed'].length > parsedObject['parsed'].length) {
            parsedObject = attempt;
            retryCounter += 1;
        }
    }
    return parsedObject;
}
exports.resendRequestUntilParsedResponseIsValid = resendRequestUntilParsedResponseIsValid;
function validateResponse(response, perPage, limit, currentCount) {
    const remaining_items_count = limit - currentCount;
    const expected_items_count = Math.min(perPage, remaining_items_count);
    // response is invalid, if it has less items then minimal expected count
    return response['parsed'].length >= expected_items_count;
}
exports.validateResponse = validateResponse;
