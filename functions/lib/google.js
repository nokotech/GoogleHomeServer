"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports the Google Cloud client library
const language_1 = require("@google-cloud/language");
// Your Google Cloud Platform project ID
const projectId = 'home-c6f9c';
// The text to analyze
const text = 'Hello, world!';
class GoogleCloudNaturalLanguageAPI {
    // コンストラクタ
    constructor() {
        // Instantiates a client
        this.language = language_1.Language({
            projectId: projectId
        });
    }
    detectSentiment() {
        // Detects the sentiment of the text
        this.language.detectSentiment(text)
            .then((results) => {
            const sentiment = results[0];
            console.log(`Text: ${text}`);
            console.log(`Sentiment score: ${sentiment.score}`);
            console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
        })
            .catch((err) => {
            console.error('ERROR:', err);
        });
    }
}
//# sourceMappingURL=google.js.map