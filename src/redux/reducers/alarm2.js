//处理完成页面信息
import { GETALARMINFOSUCCESS2,GETALARMINFOFAIL2 } from "../constant"
const alarmInfos = []
export const alarm2 = (preState=alarmInfos,action) => {
  switch (action.type) {
    case GETALARMINFOSUCCESS2:
      console.log(action.data);
      // return [...preState,...action.data]
      return (action.data)
    case 'filterAlarm2':
      console.log(action.data);
      return(action.data)
    default:
      return preState
  }
}
