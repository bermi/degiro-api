"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequest = void 0;
// Import modules
var node_fetch_1 = __importDefault(require("node-fetch"));
// Import enums
var enums_1 = require("../enums");
var BASE_API_URL = enums_1.MainDeGiroConsts.BASE_API_URL, LOGIN_URL_PATH = enums_1.MainDeGiroConsts.LOGIN_URL_PATH;
// Import debug console log
var utils_1 = require("../utils");
function loginRequest(params) {
    return new Promise(function (resolve, reject) {
        // Make the payload
        var payload = {
            isPassCodeReset: false,
            isRedirectToMobile: false,
            password: params.pwd,
            username: params.username.toLowerCase().trim(),
            queryParams: {
                reason: 'session_expired',
            },
        };
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // Do the request to get a session
        utils_1.debug("Making request to " + (BASE_API_URL + LOGIN_URL_PATH) + " with options:");
        utils_1.debug(JSON.stringify(requestOptions, null, 2));
        node_fetch_1.default(BASE_API_URL + LOGIN_URL_PATH, requestOptions)
            .then(function (res) { return res.json(); })
            .then(function (res) {
            if (!res.sessionId)
                return reject(res.statusText);
            utils_1.debug('Login response: ', JSON.stringify(res, null, 2));
            resolve(res);
        })
            .catch(reject);
    });
}
exports.loginRequest = loginRequest;
//# sourceMappingURL=login.js.map