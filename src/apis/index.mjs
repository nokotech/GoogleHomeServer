import IndexApi from './IndexApi'
import SetAlarmApi from './SetAlarmApi'

export default {
    IndexApi: new IndexApi().call,
    SetAlarmApi: new SetAlarmApi().call
}