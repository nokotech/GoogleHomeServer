"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// Start writing Firebase Functions
exports.helloWorld = functions.https.onRequest((request, response) => {
    const text = request.query.text;
    console.log(text);
    response.send("Hello from Firebase!");
    response.status(200);
});
//# sourceMappingURL=index.js.map