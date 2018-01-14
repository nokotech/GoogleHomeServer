import * as _ from 'lodash'
import {LanguageServiceClient} from '@google-cloud/language';
import {AnalyzeSentiment, Sentiment, ResultAnalyzedEmotion} from './interface';

/**
 * Google Cloud Natural Language API でテキスト分析するクラス
 */
class GoogleCloudNaturalLanguageAPI {

    /** ライブラリのインスタンス */
    private client;

    /**
     * コンストラクタ
     */
    constructor () {
        // ライブラリの初期化
        this.client = new LanguageServiceClient();
    }

    /**
     * Google Cloud Natural Language API で 感情分析 します。
     * @param text 文章
     */
    async detectSentiment(text : string) : Promise<ResultAnalyzedEmotion> {
        try {
            // Google Cloud Natural Language API に接続
            const results : AnalyzeSentiment[] = await this.client.analyzeSentiment({
                document: {
                    content: text,
                    type: 'PLAIN_TEXT',
                }
            })

            // Google Cloud Natural Language API から結果が返ってきたので、レスポンスから文章全体の気分を取得する
            const sentiment : Sentiment = results[0].documentSentiment;
            return　Promise.resolve({
                // 分析した文章
                text: `${text}`,
                // 感情の極性
                score: sentiment.score,
                // 感情の絶対的な大きさ
                magnitude: sentiment.magnitude,
                // sntiment.score は、0 より大きい値ならポジティブ、0 より小さい値ならネガティブ
                feeling: `${ sentiment.score >= 0 ? 'ポジティブ' : 'ネガティブ'}`,
            });
        }
        catch (e) {
            // Google Cloud Natural Language API からエラーが返ってきた
            console.error('ERROR:', e);
            return Promise.reject(e);
        }
    }
} 

export default new GoogleCloudNaturalLanguageAPI();
