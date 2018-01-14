export interface Sentiment {
    magnitude: number;
    score : number;
}

export interface Text {
    content : string;
    beginOffset: number;
}

export interface Sentences {
    text : Text;
    sentiment : Sentiment;
}

export interface AnalyzeSentiment {
    language : string;
    documentSentiment: Sentiment;
    sentences : Sentences[];
}

export interface ResultAnalyzedEmotion extends Sentiment{
    text : string;
    feeling: string;
}