import BaseApi from './BaseApi';
import {GoogleHome, log, getIP} from '../utils/index'
import schedule from 'node-schedule'


export default class SetAlarmApi extends BaseApi {
    
    constructor () {
        super()
    }

    call(req, res) {
        log.info(getIP(req));
        const response = {
            hour: req.query.hour,
            min: req.query.min,
            play: 'https://firebasestorage.googleapis.com/v0/b/home-551b4.appspot.com/o/runa.mp3?alt=media&token=ea39c39d-8a59-449b-9fc1-c73379d978a6'
        }

        const registDate = new Date();
        registDate.setHours(response.hour);
        registDate.setMinutes(response.min);
        registDate.setSeconds(0);
        const job = schedule.scheduleJob(registDate, () => {
            log.info("Start Job!!");
            GoogleHome.setup().then(res => {
                GoogleHome.play(response.play).then(isCall => {
                    log.info( `${isCall?" [TRUE]":"[FALSE]"} -- ${log.json(response)}`);
                })
            })
        });
        super.crateResponse(res, {result: "OK"})
    }
}