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
const functions = require("firebase-functions");
const GoogleCloudNaturalLanguageAPI_1 = require("./GoogleCloudNaturalLanguageAPI");
// Start writing Firebase Functions
exports.coin = functions.https.onRequest((request, response) => {
    console.log(`header = ${JSON.stringify(request.headers)}`);
    console.log(`body = ${JSON.stringify(request.body)}`);
    console.log(`query = ${JSON.stringify(request.query)}`);
    response.send("Hello from Firebase!");
    response.status(200);
});
exports.SentimentAPI = functions.https.onRequest((request, response) => {
    // console.log(`header = ${JSON.stringify(request.headers)}`);
    // console.log(`body = ${JSON.stringify(request.body.result)}`);    
    // console.log(`query = ${JSON.stringify(request.query)}`);
    (() => __awaiter(this, void 0, void 0, function* () {
        try {
            // リクエストに入っているパラメータを取得
            const parameters = request.body.result.parameters;
            console.log(`parameters = ${JSON.stringify(parameters)}`);
            // パラメータが空の場合は、アプリの説明をする 
            if (!parameters.text || parameters.text === '') {
                response.json({
                    speech: `このアプリは、あなたの今の気分をお調べします。\n「今の気分は何々」や「今日は何々」のように今日の気分を教えてください。`,
                    displayText: `このアプリは、あなたの今の気分をお調べします。\n「今の気分は～」、「今日は～」と今日の気分を教えてください。`,
                });
                return;
            }
            // リクエストに入っているパラメータを取得
            const resultAnalyzedEmotion = yield GoogleCloudNaturalLanguageAPI_1.default.detectSentiment(parameters.text);
            response.json({
                result: `SUCCESS`,
                json: resultAnalyzedEmotion,
                speech: `あなたは今、${resultAnalyzedEmotion.feeling}な気分ですね。`,
                displayText: `あなたは今、${resultAnalyzedEmotion.feeling}な気分ですね。`
            });
        }
        catch (e) {
            // どこかでエラーになった場合は GoogleHome の気分が悪いことにしておく
            response.json({
                result: `FAILURE`,
                cause: e,
                speech: `すみません。私の気分が優れないようです。`,
                displayText: `すみません。私の気分が優れないようです。`
            });
        }
    }))();
    response.status(200);
});
//# sourceMappingURL=index.js.map