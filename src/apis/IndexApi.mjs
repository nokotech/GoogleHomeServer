import BaseApi from './BaseApi';
import {GoogleHome, log} from '../utils/index'

export default class IndexApi extends BaseApi {
    
    constructor () {
        super()
    }

    call(req, res) {
        const message = req.query.message;
        const response = {
          msg: message || 'こんにちは。私はGoogle Homeです。',
          play: 'http://www.hmix.net/music/n/n72.mp3'
        }
        // notify(response.msg);
        // play(response.play);
        
        GoogleHome.notify(response.msg).then(isCall => {
          log.info( `${isCall?" [TRUE]":"[FALSE]"} -- ${log.json(response)}`);
          super.crateResponse(res, {call: isCall})
        })
    }
}