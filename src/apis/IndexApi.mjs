import BaseApi from './BaseApi';
import {GoogleHome, log, getIP} from '../utils/index'

export default class IndexApi extends BaseApi {
    
    constructor () {
        super()
    }

    call(req, res) {
        log.info(getIP(req));
        const response = {
            method: req.query.method,
            msg: req.query.message || 'こんにちは。私はGoogle Homeです。',
            play: 'https://firebasestorage.googleapis.com/v0/b/home-551b4.appspot.com/o/runa.mp3?alt=media&token=ea39c39d-8a59-449b-9fc1-c73379d978a6'
            // play: `http://${getIP()[1]}:8091/static/runa.mp3`
        }

        if(response.method == "notify") {
            GoogleHome.notify(response.msg).then(isCall => {
                log.info( `${isCall?" [TRUE]":"[FALSE]"} -- ${log.json(response)}`);
                super.crateResponse(res, {call: isCall})
            })
        }
        else if(response.method == "play") {
            GoogleHome.play(response.play).then(isCall => {
                log.info( `${isCall?" [TRUE]":"[FALSE]"} -- ${log.json(response)}`);
                super.crateResponse(res, {call: isCall})
            })
        }
        else {
            log.info( `[FALSE] -- ${log.json(response)}`);
            super.crateResponse(res, {call: false})
        }
    }
}