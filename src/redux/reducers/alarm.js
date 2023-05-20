import { GETALARMINFOSUCCESS,GETALARMINFOFAIL,Filter,Fefesh} from "../constant"

const alarmInfos = []
export const alarm = (preState=alarmInfos,action) => {
  switch (action.type) {
    case GETALARMINFOSUCCESS:
      console.log(action.data);
      // return [...preState,...action.data]
      return (action.data)
    case 'filterAlarm1':
      return(action.data)
    default:
      return preState
  }
}
