import {AnalyzeSentiment, ResultAnalyzedEmotion} from './interface';
import * as functions from 'firebase-functions';
import * as express from 'express';
import GoogleAuthenticationAPI from './GoogleAuthenticationAPI'
import GoogleCloudNaturalLanguageAPI from './GoogleCloudNaturalLanguageAPI'

// Start writing Firebase Functions
export const coin = functions.https.onRequest((request : express.Request, response : express.Response) => {
    console.log(`header = ${JSON.stringify(request.headers)}`);
    console.log(`body = ${JSON.stringify(request.body)}`);    
    console.log(`query = ${JSON.stringify(request.query)}`);
    response.send("Hello from Firebase!");
    response.status(200);
});

/**
 * dialogflowからWebhookして呼ばれるAPI
 */
export const SentimentAPI = functions.https.onRequest((request : express.Request, response : express.Response) => {
    // console.log(`header = ${JSON.stringify(request.headers)}`);
    // console.log(`body = ${JSON.stringify(request.body.result)}`);    
    // console.log(`query = ${JSON.stringify(request.query)}`);

    (async () => {
        try {
            // リクエストに入っているパラメータを取得
            const parameters = request.body.result.parameters;
            console.log(`parameters = ${JSON.stringify(parameters)}`);

            // パラメータが空の場合は、アプリの説明をする 
            if( !parameters.text || parameters.text === '' ) {
                response.json({
                    speech: `このアプリは、あなたの今の気分をお調べします。\n「今の気分は何々」や「今日は何々」のように今日の気分を教えてください。`,
                    displayText: `このアプリは、あなたの今の気分をお調べします。\n「今の気分は～」、「今日は～」と今日の気分を教えてください。`,
                });
                return;
            }

            // 文章を感情分析する
            const resultAnalyzedEmotion : ResultAnalyzedEmotion = await GoogleCloudNaturalLanguageAPI.detectSentiment(parameters.text);
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
    })();
    response.status(200);
});
