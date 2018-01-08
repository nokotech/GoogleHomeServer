import {GoogleHome, log} from '../utils/index'

export default class BaseApi {

    constructor () {
        this.crateResponse = this.crateResponse.bind()
    }

    // エンドポイント
    call(req, res) {

    } 

    // jsonレスポンス生成
    crateResponse( res, response = {} ) {
        res.header('Content-Type', 'application/json; charset=utf-8')
        res.send(response);  
    }
}