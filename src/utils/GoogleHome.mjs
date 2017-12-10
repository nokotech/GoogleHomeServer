import googlehome from '../modules/google-home';
import {log} from './index';
import CONST from '../const';

//----------------------------------------------------------------
// GOOGLE HOME
//----------------------------------------------------------------
class GoogleHome {
    
    // 設定
    constructor() {
        googlehome.device(CONST.DEVICE_ID, CONST.LANG_JA);
    }

    // 通知
    notify(msg) { return new Promise((resolve) => {
        googlehome.notify(msg, res => {
            log.info(res)
            resolve(res == "Device notified")
        });
    })}
    
    // 音楽再生
    play(url) { return new Promise((resolve) => {
        googlehome.play(url, res => {
            log.info(res)
            resolve(res == "Device notified")
        });
    })}
}

export default new GoogleHome;
