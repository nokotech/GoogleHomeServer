import express from 'express'
import CONST from './const'
import {log} from './utils/index'
import API from './apis/index'

//----------------------------------------------------------------
// EXPRESS SETUP
const app = express()
app.use(log.express)
// app.use(express.static(__dirname + '/public'));

const server = app.listen(CONST.SERVER_PORT, () => {
  log.info("------------------------------------");
  log.info(" start Google Home Server !! ");
  log.info("------------------------------------");
  log.info('Example app listening at http://localhost:' + server.address().port);
})

//----------------------------------------------------------------
// EXPRESS ROUTING
app.get('/', API.IndexApi)


