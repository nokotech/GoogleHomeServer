"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports the Google Cloud client library.
const storage_1 = require("@google-cloud/storage");
class GoogleAuthenticationAPI {
    constructor() {
        // Makes an authenticated API request.
        storage_1.default().getBuckets()
            .then((results) => {
            const buckets = results[0];
            console.log('Buckets:');
            buckets.forEach((bucket) => {
                console.log(bucket.name);
            });
        })
            .catch((err) => {
            console.error('ERROR:', err);
        });
    }
}
exports.default = GoogleAuthenticationAPI;
//# sourceMappingURL=GoogleAuthentication.js.map