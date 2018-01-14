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
const language_1 = require("@google-cloud/language");
class GoogleCloudNaturalLanguageAPI {
    /**
     * コンストラクタ
     */
    constructor() {
        // ライブラリの初期化
        this.client = new language_1.LanguageServiceClient();
    }
    /**
     * Google Cloud Natural Language API で 感情分析 します。
     * @param text 文章
     */
    detectSentiment(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Google Cloud Natural Language API に接続
                const results = yield this.client.analyzeSentiment({
                    document: {
                        content: text,
                        type: 'PLAIN_TEXT',
                    }
                });
                // Google Cloud Natural Language API から結果が返ってきたので、レスポンスから文章全体の気分を取得する
                const sentiment = results[0].documentSentiment;
                return Promise.resolve({
                    // 分析した文章
                    text: `${text}`,
                    // 感情の極性
                    score: sentiment.score,
                    // 感情の絶対的な大きさ
                    magnitude: sentiment.magnitude,
                    // sntiment.score は、0 より大きい値ならポジティブ、0 より小さい値ならネガティブ
                    feeling: `${sentiment.score >= 0 ? 'ポジティブ' : 'ネガティブ'}`,
                });
            }
            catch (e) {
                // Google Cloud Natural Language API からエラーが返ってきた
                console.error('ERROR:', e);
                return Promise.reject(e);
            }
        });
    }
}
exports.default = new GoogleCloudNaturalLanguageAPI();
//# sourceMappingURL=GoogleCloudNaturalLanguageAPI.js.map