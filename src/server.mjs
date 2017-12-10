import express from 'express';
import CONST from './const';
import {crateResponse, GoogleHome, log} from './utils/index'

//----------------------------------------------------------------
// EXPRESS
const app = express();
app.use(log.express);
// app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  const response = {
    msg: 'こんにちは。私はGoogle Homeです。',
    play: 'http://www.hmix.net/music/n/n72.mp3'
  }
  // notify(response.msg);
  // play(response.play);
  
  GoogleHome.notify(response.msg).then(isCall => {
    log.info( `${isCall?" [TRUE]":"[FALSE]"} -- ${log.json(response)}`);
    crateResponse(res, {call: isCall})
  })
})

const server = app.listen(CONST.SERVER_PORT, () => {
  log.info("------------------------------------");
  log.info(" start Google Home Server !! ");
  log.info("------------------------------------");
  log.info('Example app listening at http://localhost:' + server.address().port);
});
