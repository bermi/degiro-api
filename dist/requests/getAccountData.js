"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountDataRequest = void 0;
// Import modules
var node_fetch_1 = __importDefault(require("node-fetch"));
// Import debug console log
var utils_1 = require("../utils");
function getAccountDataRequest(sessionId, accountConfig) {
    return new Promise(function (resolve, reject) {
        var requestOptions = {
            headers: {
                Cookie: "JSESSIONID=" + sessionId + ";",
            },
        };
        // Do the request to get a account config data
        utils_1.debug("Making request to " + accountConfig.data.paUrl + "client?sessionId=" + sessionId);
        node_fetch_1.default(accountConfig.data.paUrl + "client?sessionId=" + sessionId, requestOptions)
            .then(function (res) { return res.json(); })
            .then(function (res) {
            utils_1.debug('Response:\n', JSON.stringify(res, null, 2));
            resolve(res);
        })
            .catch(reject);
    });
}
exports.getAccountDataRequest = getAccountDataRequest;
//# sourceMappingURL=getAccountData.js.map