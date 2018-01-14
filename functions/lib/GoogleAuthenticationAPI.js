"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
// Imports the Google Cloud client library.
const Storage = require("@google-cloud/storage");
class GoogleAuthenticationAPI {
    getBuckets() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Makes an authenticated API request.
                Storage().getBuckets()
                    .then((results) => {
                    console.log('[SUCCESS] getBuckets :', _.map(results[0], 'name'));
                    resolve('success');
                })
                    .catch((err) => {
                    console.error('[ERROR] getBuckets :', err);
                    reject(err);
                });
            });
        });
    }
}
exports.default = new GoogleAuthenticationAPI();
//# sourceMappingURL=GoogleAuthenticationAPI.js.map